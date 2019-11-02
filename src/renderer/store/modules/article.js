import fs from 'fs'

const state = {
    fileName: null,
    content: '',
    type: 'html',
};

const getters = {
    content_with_style: state => {
        let css = `<style>${fs.readFileSync('static/highlight/monokai.css', 'utf-8')}</style>`;
        let idx = state.content.indexOf('<head>') + 6;
        return state.content.substring(0, idx) + css + state.content.substring(idx);
    }
};

const mutations = {
    setArticleType(state, type) {
        state.type = type;
    },

    setArticleFileName(state, fileName) {
        state.fileName = fileName
    },

    setArticleContent(state, content) {
        state.content = content
    },
};

export default {
    state,
    getters,
    mutations
};
