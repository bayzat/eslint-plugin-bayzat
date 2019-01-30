# eslint-plugin-bayzat

ESLint plugin with custom rules we use at Bayzat

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ yarn add -D eslint
```

Next, install `eslint-plugin-bayzat`:

```
$ yarn add -D eslint-plugin-bayzat
```

**Note:** If you installed ESLint globally then you must also install `eslint-plugin-bayzat` globally.

## Usage

Add `bayzat` to the plugins section of your `.eslintrc.js` configuration file. You can omit the `eslint-plugin-` prefix:

```js
{
    plugins: [
        'bayzat'
    ]
}
```


Then configure the rules you want to use under the rules section.

```js
{
    rules: {
        'bayzat/no-jquery': 2
    }
}
```

## Supported Rules

- [no-jquery](docs/rules/no-jquery.md)
- [no-get-for-flat-props](docs/rules/no-get-for-flat-props.md)
- [no-get-properties-for-flat-props](docs/rules/no-get-properties-for-flat-props.md)
- [no-get-properties-with-array](docs/rules/no-get-properties-with-array.md)
