import eslint from '@eslint/js'
import tslint from 'typescript-eslint'

function extract(configs) {
    return configs.reduce((rules, config) => ({ ...rules, ...(config.rules ?? {}) }), {});
}

// From: https://github.com/steven-fe/coinstore-ui/blob/8d7afaa92650f8373aec7454bd73d74c6c65d5ed/eslint.config.ts
export default [
    {
        name: 'Trefoil Theme',
        files: ['src/**/*.ts'],
        languageOptions: {
            parser: tslint.parser,
            sourceType: 'module',
            ecmaVersion: 'latest',
            parserOptions: {
                project: './tsconfig.json',
            }
        },
        plugins: {
            '@typescript-eslint': tslint.plugin
        },
        rules: {
            // Apply default rules
            ...eslint.configs.all.rules,
            'func-style': 'off',
            'id-length': 'off',
            'max-statements': 'off',
            'no-magic-numbers': 'off',
            'no-plusplus': 'off',
            'one-var': 'off',
            'camelcase': 'error',
            'quotes': ['error', 'single'],
            'sort-imports': ['error', { allowSeparatedGroups: true }],

            // Rules for TypeScript
            ...extract(tslint.configs.strictTypeChecked),
            ...extract(tslint.configs.stylisticTypeChecked),
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/no-non-null-assertion': 'off',
            '@typescript-eslint/no-unsafe-assignment': 'off',
            '@typescript-eslint/no-unsafe-call': 'off',
            '@typescript-eslint/no-unsafe-member-access': 'off',
            '@typescript-eslint/no-unsafe-argument': 'off',
            '@typescript-eslint/restrict-template-expressions': ['error', { allowAny: false, allowNumber: true }],
            "@typescript-eslint/naming-convention": "error"
        }
    }
];
