import fs from 'fs';
import log from '../log'
import electron from 'electron'

let dialog = electron.remote.dialog;

let logTitle = "文件系统";

let file = {
    save: (content, filename = null) => {
        if (filename === null) {
            filename = dialog.showSaveDialog({
                filters: [
                    {name: 'HTML', extensions: ['html']},
                    // {name: 'Markdown', extensions: ['md']},
                    // {name: 'PDF', extensions: ['pdf']},
                    // {name: '图片', extensions: ['jpg', 'png']},
                ]
            })
        }
        fs.writeFile(filename, content, err => {
            if (err) {
                log.info(logTitle, "保存文件出错", err.message);
            }
        });
    },

    open: () => {
        let filename = dialog.showOpenDialog({
            properties: ['openFile'],
            filters: [{name: '仅支持md/HTML', extensions: ['md', 'html']}]
        })[0];
        return [filename, fs.readFileSync(filename, 'utf-8')];
    }


};

export default file
