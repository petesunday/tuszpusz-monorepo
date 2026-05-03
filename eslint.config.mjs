import { defineConfig } from 'eslint/config';
import typescriptEslint from 'typescript-eslint';
import nxPlugin from '@nx/eslint-plugin';
import angular from 'angular-eslint';
import rxjsX from 'eslint-plugin-rxjs-x';
import stylistic from '@stylistic/eslint-plugin';
import { importX } from 'eslint-plugin-import-x';
import unusedImportsPlugin from 'eslint-plugin-unused-imports';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript';

export default defineConfig(
  {
    ignores: [
      '**/dist',
      '**/out-tsc',
      '**/vitest.config.*.timestamp*',
      'node_modules',
      '**/coverage/**',
    ],
  },
  {
    files: ['**/*.ts'],
    extends: [
      typescriptEslint.configs.recommended,
      rxjsX.configs.recommended,
      importX.flatConfigs.recommended,
      importX.flatConfigs.typescript,
    ],
    plugins: {
      '@angular-eslint': angular.tsPlugin,
      'unused-imports': unusedImportsPlugin,
      '@nx': nxPlugin,
      '@stylistic': stylistic,
      '@typescript-eslint': typescriptEslint.plugin,
      unicorn: eslintPluginUnicorn,
    },
    languageOptions: {
      parser: typescriptEslint.parser,
      parserOptions: {
        projectService: true,
      },
    },
    settings: {
      'import-x/resolver-next': [
        createTypeScriptImportResolver({
          alwaysTryTypes: true,
          project: 'tsconfig.base.json',
        }),
      ],
    },
    rules: {
      ...angular.tsPlugin.configs.recommended.rules,
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'tp',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'tp',
          style: 'kebab-case',
        },
      ],
      '@angular-eslint/pipe-prefix': ['error', { prefixes: ['tp'] }],
      'import/order': 'off',
      'max-depth': ['error', 3],
      '@typescript-eslint/no-explicit-any': ['warn'],
      '@typescript-eslint/member-ordering': 0,
      '@typescript-eslint/naming-convention': 0,
      '@typescript-eslint/explicit-member-accessibility': [
        'error',
        {
          accessibility: 'explicit',
          overrides: {
            constructors: 'off',
          },
        },
      ],
      '@angular-eslint/no-host-metadata-property': 'off',
      '@angular-eslint/no-output-on-prefix': 'off',
      '@angular-eslint/ban-types': 'off',
      'unused-imports/no-unused-imports': 'warn',
      '@nx/enforce-module-boundaries': ['error', {}],
      'no-console': 'error',
      '@angular-eslint/prefer-on-push-component-change-detection': ['error'],
      'prefer-const': 'error',
      '@stylistic/lines-between-class-members': [
        'error',
        {
          enforce: [{ blankLine: 'always', prev: '*', next: 'method' }],
        },
      ],
      'no-debugger': 'error',
      'max-params': 'error',
      'import-x/order': [
        'error',
        {
          groups: [
            ['builtin', 'external'],
            'internal',
            ['sibling', 'parent'],
            'index',
            'unknown',
          ],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
      'import-x/namespace': ['off'],
      '@angular-eslint/prefer-signals': 'error',
      'rxjs-x/no-ignored-default-value': 'error',
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['libs/*'],
              message: 'Use @tuszpusz path mappings instead of libs imports',
            },
          ],
        },
      ],
    },
  },
  {
    files: ['**/*.html'],
    languageOptions: {
      parser: angular.templateParser,
    },
    plugins: {
      '@angular-eslint': angular.tsPlugin,
      '@angular-eslint/template': angular.templatePlugin,
    },
    rules: {
      '@angular-eslint/template/prefer-self-closing-tags': 'error',
    },
  },
  {
    files: ['**/*.spec.ts', '**/test-setup.ts'],
  },
);
