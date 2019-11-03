import robot from 'robotjs'

let patterns = [
    {text: '\\red{}', value: '\\red{}'},
    {text: '\\red[]', value: '\\red[]'},
    {text: '\\blue{}', value: '\\blue{}'},
    {text: '\\blue[]', value: '\\blue[]'},
    {text: '\\green{}', value: '\\green{}'},
    {text: '\\green[]', value: '\\green[]'},
];

let code_pattern = [
    {text: '```python', value: '```python'},
    {text: '```js', value: '```javascript'},
    {text: '```java', value: '```java'},
];

let latex_pattern = [
    {text: '$inline', value: ''},
    {text: '$$block', value: ''},
];

let button = {
    register: editor => {
        editor.ui.registry.addAutocompleter('colors', {
            ch: '\\',
            minChars: 2,
            columns: 1,
            fetch: pattern => new tinymce.util.Promise(resolve => resolve(
                patterns.filter(char => char.text.indexOf(pattern) !== -1).map(
                    char => new Object({
                        value: char.value,
                        text: char.text,
                    })
                )
            )),
            onAction: function (autocompleteApi, rng, value) {
                editor.selection.setRng(rng);
                editor.insertContent(value);
                autocompleteApi.hide();
                robot.keyTap("left");
            }
        });

        editor.ui.registry.addAutocompleter('code', {
            ch: '`',
            minChars: 0,
            columns: 1,
            fetch: function (pattern) {
                let matchedChars = code_pattern.filter(function (char) {
                    return char.text.indexOf(pattern) !== -1;
                });
                return new tinymce.util.Promise(function (resolve) {
                    let results = matchedChars.map(function (char) {
                        return {
                            value: char.value,
                            text: char.text,
                        }
                    });
                    resolve(results);
                });
            },
            onAction: function (autocompleteApi, rng, value) {
                editor.selection.setRng(rng);
                editor.insertContent(value);
                autocompleteApi.hide();
                robot.keyTap("enter");
            }
        });


        editor.ui.registry.addAutocompleter('latex', {
            ch: '$',
            minChars: 0,
            columns: 1,
            fetch: function (pattern) {
                let matchedChars = latex_pattern.filter(function (char) {
                    return char.text.indexOf(pattern) !== -1;
                });
                return new tinymce.util.Promise(function (resolve) {
                    let results = matchedChars.map(function (char) {
                        return {
                            value: char.value,
                            text: char.text,
                        }
                    });
                    resolve(results);
                });
            },
            onAction: function (autocompleteApi, rng, value) {
                editor.selection.setRng(rng);
                editor.insertContent(value);
                autocompleteApi.hide();
                robot.keyTap("enter");
            }
        });

    }
};


export default button;


