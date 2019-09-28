let button = {
    register: editor => {
        let pattern = {start: '##', format: 'h2'};
        let format = {
            h2: {
                block: 'h2',
                styles: {
                    fontSize: '1.75em',
                    marginTop: '1rem',
                    marginBottom: '1rem',
                    fontWeight: 'bold',
                    borderBottom: '1px solid rgb(238, 238, 238)'
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