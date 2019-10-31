import hljs from 'highlight.js/lib/highlight';
import javascript from 'highlight.js/lib/languages/javascript';
import python from 'highlight.js/lib/languages/python';
import java from 'highlight.js/lib/languages/java';
import sql from 'highlight.js/lib/languages/sql';
import kotlin from 'highlight.js/lib/languages/kotlin';
import cpp from 'highlight.js/lib/languages/cpp';
import cs from 'highlight.js/lib/languages/cs';
import xml from 'highlight.js/lib/languages/xml';
import css from 'highlight.js/lib/languages/css';
import ruby from 'highlight.js/lib/languages/ruby';
import scala from 'highlight.js/lib/languages/scala';
import php from 'highlight.js/lib/languages/php';


hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('python', python);
hljs.registerLanguage('java', java);
hljs.registerLanguage('sql', sql);
hljs.registerLanguage('kotlin', kotlin);
hljs.registerLanguage('cpp', cpp);
hljs.registerLanguage('cs', cs);
hljs.registerLanguage('xml', xml);
hljs.registerLanguage('css', css);
hljs.registerLanguage('ruby', ruby);
hljs.registerLanguage('scala', scala);
hljs.registerLanguage('php', php);

let languages = [
    {text: 'Python', value: 'python'},
    {text: 'Java', value: 'java'},
    {text: 'JavaScript', value: 'javascript'},
    {text: 'C', value: 'c'},
    {text: 'C++', value: 'cpp'},
    {text: 'C#', value: 'csharp'},
    {text: 'PHP', value: 'php'},
    {text: 'HTML/XML', value: 'markup'},
    {text: 'CSS', value: 'css'},
    {text: 'Ruby', value: 'ruby'},
];


(function (domGlobals) {
    'use strict';

    let pluginManager = tinymce.util.Tools.resolve('tinymce.PluginManager');

    let isCodeSample = elm => elm && elm.nodeName === 'PRE' && elm.className.includes('hljs ');

    let openDialog = editor => {
        let node = editor.selection.getNode();
        console.log(node)
        let [currentLanguage, currentCode] = do {
            if (isCodeSample(node)) {
                [node.className.match(/hljs (\w+)/)[1], node.textContent]
            } else {
                [node.innerText.trim(), ""]
            }
        };
        editor.windowManager.open({
            title: '插入代码',
            size: 'large',
            body: {
                type: 'panel',
                items: [
                    {
                        type: 'selectbox',
                        name: 'language',
                        label: 'Language',
                        items: languages
                    },
                    {
                        type: 'textarea',
                        name: 'code',
                        label: 'Code view'
                    }
                ]
            },
            buttons: [
                {
                    type: 'cancel',
                    name: 'cancel',
                    text: 'Cancel'
                },
                {
                    type: 'submit',
                    name: 'save',
                    text: 'Save',
                    primary: true
                }
            ],
            initialData: {
                language: currentLanguage,
                code: currentCode
            },

            onSubmit: (api) => {
                let data = api.getData();

                editor.undoManager.transact(() => {
                    data.code = hljs.highlight(data.language, data.code).value;
                    if (isCodeSample(node)) {
                        editor.dom.setAttrib(node, 'class', `hljs ${data.language}`);
                        node.innerHTML = data.code;
                    } else {
                        node.hidden = true;
                        // node.parentElement.removeChild(node);
                        editor.insertContent(`<pre id="__new" class="hljs ${data.language}">${data.code}</pre>`);
                        node = editor.selection.select(editor.$('#__new').removeAttr('id')[0]);
                        node.contentEditable = 'false';
                    }
                    editor.selection.select(node);
                });

                api.close();
            }
        });

        // 设置焦点，并把 tab 转成 4 空格
        setTimeout(() => {
            let textarea = tinymce.DOM.select('textarea.tox-textarea')[0];
            textarea.focus();
            textarea.addEventListener('keydown', e => {
                if (e.keyCode === 9) {
                    e.preventDefault();
                    e.stopPropagation();
                    let startPos = textarea.selectionStart;
                    let endPos = textarea.selectionEnd;
                    let len = textarea.value.length;

                    let leftValue = textarea.value.substring(0, startPos);
                    let rightValue = textarea.value.substring(endPos, len);
                    textarea.value = `${leftValue}    ${rightValue}`;
                    textarea.selectionStart = startPos + 4;
                    textarea.selectionEnd = startPos + 4;
                }
            }, false)
        }, 10)
    };


    let registerCommand = editor => {
        editor.addCommand('highlight', () => {
            let node = editor.selection.getNode();
            if (editor.selection.isCollapsed() || isCodeSample(node)) {
                openDialog(editor);
            } else {
                editor.formatter.toggle('code');
            }
        });


    };

    pluginManager.add('highlight', editor => {
        registerCommand(editor);

        editor.settings.content_css = 'static/highlight/monokai.css';

        editor.on('dblclick', ev => {
            if (isCodeSample(ev.target)) {
                openDialog(editor);
            }
        });
    });

}(window));