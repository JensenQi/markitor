let button = {
    register: editor => {
        let pattern = {start: '#####', format: 'h5'};
        let format = {
            h5: {
                block: 'h5',
                styles: {
                    fontSize: '1em',
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