import store from "../../store";


let button = {
    register: editor => {
        let newFile = () => {
            editor.setContent('');
            store.commit('setArticleContent', '');
            store.commit('setArticleFileName', null);
        };

        // 注册工具栏按钮
        editor.ui.registry.addButton('new_file', {
            icon: 'new-document',
            tooltip: '新建文件',
            onAction: newFile
        });

        // 注册命令
        editor.addCommand('new_file', newFile);
    }
};

export default button;

