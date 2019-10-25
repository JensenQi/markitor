import tinymce from 'tinymce/tinymce';
import 'tinymce/themes/silver'

import 'tinymce/plugins/print'
import 'tinymce/plugins/preview'
import 'tinymce/plugins/fullpage'
import 'tinymce/plugins/importcss'
import 'tinymce/plugins/searchreplace'
import 'tinymce/plugins/autolink'
import 'tinymce/plugins/save'
import 'tinymce/plugins/directionality'
import 'tinymce/plugins/visualblocks'
import 'tinymce/plugins/visualchars'
import 'tinymce/plugins/fullscreen'
import 'tinymce/plugins/image'
import 'tinymce/plugins/imagetools'
import 'tinymce/plugins/link'
import 'tinymce/plugins/media'
import 'tinymce/plugins/template'
import 'tinymce/plugins/code'
import 'tinymce/plugins/table'
import 'tinymce/plugins/charmap'
import 'tinymce/plugins/hr'
import 'tinymce/plugins/pagebreak'
import 'tinymce/plugins/nonbreaking'
import 'tinymce/plugins/anchor'
import 'tinymce/plugins/toc'
import 'tinymce/plugins/insertdatetime'
import 'tinymce/plugins/advlist'
import 'tinymce/plugins/lists'
import 'tinymce/plugins/wordcount'
import 'tinymce/plugins/textpattern'
import 'tinymce/plugins/noneditable'
import 'tinymce/plugins/help'
import 'tinymce/plugins/quickbars'
import 'tinymce/plugins/save'


import buttons from './plugins';

let editor = {
    selector: 'textarea',
    plugins: 'highlight save code latex print preview fullpage importcss searchreplace autolink save directionality visualblocks visualchars fullscreen image link media template table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars ',
    toolbar: 'wechat highlight new_file open_file save save_as | code latex undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor casechange permanentpen formatpainter removeformat | pagebreak | charmap | preview print | insertfile image media pageembed template link anchor | a11ycheck ltr rtl | showcomments addcomment',
    // menu: {
    //     file: {title: '文件', items: 'newdocument latex'},
    //     edit: {title: '编辑', items: 'undo redo | cut copy paste pastetext | selectall'},
    //     insert: {title: '插入', items: 'link media | template hr'},
    //     view: {title: '查看', items: 'visualaid'},
    //     format: {title: '格式', items: 'bold italic underline strikethrough superscript subscript | formats | removeformat'},
    //     table: {title: '表格', items: 'inserttable tableprops deletetable | cell row column'},
    //     tools: {title: '工具', items: 'spellchecker code'}
    // },
    height: '100%',
    setup: editor => {
        // 初始化时即全屏
        editor.on('init', e => {
            // editor.execCommand('mceFullScreen')
        });

        // 设置皮肤路径
        let baseUrl = editor.documentBaseURI.toAbsolute('.');
        editor.settings.skin_url = baseUrl + 'static/skins/ui/oxide';
        editor.settings.content_style = `
            body { 
                margin: 5% 10% 5% 10%;
            }
        `;

        // 汉化并取消商标
        editor.settings.language = 'zh_CN';
        editor.settings.language_url = baseUrl + 'static/langs/zh_CN.js';
        editor.settings.branding = false;

        // 关闭菜单栏和工具栏
        editor.settings.menubar = false;
        // editor.settings.toolbar = false;


        buttons.register_all(editor);

        editor.on('keydown', e => {
            if (e.keyCode === 9) {
                e.preventDefault();
                let autocomplete_mode = document.getElementsByClassName('tox-autocompleter').length > 0;
                if (autocomplete_mode) {
                    e.which = 13;
                } else {
                    editor.insertContent('&nbsp;&nbsp;&nbsp;&nbsp;');
                }
            }
        });

    },
    // init_instance_callback: () => console.log('super init'),

};

export default editor;