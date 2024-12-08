import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default [
  { ignores: ['dist'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    settings: { react: { version: '18.3' } },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      'react/jsx-no-target-blank': 'off',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],'semi': ['error', 'always'],
      'react/prop-types': 'off',
      'curly': ['error', 'all'],
      'brace-style': ['error', '1tbs', { 'allowSingleLine': false }],
      'indent': ['error', 2, { SwitchCase: 1 }], // 2 espacios para la indentación, 1 nivel para los cases de switch
      'space-before-blocks': ['error', 'always'],
      'space-in-parens': ['error', 'never'],
      'space-before-function-paren': ['error', 'always'],
      'keyword-spacing': ['error', { before: true, after: true }],
      'object-curly-spacing': ['error', 'always'],
      'array-bracket-spacing': ['error', 'never'],
      'quotes': ['error', 'single', { avoidEscape: true }], // Usar comillas simples
      'eol-last': ['error', 'always'],
    },
  },
];
