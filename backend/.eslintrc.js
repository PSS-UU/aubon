module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: [
        'airbnb-base',
        'airbnb-typescript/base'
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        tsconfigRootDir: __dirname,
        project: null
    },
    plugins: [
        '@typescript-eslint'
    ],
    rules: {
        // If a rule needs to be added or changed, start by looking on
        // https://typescript-eslint.io/rules/ and see if the rule exists there.
        // Otherwise use the normal eslint rules https://eslint.org/docs/rules/
        indent: 'off',
        '@typescript-eslint/indent': ['error', 4],
        'comma-dangle': 'off',
        '@typescript-eslint/comma-dangle': ['error', 'never'],
        'no-console': 'off'
    },
    overrides: [
        {
            files: ['**/*.ts', '**/*.tsx'],
            env: { browser: true, es6: true, node: true },
            extends: [
                'eslint:recommended',
                'plugin:@typescript-eslint/eslint-recommended',
                'plugin:@typescript-eslint/recommended'
            ],
            globals: { Atomics: 'readonly', SharedArrayBuffer: 'readonly' },
            parser: '@typescript-eslint/parser',
            parserOptions: {
                ecmaFeatures: { jsx: true },
                ecmaVersion: 2018,
                sourceType: 'module',
                project: './tsconfig.json'
            },
            plugins: ['@typescript-eslint'],
            rules: {}
        }
    ]
};
