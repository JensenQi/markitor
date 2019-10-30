let button = {
    register: editor => {
        let patterns = [
            {start: '\\red{', end: '}', format: 'red_front'},
            {start: '\\green{', end: '}', format: 'green_front'},
            {start: '\\blue{', end: '}', format: 'blue_front'},
        ];
        let format = {
            red_front: {inline: 'span', styles: {color: 'red'}},
            green_front: {inline: 'span', styles: {color: 'green'}},
            blue_front: {inline: 'span', styles: {color: 'blue'}},
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