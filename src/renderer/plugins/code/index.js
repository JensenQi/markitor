import './plugin'

let button = {
    register: editor => {
        let pattern = {start: '```', cmd: 'my-codesample'};

        if (editor.settings.textpattern_patterns === undefined) {
            editor.settings.textpattern_patterns = [pattern];
        } else {
            editor.settings.textpattern_patterns.push(pattern);
        }



        // 自定义代码行为
        editor.addCommand('my-codesample', e => {
            // let node = editor.selection.getEnd();
            // let lang = node.innerText.trim().toLowerCase();
            // node.parentElement.removeChild(node);
            // if (lang === 'py') {
            //     lang = 'python';
            // } else if (lang === 'js') {
            //     lang = 'javascript';
            // } else if (lang === 'c++') {
            //     lang = 'cpp';
            // } else if (lang === 'c#') {
            //     lang = 'csharp';
            // } else if (lang === 'html' || lang === 'xml') {
            //     lang = 'markup';
            // }
            // let first = editor.settings.codesample_languages[0];
            // for (let elem of editor.settings.codesample_languages) {
            //     if (elem.value === lang) {
            //         [first.text, elem.text] = [elem.text, first.text];
            //         [first.value, elem.value] = [elem.value, first.value];
            //         break;
            //     }
            // }
            editor.execCommand('highlight');
        })

    }
};

export default button;