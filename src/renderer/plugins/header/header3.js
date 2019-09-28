let button = {
    register: editor => {
        let pattern = {start: '###', format: 'h3'};
        let format = {
            h3: {
                block: 'h3',
                styles: {
                    fontSize: '1.5em',
                    marginTop: '1rem',
                    marginBottom: '1rem',
                    fontWeight: 'bold'
                }
            },
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