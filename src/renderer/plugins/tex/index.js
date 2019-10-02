import tinymce from 'tinymce/tinymce';
import plugin from './plugin';

let button = {
    register: editor => {
        window.vm.$set(window.vm.cache, 'latex_preview', '');
        tinymce.PluginManager.add('latex', plugin);
    }
};
export default button;


