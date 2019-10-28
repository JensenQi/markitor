let button = {
    register: editor => {
        let pattern = {start: '>', format: 'blockquote'};

        if (editor.settings.textpattern_patterns === undefined) {
            editor.settings.textpattern_patterns = [pattern];
        } else {
            editor.settings.textpattern_patterns.push(pattern);
        }
    }
};

export default button;