import fs from "fs";
import store from "../../store";
import electron from 'electron'

let dialog = electron.remote.dialog;

let button = {
    register: editor => {
        editor.settings.save_enablewhendirty = true;
        editor.settings.save_onsavecallback = () => {
            let filename = store.state.article.fileName === null ? dialog.showSaveDialog({
                filters: [
                    {name: 'HTML', extensions: ['html']},
                    // {name: 'Markdown', extensions: ['md']},
                    // {name: 'PDF', extensions: ['pdf']},
                    // {name: '图片', extensions: ['jpg', 'png']},
                ]
            }) : store.state.article.fileName;

            fs.writeFile(filename, store.getters.content_with_style, err => {
                if (err) {
                    console.log("保存文件出错" + err.message.toString())
                } else {
                    store.commit("setArticleFileName", filename)
                }
            });

        }
    }
};

export default button;