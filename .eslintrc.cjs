module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['import', '@typescript-eslint', 'react-hooks'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parserOptions: {
    tsconfigRootDir: '.',
  },
  env: {
    node: true,
    browser: true,
  },
  rules: {
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    quotes: [2, 'single', { avoidEscape: true }],
    'import/extensions': 0,
    'react/prop-types': 0,
    'react/react-in-jsx-scope': 'off',
    'import/newline-after-import': ['error', { count: 1 }],
    'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],
    'import/order': [
      'warn',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'unknown',
          'parent',
          'sibling',
          'index',
          'object',
          'type',
        ],
        pathGroups: [
          {
            pattern:
              '{react,react-redux,react-dom/**,react-router,react-router-dom,react-query,react-virtualized,react-virtualized/**,react-**,@react**,redux,redux-**,@redux**,react-toastify,react-toastify/**,redux-persist,redux-persist/**}',
            group: 'builtin',
            position: 'before',
          },
          {
            pattern: '@**',
            group: 'external',
            position: 'after',
          },
          {
            pattern: '**/**',
            group: 'external',
            position: 'after',
          },
          {
            pattern: '**',
            group: 'external',
            position: 'after',
          },
          {
            pattern: 'src/**',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: './**',
            group: 'internal',
            position: 'before',
          },
        ],
        pathGroupsExcludedImportTypes: ['builtin'],
        alphabetize: {
          order: 'asc',
        },
      },
    ],
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      node: {
        paths: ['src'],
        extensions: ['.ts', '.tsx', 'js'],
      },
    },
  },
};
