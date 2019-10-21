let button = {
    register: editor => {
        let patterns = [
            {start: '1. ', cmd: 'InsertOrderedList', value: {'list-style-type': 'decimal'}},
            {start: 'a. ', cmd: 'InsertOrderedList', value: {'list-style-type': 'lower-alpha'}},
            {start: 'i. ', cmd: 'InsertOrderedList', value: {'list-style-type': 'lower-roman'}},
        ];

        if (editor.settings.textpattern_patterns === undefined) {
            editor.settings.textpattern_patterns = patterns;
        } else {
            editor.settings.textpattern_patterns = [...editor.settings.textpattern_patterns, ...patterns]
        }
    }
};

export default button;