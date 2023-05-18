module.exports = {
    root: true,
    env: {
        node: true,
        jest: true
    },
    settings: {
        "import/resolver": {
            typescript: {} // this loads <rootdir>/tsconfig.json to eslint
        },
    },
    extends: [
        'plugin:vue/vue3-essential',
        'plugin:import/recommended',
        'eslint:recommended',
        '@vue/typescript/recommended'
    ],
    parserOptions: {
        ecmaVersion: 2020
    },
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-prototype-builtins': 'off',
        'vue/no-unused-components': 2,
        'vue/custom-event-name-casing': 'off',
        'vue/multi-word-component-names': 0,
        // promise
        'promise/always-return': 'off',
        // other stuff
        'import/extensions': ['error', 'always', {
            js: 'never',
            mjs: 'never',
            jsx: 'never',
            ts: 'never',
            tsx: 'never',
            vue: 'never',
            '': 'never'
        }]
    },
    overrides: [
        {
            files: [
                '**/__tests__/*.{j,t}s?(x)',
                '**/tests/unit/**/*.spec.{j,t}s?(x)'
            ],
            env: {
                jest: true
            }
        }
    ]
}
