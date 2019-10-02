import {Input} from 'iview'


let plugin = (editor, url) => {

    let TAG_NAME = 'tinymce-latex';
    let tex2img = (formula, callback) => {
        MathJax.Hub.Queue(function () {
            let wrapper = MathJax.HTML.Element("span", {}, formula);
            MathJax.Hub.Typeset(wrapper, function () {
                var svg = wrapper.getElementsByTagName("svg")[0];
                svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
                var image = new Image();
                image.src = 'data:image/svg+xml;base64,' + window.btoa(unescape(encodeURIComponent(svg.outerHTML)));
                image.onload = function () {
                    var canvas = document.createElement('canvas');
                    canvas.width = image.width;
                    canvas.height = image.height;
                    var context = canvas.getContext('2d');
                    context.drawImage(image, 0, 0);
                    // var img = '<img src="' + canvas.toDataURL('image/png') + '"/>';
                    var img = canvas.toDataURL('image/png')
                    callback(img);
                };
            });
        })
    };


    let openDialog = () => {

        let vm = window.vm;
        let formula = "$ x = {-b \\pm \\sqrt{b^2-4ac} \\over 2a} $";
        // let img = "";
        //
        // tex2img(formula, output => {
        //     img = output;
        //     console.log(img)
        // });


        vm.$Modal.confirm({
            title: "插入公式",
            width: '60%',
            onOk: () => {
                console.log("submit")
            },
            render: h => {
                return h('div', [
                    h(Input, {
                        props: {
                            type: 'textarea',
                            placeholder: '输入LaTeX公式',
                            autosize: {
                                minRows: 5,
                                maxRows: 20
                            },
                            value: vm.cache.latex_preview
                        },
                        on: {
                            'on-change': event => {
                                vm.cache.latex_preview = event.target.value;
                                let dom = document.getElementById('latex_preview_img')
                                if (event.target.value.trim() === '') {
                                    dom.setAttribute('src', '')
                                } else {
                                    tex2img('$$' + event.target.value + '$$', img => {
                                        dom.setAttribute('src', img)
                                    })
                                }

                            }
                        }
                    }),
                    h('div', {
                        style: {
                            textAlign: 'center',
                            marginTop: '20px'
                        }
                    }, [
                        h('img', {
                            attrs: {
                                id: 'latex_preview_img',
                            }
                        })
                    ])
                    // h('div', {
                    //     style: {
                    //         textAlign: 'center'
                    //     }
                    // }, [
                    //     vm.cache.latex_preview
                    // ])
                ])
            }
        })
        // return editor.windowManager.openUrl({
        //     title: '插入公式',
        //     url: '/mathjax',
        //     buttons: [
        //         {
        //             type: 'cancel',
        //             text: '取消'
        //         },
        //         {
        //             type: 'custom',
        //             text: '确认',
        //             primary: true
        //         }
        //     ],
        //     onMessage: (instance, mce) => {
        //         console.log(mce.mceAction)
        //         console.log(mce.data)
        //
        //     },
        //     onAction: (api, detail) => {
        //         console.log("确认")
        //         // let data = api.getData();
        //         // let base = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJ' +
        //         //     'lYWR5ccllPAAAAQJJREFUeNpi/P//PwMlgImBQkCxASxgU5iwmmMBxCX4NP/79y+EBY+8PBCfAuIucr2gB8RHyA0DBSBWA+LzSIZtQcLR6AbsgOJ' +
        //         //     'YKN8YiC8B8XcoHyS+Eoh9gPgakjq4AR5A3AbEBlC+FRAfRHJRKRDvBuJ4aMDvw+aFM0CsBcQiUPoMVFwSavsEIDYEYiMgvozNgG9AfA6Ic6D0N6j' +
        //         //     '4FKh3IqAaWYF4O65A3AvEXlAaBmRBzoYmeVOoAVLwLICUFxiBmA+Ir0K9wQvEgkBcBhW7Cg2DjUC8CKQWpJcRTDAywgwAuWgSNNCYoQHGAhVngqr' +
        //         //     '5C8S/gfgPUO8nxgHPjQABBgBsa0S64vNBPgAAAABJRU5ErkJggg=='
        //         // let element = tinymce.activeEditor.dom.create('img', {class: TAG_NAME, src: base});
        //         // console.log(element)
        //         // editor.selection.setNode(element)
        //         // editor.insertContent(data.formula);
        //         // api.close();
        //     }
        //
        // })

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