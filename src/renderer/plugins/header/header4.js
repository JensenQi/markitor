let button = {
    register: editor => {
        let pattern = {start: '####', format: 'h4'};
        let format = {
            h4: {
                block: 'h4',
                styles: {
                    fontSize: '1.25em',
                    marginTop: '1rem',
                    marginBottom: '1rem',
                    fontWeight: 'bold'
                }
            }
        };
        if (editor.settings.textpattern_patterns === undefined) {
            editor.settings.textpattern_patterns = [pattern];
        } else {
            editor.settings.textpattern_patterns.push(pattern);
        }
        if (editor.settings.formats === undefined) {
            editor.settings.formats = {}
        }
        editor.settings.formats = Object.assign(editor.settings.formats, format);
    }
};

export default button;