import store from "../../store";

let button = {
    register: editor => {
        editor.ui.registry.addButton('new_file', {
            icon: 'new-document',
            tooltip: '新建文件',
            onAction: () => {
                editor.setContent('');
                store.commit('setArticleContent', '');
                store.commit('setArticleFileName', null);
            }
        });
    }
};

export default button;

