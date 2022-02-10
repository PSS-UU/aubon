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
        project: './tsconfig.json'
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
    }
};
