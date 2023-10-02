module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "node": true //新增
    },
    "extends": [
        "eslint:recommended",
        "plugin:vue/vue3-essential",
        "plugin:@typescript-eslint/recommended"
    ],
    "overrides": [
    ],
    "parser": "vue-eslint-parser", //修改
    "parserOptions": {
        "ecmaVersion": "latest",
        "parser": "@typescript-eslint/parser", //新增
        "sourceType": "module"
    },
    "plugins": [
        "vue",
        "@typescript-eslint"
    ],
    "rules": {
    }
}