module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: [
        'airbnb'
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
    },
    plugins: [
        '@typescript-eslint'
    ],
    rules: {
        indent: ['error', 4],
        'comma-dangle': ['error', 'never'],
        'no-console': 'off'
    }
};
