const js = require('@eslint/js');
const tsParser = require('@typescript-eslint/parser');

module.exports = [
    {
        ignores: ['dist/**', 'templates/**', 'node_modules/**', 'database.json'],
    },
    {
        ...js.configs.recommended,
        files: ['**/*.ts'],
        languageOptions: {
            parser: tsParser,
            globals: {
                require: 'readonly',
                module: 'readonly',
                __dirname: 'readonly',
                console: 'readonly',
                process: 'readonly',
                Buffer: 'readonly',
                setTimeout: 'readonly',
                clearTimeout: 'readonly',
                setInterval: 'readonly',
                clearInterval: 'readonly',
            },
        },
        rules: {
            'no-unused-vars': 'warn',
            'no-console': 'off',
            'indent': ['error', 4],
            'quotes': ['error', 'single'],
            'semi': ['error', 'always'],
        },
    },
];
