import fs from "fs";
import store from '../store'
import electron from 'electron'

let dialog = electron.remote.dialog;

let icon = `
<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
    x="0px" y="0px" 
    width="24px" height="24px" 
    viewBox="0 0 16 16" style="enable-background:new 0 0 16 16;" xml:space="preserve">
    <path style="fill:#030104;" d="M4.25,5.5l2.5-2H2.006C0.898,3.5,0,4.4,0,5.492v7.016c0,1.1,0.897,1.992,2.006,1.992h9.988
        c1.108,0,2.006-0.9,2.006-1.992V8.9l-2,1.6v2H2v-7H4.25z"/>
    <path style="fill:#030104;" d="M11,3.477c-3.539,0.035-7.033,3.124-7.033,7.046c1.694-1.65,3.7-3.136,7.033-3.016V9.5l5-4l-5-4 V3.477z"/>
</svg>
`;


let button = {
    register: (editor, onAction) => {
        editor.ui.registry.addIcon('save_as', icon);
        editor.ui.registry.addButton('save_as', {
            icon: 'save_as',
            tooltip: '另存为',
            onAction: () => {
                let filename = dialog.showSaveDialog({
                    filters: [
                        {name: 'HTML', extensions: ['html']},
                        // {name: 'Markdown', extensions: ['md']},
                        // {name: 'PDF', extensions: ['pdf']},
                        // {name: '图片', extensions: ['jpg', 'png']},
                    ]
                });
                fs.writeFile(filename, store.state.article.content, err => {
                    if (err) {
                        console.log("保存文件出错" + err.message.toString())
                    }
                });
            }
        });
    }
};

export default button;