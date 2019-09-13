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

    import '../../../plugins/latex'


    import '../../../plugins/emoticons/js/emojis'
    import '../../../langs/zh_CN'
    import '../../../skins/ui/oxide/skin.min.css'
    import '../../../skins/ui/oxide/content.min.css'
    import '../../../skins/content/default/content.css'


    import vim from '../../../plugins/vim'

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
                    plugins: 'code latex print preview fullpage importcss searchreplace autolink save directionality visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons',
                    toolbar: 'code | latex undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor casechange permanentpen formatpainter removeformat | pagebreak | charmap emoticons | preview save print | insertfile image media pageembed template link anchor | a11ycheck ltr rtl | showcomments addcomment',
                    // menu: {
                    //     file: {title: '文件', items: 'newdocument'},
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

                        editor.on('keydown', (e, event) => {
                            if(e.keyCode === 9){
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
                                textarea.addEventListener('keydown', e =>{
                                    if(e.keyCode === 9){
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
                    formats: {
                        red_front: {inline: 'span', styles: {color: 'red'}},
                        red_back: {inline: 'span', styles: {backgroundColor: 'red'}},
                        green_front: {inline: 'span', styles: {color: 'green'}},
                        green_back: {inline: 'span', styles: {backgroundColor: 'green'}},
                        blue_front: {inline: 'span', styles: {color: 'blue'}},
                        blue_back: {inline: 'span', styles: {backgroundColor: 'blue'}},
                    },
                    textpattern_patterns: [
                        {start: '#', format: 'h1'},
                        {start: '##', format: 'h2'},
                        {start: '###', format: 'h3'},
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
                        {start: '$', end:'$', cmd: 'my-codesample'},


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
                },
                content: '',

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

            }

        }
    }
</script>

<style>
    .tox-notifications-container {
        display: none !important;
    }
</style>
