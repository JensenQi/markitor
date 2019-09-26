const state = {
    article: {
        fileName: null,
        content: '',
        type: 'html'
    }
};

const mutations = {
    setArticleType(state, type) {
        state.article.type = type;
    },

    setArticleFileName(state, fileName) {
        state.article.fileName = fileName
    },

    setArticleContent(state, content) {
        state.article.content = content
    },
};

export default {
    state,
    mutations
};
