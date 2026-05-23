import js from '@eslint/js'
import vueTsConfig from '@vue/eslint-config-typescript'
import prettier from 'eslint-config-prettier'
import importX from 'eslint-plugin-import-x'
import unusedImports from 'eslint-plugin-unused-imports'
import pluginVue from 'eslint-plugin-vue'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default [
  {
    ignores: ['dist', 'node_modules', 'coverage'],
  },

  {
    languageOptions: {
      globals: globals.browser,
    },
  },

  js.configs.recommended,

  ...tseslint.configs.recommended,

  ...pluginVue.configs['flat/recommended'],

  ...vueTsConfig(),

  {
    plugins: {
      'import-x': importX,
      'unused-imports': unusedImports,
    },

    rules: {
      // imports
      'unused-imports/no-unused-imports': 'warn',

      'import-x/order': [
        'warn',
        {
          groups: ['builtin', 'external', 'internal', ['parent', 'sibling', 'index']],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],

      // Vue
      'vue/multi-word-component-names': 'off',

      // TS
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },

  prettier,
]
