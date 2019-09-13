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

    editor.ui.registry.addButton('latex', {
        icon: 'nothing',
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