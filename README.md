# eslint-plugin-ramda-ban-hammer

Helper to get rid from Ramda

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-ramda-ban-hammer`:

```
$ npm install eslint-plugin-ramda-ban-hammer --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-ramda-ban-hammer` globally.

## Usage

Add `ramda-ban-hammer` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "ramda-ban-hammer"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "ramda-ban-hammer/rule-name": 2
    }
}
```

## Supported Rules

* Fill in provided rules here





