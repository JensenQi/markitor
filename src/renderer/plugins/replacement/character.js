let button = {
    register: editor => {
        let patterns = [
            {start: '---', replacement: '<hr/>'},
            {start: '--', replacement: '—'},
            {start: '(c)', replacement: '©'},
            {start: '\\alpha', replacement: 'α'},
            {start: '\\beta', replacement: 'β'},
            {start: '\\gamma', replacement: 'γ'},
            {start: '\\theta', replacement: 'θ'},
        ];

        if (editor.settings.textpattern_patterns === undefined) {
            editor.settings.textpattern_patterns = patterns;
        } else {
            editor.settings.textpattern_patterns = [...editor.settings.textpattern_patterns, ...patterns]
        }
    }
};

export default button;