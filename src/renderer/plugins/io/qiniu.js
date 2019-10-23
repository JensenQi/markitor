import CryptoJS from 'crypto-js';
import _config from '../../../config';

let config = _config.qiniu;

let safe64 = base64 => base64.replace(/\+/g, "-").replace(/\//g, "_");

let base64encode = str => {
    let base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
    let out = "", i = 0, len = str.length;
    let c1, c2, c3;

    while (i < len) {
        c1 = str.charCodeAt(i++) & 0xff;
        if (i === len) {
            out += base64EncodeChars.charAt(c1 >> 2);
            out += base64EncodeChars.charAt((c1 & 0x3) << 4);
            out += "==";
            break;
        }
        c2 = str.charCodeAt(i++);
        if (i === len) {
            out += base64EncodeChars.charAt(c1 >> 2);
            out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
            out += base64EncodeChars.charAt((c2 & 0xF) << 2);
            out += "=";
            break;
        }
        c3 = str.charCodeAt(i++);
        out += base64EncodeChars.charAt(c1 >> 2);
        out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
        out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
        out += base64EncodeChars.charAt(c3 & 0x3F);
    }
    return out;
};


let utf16to8 = str => {
    let out = "";
    for (let i = 0; i < str.length; i++) {
        let c = str.charCodeAt(i);
        if ((c >= 0x0001) && (c <= 0x007F)) {
            out += str.charAt(i);
        } else if (c > 0x07FF) {
            out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
            out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
            out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
        } else {
            out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
            out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
        }
    }
    return out;
};


/**
 * 根据 access_key, secret_key 和上传策略获取上传 token
 * @returns token 字符串
 */
let genUpToken = () => {
    let put_policy = JSON.stringify({
        scope: config.scope,
        deadline: Date.parse(new Date()) / 1000 + 3600
    });
    let encoded = base64encode(utf16to8(put_policy));
    let hash = CryptoJS.HmacSHA1(encoded, config.secretKey);
    let encoded_signed = hash.toString(CryptoJS.enc.Base64);

    return `${config.accessKey}:${safe64(encoded_signed)}:${encoded}`;
};

/**
 * 计算 str 对应的图片文件大小
 * @param str: base64 字符串
 * @returns 对应的图片文件大小
 */
let fileSize = str => {
    if (str.indexOf('=') > 0) {
        str = str.substring(0, str.indexOf('='));
    }
    return parseInt(str.length - (str.length / 8) * 2);
};


/**
 * 将 base64 图片上传至七牛云后返回 cdn URL
 * @param picBase: 以 'data:image/png;base64,' 字符串开头的 base64 图片编码
 * @param callback: 回调函数
 * @returns 图片 CDN 的URL(异步返回)
 */
let putb64 = (picBase, callback) => {
    picBase = picBase.substring(22); // 去掉 'data:image/png;base64,'

    let url = `${config.uploadEndpoint}/${fileSize(picBase)}`;
    let xhr = new XMLHttpRequest();
    let token = genUpToken();
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            let keyText = eval(`(${xhr.responseText})`);
            let picUrl = `${config.cdnUrl}/${keyText.key}`;
            callback(picUrl);
        }
    };
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/octet-stream");
    xhr.setRequestHeader("Authorization", `UpToken ${token}`);
    xhr.send(picBase);
};

export default putb64;


