<template>
    <div style="height: 100%;position: absolute; width: 100%;">

           <Editor :init="this.tinymce" v-model="article_content" @onKeyDown="key_down"/>
    </div>
</template>

<script>
    import editorConfig from '../editor';
    import Editor from '@tinymce/tinymce-vue';

    export default {
        name: 'landing-page',
        components: {Editor},
        computed: {
            article_content: {
                get() {
                    return this.$store.state.article.content
                },
                set(value) {
                    this.$store.commit("setArticleContent", value)
                }
            }
        },
        mounted() {


        },
        data() {
            return {
                tinymce: editorConfig,
            }
        },
        methods: {
            test() {
                console.log(this.article_content)
            },


            key_down(even, editor) {
                if (even.keyCode === 13) {
                    console.log(editor.getContent())
                } else {
                    // console.log(even.key)
                    // console.log(even.keyCode)
                    // console.log(even)
                    // console.log(editor)
                }
            },
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

    .dropdown {
        font-size: 2em;
    }

    li.active {
        color: red;
    }

</style>
