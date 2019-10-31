let TAG_NAME = 'tinymce-latex';
let formula;
let formulaDom;
let isUpdateFormula;
let isInlineFormula;

let tex2img = (formula, callback) => {
    MathJax.Hub.Queue(() => {
        let wrapper = MathJax.HTML.Element("span", {}, formula);
        MathJax.Hub.Typeset(wrapper, () => {
            let svg = wrapper.getElementsByTagName("svg");
            if (svg.length === 0) return;
            svg = svg[0];
            svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
            let image = new Image();
            image.src = 'data:image/svg+xml;base64,' + window.btoa(unescape(encodeURIComponent(svg.outerHTML)));
            image.onload = () => {
                let canvas = document.createElement('canvas');
                [canvas.width, canvas.height] = [image.width, image.height];
                canvas.getContext('2d').drawImage(image, 0, 0);
                callback(canvas.toDataURL('image/png'));
            };
        });
    })
};
let renderTex = formula => {
    formulaDom = document.getElementById('latex_preview_img');
    formulaDom.setAttribute('alt', formula);
    if (formula === '') {
        formulaDom.setAttribute('src', '')
        console.log('empty')
    } else {
        tex2img('$' + formula + '$', img => {
            formulaDom.setAttribute('src', img);
            console.log(formulaDom)
        })
    }
};

let plugin = editor => {

    let openDialog = () => {
        let node = editor.selection.getNode();
        window.vm.$Modal.confirm({
            title: "插入公式",
            width: '60%',
            onOk: () => {
                if (isUpdateFormula) {

                } else {
                    formulaDom.removeAttribute('id');
                    formulaDom.setAttribute('style', 'vertical-align: middle;margin-left:5px;margin-right:5px');
                    formulaDom.setAttribute('class', TAG_NAME);
                    editor.selection.setNode(formulaDom)
                }
                // editor.undoManager.transact(() => {
                //     data.code = hljs.highlight(data.language, data.code).value;
                //     if (isCodeSample(node)) {
                //         editor.dom.setAttrib(node, 'class', `hljs ${data.language}`);
                //         node.innerHTML = data.code;
                //     } else {
                //         node.hidden = true;
                //         // node.parentElement.removeChild(node);
                //         editor.insertContent(`<pre id="__new" class="hljs ${data.language}">${data.code}</pre>`);
                //         node = editor.selection.select(editor.$('#__new').removeAttr('id')[0]);
                //         node.contentEditable = 'false';
                //     }
                //     editor.selection.select(node);
                // });
            },
            render: h => {
                return h('div', [
                    h('Input', {
                        props: {
                            type: 'textarea',
                            placeholder: '输入LaTeX公式',
                            autofocus: true,
                            autosize: {
                                minRows: 5,
                                maxRows: 20
                            },
                            value: formula
                        },
                        on: {
                            'on-change': event => renderTex(event.target.value.trim())
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
                ])
            }
        })
    };


    // 监听双击事件
    editor.on('dblclick', e => {
        if (e.target.className === TAG_NAME) {
            formula = e.target.getAttribute('alt');
            isUpdateFormula = true;
            openDialog()
        }
    });


    // 注册工具栏按钮
    editor.ui.registry.addIcon('formula', '<svg version="1.1" id="Capa_1" xmlns="http//www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="24px" height="24px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"> <path d="M263.507,62.967C265.179,51.833,272.833,40,283.729,40c11.028,0,20,8.972,20,20h40c0-33.084-26.916-60-60-60 c-33.629,0-55.527,28.691-59.784,57.073L211.083,144h-61.354v40h55.436l-39.22,265.073l-0.116,0.937 c-1.063,10.62-9.393,21.99-20.1,21.99c-11.028,0-20-8.972-20-20h-40c0,33.084,26.916,60,60,60 c33.661,0,56.771-29.141,59.848-57.496L245.6,184h60.129v-40h-54.211L263.507,62.967z"/> <polygon points="426.271,248 378.236,248 352.249,287.085 334.923,248 291.17,248 325.997,326.569 270.523,410 318.558,410 345.21,369.915 362.979,410 406.732,410 371.462,330.431 \t\t"/> </svg>');
    editor.ui.registry.addButton('latex', {
        icon: 'formula',
        tooltip: 'LaTeX公式',
        onAction: openDialog
    });

    // 注册菜单栏按钮
    editor.ui.registry.addMenuItem('latex', {
        text: '菜单栏名称',
        onAction: openDialog
    });

    // 注册命令
    editor.addCommand('latex', openDialog);

};

export default plugin;