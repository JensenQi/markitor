let plugin = (editor, url) => {

    let TAG_NAME = 'tinymce-latex';

    let openDialog = () => {
        return editor.windowManager.openUrl({
            title: 'Just a title',
            url: 'http://www.baidu.com',
            buttons: [
                {
                    type: 'cancel',
                    text: '取消'
                },
                {
                    type: 'custom',
                    text: '确认',
                    primary: true
                }
            ],
            onAction: (api, detail) => {
                console.log("确认")
                // let data = api.getData();
                // let base = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJ' +
                //     'lYWR5ccllPAAAAQJJREFUeNpi/P//PwMlgImBQkCxASxgU5iwmmMBxCX4NP/79y+EBY+8PBCfAuIucr2gB8RHyA0DBSBWA+LzSIZtQcLR6AbsgOJ' +
                //     'YKN8YiC8B8XcoHyS+Eoh9gPgakjq4AR5A3AbEBlC+FRAfRHJRKRDvBuJ4aMDvw+aFM0CsBcQiUPoMVFwSavsEIDYEYiMgvozNgG9AfA6Ic6D0N6j' +
                //     '4FKh3IqAaWYF4O65A3AvEXlAaBmRBzoYmeVOoAVLwLICUFxiBmA+Ir0K9wQvEgkBcBhW7Cg2DjUC8CKQWpJcRTDAywgwAuWgSNNCYoQHGAhVngqr' +
                //     '5C8S/gfgPUO8nxgHPjQABBgBsa0S64vNBPgAAAABJRU5ErkJggg=='
                // let element = tinymce.activeEditor.dom.create('img', {class: TAG_NAME, src: base});
                // console.log(element)
                // editor.selection.setNode(element)
                // editor.insertContent(data.formula);
                // api.close();
            }

        })
        // return editor.windowManager.open({
        //     title: '输入 LaTeX 公式',
        //     body: {
        //         type: 'panel',
        //         items: [
        //             {
        //                 type: 'textarea',
        //                 name: 'formula',
        //             }
        //         ]
        //     },
        //     buttons: [
        //         {
        //             type: 'cancel',
        //             text: '取消'
        //         },
        //         {
        //             type: 'submit',
        //             text: '确认',
        //             primary: true
        //         }
        //     ],
        //     onSubmit: api => {
        //         let data = api.getData();
        //         let base = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJ' +
        //             'lYWR5ccllPAAAAQJJREFUeNpi/P//PwMlgImBQkCxASxgU5iwmmMBxCX4NP/79y+EBY+8PBCfAuIucr2gB8RHyA0DBSBWA+LzSIZtQcLR6AbsgOJ' +
        //             'YKN8YiC8B8XcoHyS+Eoh9gPgakjq4AR5A3AbEBlC+FRAfRHJRKRDvBuJ4aMDvw+aFM0CsBcQiUPoMVFwSavsEIDYEYiMgvozNgG9AfA6Ic6D0N6j' +
        //             '4FKh3IqAaWYF4O65A3AvEXlAaBmRBzoYmeVOoAVLwLICUFxiBmA+Ir0K9wQvEgkBcBhW7Cg2DjUC8CKQWpJcRTDAywgwAuWgSNNCYoQHGAhVngqr' +
        //             '5C8S/gfgPUO8nxgHPjQABBgBsa0S64vNBPgAAAABJRU5ErkJggg=='
        //         let element = tinymce.activeEditor.dom.create('img', {class: TAG_NAME, src: base});
        //         console.log(element)
        //         editor.selection.setNode(element)
        //         // editor.insertContent(data.formula);
        //         api.close();
        //     }
        // });
    };

    editor.on('click', e => {
        if (e.target.className === TAG_NAME) {
            let elem = e.target;
            console.log(elem.innerHTML);
            openDialog();
        }
    });

    editor.ui.registry.addIcon('formula', '<svg version="1.1" id="Capa_1" xmlns="http//www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="24px" height="24px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"> <path d="M263.507,62.967C265.179,51.833,272.833,40,283.729,40c11.028,0,20,8.972,20,20h40c0-33.084-26.916-60-60-60 c-33.629,0-55.527,28.691-59.784,57.073L211.083,144h-61.354v40h55.436l-39.22,265.073l-0.116,0.937 c-1.063,10.62-9.393,21.99-20.1,21.99c-11.028,0-20-8.972-20-20h-40c0,33.084,26.916,60,60,60 c33.661,0,56.771-29.141,59.848-57.496L245.6,184h60.129v-40h-54.211L263.507,62.967z"/> <polygon points="426.271,248 378.236,248 352.249,287.085 334.923,248 291.17,248 325.997,326.569 270.523,410 318.558,410 345.21,369.915 362.979,410 406.732,410 371.462,330.431 \t\t"/> </svg>');

    editor.ui.registry.addButton('latex', {
        icon: 'formula',
        tooltip: 'LaTeX公式',
        onAction: () => {
            openDialog();
        }
    });

    editor.ui.registry.addMenuItem('latex', {
        text: '菜单栏名称',
        onAction: () => {
            openDialog();
        }
    });

    return {
        getMetadata: () => {
            return {
                name: 'LaTeX plugin',
                url: 'http://cuda.tech'
            }
        }
    }
};

export default plugin;