import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import tsParser from '@typescript-eslint/parser';
import stylistic from '@stylistic/eslint-plugin';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs}'],
    ignores: ['eslint.config.mts'],
    plugins: { js },
    extends: ['js/recommended'],
    languageOptions: { globals: globals.browser },
  },
  {
    files: ['**/*.{ts,mts,cts}'],
    ignores: ['eslint.config.mts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
        sourceType: 'module'
      },
      globals: globals.node
    },
    plugins: { '@typescript-eslint': tseslint.plugin, stylistic },
    rules: {
      'curly': 'error',
      'eol-last': 'error',
      'indent': ['error', 2],
      'max-len': ['error', { code: 120, tabWidth: 2, ignoreUrls: true, ignoreTemplateLiterals: true, ignoreStrings: true }],
      'no-multiple-empty-lines': ['error', { max: 1 }],
      'no-bitwise': 'error',
      'no-debugger': 'error',
      'prefer-const': 'error',
      'no-duplicate-imports': 'error',
      'no-shadow': 'error',
      'no-unused-expressions': 'error',
      'quotes': ['error', 'single', { avoidEscape: true }],
      'semi': ['error', 'never'],
      'space-before-function-paren': ['error', { anonymous: 'always', named: 'never', asyncArrow: 'always' }],
      '@typescript-eslint/adjacent-overload-signatures': 'error',
      '@typescript-eslint/no-empty-interface': 'off',
      '@typescript-eslint/unified-signatures': 'error',
      '@typescript-eslint/no-inferrable-types': ['error', { ignoreParameters: true }],
      '@typescript-eslint/no-var-requires': 'error',
      '@typescript-eslint/no-explicit-any': 'warn',
      'stylistic/array-bracket-spacing': ['error', 'never'],
      'stylistic/object-curly-spacing': ['error', 'always'],
      'stylistic/comma-dangle': ['error', 'never'],
      'stylistic/key-spacing': ['error', { beforeColon: false, afterColon: true }],
      'stylistic/no-multi-spaces': 'error',
      'stylistic/no-trailing-spaces': 'error',
    },
    settings: {
      'import/resolver': {
        typescript: {
          project: './tsconfig.json'
        }
      }
    }
  },
]);
