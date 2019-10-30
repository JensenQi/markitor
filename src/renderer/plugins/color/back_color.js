let button = {
    register: editor => {
        let patterns = [
            {start: '\\red[', end: ']', format: 'red_back'},
            {start: '\\green[', end: ']', format: 'green_back'},
            {start: '\\blue[', end: ']', format: 'blue_back'},
        ];
        let format = {
            red_back: {inline: 'span', styles: {backgroundColor: 'red'}},
            green_back: {inline: 'span', styles: {backgroundColor: 'green'}},
            blue_back: {inline: 'span', styles: {backgroundColor: 'blue'}},
        };
        if (editor.settings.textpattern_patterns === undefined) {
            editor.settings.textpattern_patterns = patterns
        } else {
            editor.settings.textpattern_patterns = [...editor.settings.textpattern_patterns, ...patterns];
        }
        if (editor.settings.formats === undefined) {
            editor.settings.formats = {}
        }
        editor.settings.formats = Object.assign(editor.settings.formats, format);
    }
};

export default button;