<template>
    <div>
        <Editor :init="this.tinymce" class="input" v-model="content" @onKeyDown="key_down"></Editor>
    </div>
</template>

<script>
    import tinymce from 'tinymce/tinymce';
    import 'tinymce/skins/content/default/content.css'
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
    import 'tinymce/plugins/codesample'
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
    import 'tinymce/plugins/emoticons'
    import 'tinymce/plugins/save'

    import '../../../plugins/latex'


    import '../../../plugins/emoticons/js/emojis'
    import '../../../langs/zh_CN'
    import '../../../skins/ui/oxide/skin.min.css'
    import '../../../skins/ui/oxide/content.min.css'
    import '../../../skins/content/default/content.css'


    import vim from '../../../plugins/vim';

    import format from '../../libs/format';
    import file from '../../libs/file';

    import Editor from '@tinymce/tinymce-vue';


    export default {
        name: 'landing-page',
        components: {Editor},
        mounted() {
            // this.$vim.open({
            //     debug: true
            // })
            // document.onkeypress=function (e) {
            //     console.log(e.key)
            //
            // }


        },
        data() {
            return {
                tinymce: {
                    plugins: 'save code latex print preview fullpage importcss searchreplace autolink save directionality visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons',
                    toolbar: 'newdocument open save save_as | code latex undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor casechange permanentpen formatpainter removeformat | pagebreak | charmap emoticons | preview print | insertfile image media pageembed template link anchor | a11ycheck ltr rtl | showcomments addcomment',
                    // menu: {
                    //     file: {title: '文件', items: 'newdocument latex'},
                    //     edit: {title: '编辑', items: 'undo redo | cut copy paste pastetext | selectall'},
                    //     insert: {title: '插入', items: 'link media | template hr'},
                    //     view: {title: '查看', items: 'visualaid'},
                    //     format: {title: '格式', items: 'bold italic underline strikethrough superscript subscript | formats | removeformat'},
                    //     table: {title: '表格', items: 'inserttable tableprops deletetable | cell row column'},
                    //     tools: {title: '工具', items: 'spellchecker code'}
                    // },
                    branding: false,
                    height: '800px',
                    setup: (editor) => {
                        // 初始化时即全屏
                        editor.on('init', e => {
                            editor.execCommand('mceFullScreen')
                        });


                        editor.ui.registry.addIcon('open', '<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="24px" height="24px" viewBox="0 0 592.813 592.814" style="enable-background:new 0 0 592.813 592.814;" xml:space="preserve"> <path d="M589.173,356.232l-104.756,198.26c-5.125,9.858-19.653,20.285-30.872,20.285l-420.096,0.077 c-8.875,0-17.384-3.518-23.655-9.794C3.523,558.783,0,550.283,0,541.405l0.068-326.209c0-18.448,14.955-33.417,33.405-33.435 l30.715-0.029v28.496H43.639c-4.022,0-7.885,1.596-10.731,4.442c-2.843,2.846-4.442,6.706-4.442,10.731l0.03,305.796 c0,8.388,6.797,15.173,15.176,15.173h21.045l99.28-200.836c5.609-11.219,16.208-20.286,27.411-20.286h243.14l0.083-80.823 c15.876,1.472,28.406,14.641,28.406,30.893v49.931H574.55C587.719,325.384,598.808,338.406,589.173,356.232z M83.558,445.272 c-0.907-99.969,0-399.884,0-399.884c0-15.132,12.306-27.429,27.423-27.429h219.614c3.518,0,6.874,1.472,9.251,4.061l71,77.141 c2.128,2.323,3.321,5.364,3.321,8.515v199.839h-23.034V124.932c0-3.159-2.565-5.725-5.728-5.725h-54.343 c-6.36,0-11.532-5.163-11.532-11.511V46.721c0-3.16-2.565-5.725-5.728-5.725H110.995c-2.423,0-4.395,1.971-4.395,4.392v374.739 l-17.626,35.66C88.975,455.781,83.649,455.391,83.558,445.272z M342.588,96.182H376.8l-34.212-37.188V96.182z M355.065,142.667 H142.813c-7.82,0-14.168,6.354-14.168,14.174c0,7.814,6.354,14.171,14.168,14.171h212.258c7.82,0,14.187-6.362,14.187-14.171 C369.245,149.027,362.88,142.667,355.065,142.667z M369.245,239.376c0-7.814-6.359-14.162-14.18-14.162H142.813 c-7.82,0-14.168,6.36-14.168,14.162c0,7.814,6.354,14.162,14.168,14.162h212.258C362.88,253.539,369.245,247.19,369.245,239.376z M128.636,322.47c0,7.813,6.357,14.162,14.171,14.162h5.089c8.958-24.967,31.164-28.324,31.164-28.324h-36.253 C135.005,308.308,128.636,314.656,128.636,322.47z"/></svg>');
                        editor.ui.registry.addIcon('save_as', '<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="24px" height="24px" viewBox="0 0 16 16" style="enable-background:new 0 0 16 16;" xml:space="preserve"> <path style="fill:#030104;" d="M4.25,5.5l2.5-2H2.006C0.898,3.5,0,4.4,0,5.492v7.016c0,1.1,0.897,1.992,2.006,1.992h9.988 c1.108,0,2.006-0.9,2.006-1.992V8.9l-2,1.6v2H2v-7H4.25z"/> <path style="fill:#030104;" d="M11,3.477c-3.539,0.035-7.033,3.124-7.033,7.046c1.694-1.65,3.7-3.136,7.033-3.016V9.5l5-4l-5-4 V3.477z"/> </svg>');

                        editor.ui.registry.addButton('save_as', {
                            icon: "save_as",
                            tooltip: '另存为',
                            onAction: () => file.save(this.content, this.fileName)
                        });

                        editor.ui.registry.addButton('open', {
                            icon: 'open',
                            tooltip: '打开文件',
                            onAction: () => [this.fileName, this.content] = file.open()
                        });

                        // editor.ui.registry.addMenuItem('latex', {
                        //     text: '保存',
                        //     onAction: () => {
                        //     }
                        // });

                        editor.on('keydown', (e, event) => {
                            if (e.keyCode === 9) {
                                e.preventDefault();
                                editor.insertContent('&nbsp;&nbsp;&nbsp;&nbsp;');
                            }
                        });


                        // 自定义代码行为
                        editor.addCommand('my-codesample', e => {
                            let node = editor.selection.getEnd();
                            let lang = node.innerText.trim().toLowerCase();
                            node.parentElement.removeChild(node);
                            if (lang === 'py') {
                                lang = 'python';
                            } else if (lang === 'js') {
                                lang = 'javascript';
                            } else if (lang === 'c++') {
                                lang = 'cpp';
                            } else if (lang === 'c#') {
                                lang = 'csharp';
                            } else if (lang === 'html' || lang === 'xml') {
                                lang = 'markup';
                            }
                            let first = editor.settings.codesample_languages[0];
                            for (let elem of editor.settings.codesample_languages) {
                                if (elem.value === lang) {
                                    [first.text, elem.text] = [elem.text, first.text];
                                    [first.value, elem.value] = [elem.value, first.value];
                                    break;
                                }
                            }
                            editor.execCommand('codesample');
                            setTimeout(function () {
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
                                        // console.log(textarea.selectionStart)
                                        // console.log(textarea.selectionEnd)

                                    }

                                }, false)
                            }, 10)
                        })
                    },
                    language: 'zh_CN',
                    codesample_languages: [
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
                    ],
                    formats: format,
                    textpattern_patterns: [
                        {start: '#', format: 'h1'},
                        {start: '\\section{', end: '}', format: 'h1'},
                        {start: '##', format: 'h2'},
                        {start: '\\subsection{', end: '}', format: 'h2'},
                        {start: '###', format: 'h3'},
                        {start: '\\subsubsection{', end: '}', format: 'h3'},
                        {start: '####', format: 'h4'},
                        {start: '#####', format: 'h5'},
                        {start: '######', format: 'h6'},

                        {start: '* ', cmd: 'InsertUnorderedList'},
                        {start: '- ', cmd: 'InsertUnorderedList'},
                        {start: '1. ', cmd: 'InsertOrderedList', value: {'list-style-type': 'decimal'}},
                        {start: '1) ', cmd: 'InsertOrderedList', value: {'list-style-type': 'decimal'}},
                        {start: 'a. ', cmd: 'InsertOrderedList', value: {'list-style-type': 'lower-alpha'}},
                        {start: 'a) ', cmd: 'InsertOrderedList', value: {'list-style-type': 'lower-alpha'}},
                        {start: 'i. ', cmd: 'InsertOrderedList', value: {'list-style-type': 'lower-roman'}},
                        {start: 'i) ', cmd: 'InsertOrderedList', value: {'list-style-type': 'lower-roman'}},

                        {start: '```', cmd: 'my-codesample'},
                        {start: '$', cmd: 'my-codesample'},
                        {start: '$', end: '$', cmd: 'my-codesample'},


                        {start: '>', format: 'blockquote'},

                        {start: '*', end: '*', format: 'italic'},
                        {start: '**', end: '**', format: 'bold'},
                        {start: '__', end: '__', format: 'underline'},
                        {start: '~~', end: '~~', format: 'strikethrough'},
                        {start: '~', end: '~', cmd: 'createLink',},

                        {start: '\\red{', end: '}', format: 'red_front'},
                        {start: '\\red[', end: ']', format: 'red_back'},
                        {start: '\\green{', end: '}', format: 'green_front'},
                        {start: '\\green[', end: ']', format: 'green_back'},
                        {start: '\\blue{', end: '}', format: 'blue_front'},
                        {start: '\\blue[', end: ']', format: 'blue_back'},

                        {start: '---', replacement: '<hr/>'},
                        {start: '--', replacement: '—'},
                        {start: '(c)', replacement: '©'},
                        {start: '\\alpha', replacement: 'α'},
                        {start: '\\beta', replacement: 'β'},
                        {start: '\\gamma', replacement: 'γ'},
                        {start: '\\theta', replacement: 'θ'},


                    ],


                    save_onsavecallback: () => {
                        file.save(this.content, this.fileName)
                        // tinymce.activeEditor.notificationManager.open({
                        //     text: 'A test informational notification.'
                        // });
                    },
                    save_enablewhendirty: true
                },
                content: '',
                fileName: null,
            }
        },
        methods: {
            submit() {
                console.log(this.content)
            },

            key_down(even, editor) {
                if (even.keyCode === 13) {
                    this.process_enter(editor);
                } else {
                    // console.log(even.key)
                    // console.log(even.keyCode)
                    // console.log(even)
                    // console.log(editor)
                }
            },
            process_enter(editor) {
                console.log(editor.getContent())

            },
            save_file() {
                file.save(this.content, this.fileName);
            },

            save_as() {
                file.save(this.content)
            },

            open_file() {
                [this.fileName, this.content] = file.open();
            }

        }
    }
</script>

<style>
    .tox-notifications-container {
        display: none !important;
    }

    i.mce-i-[FONT-AWESOME-CLASSNAME]:before {
        content: "[FONT-AWESOME-CONTENT]";
        font-family: FontAwesome;
    }

</style>
