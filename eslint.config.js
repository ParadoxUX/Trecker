import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import boundaries from 'eslint-plugin-boundaries';

export default tseslint.config(
  { ignores: ['dist', 'node_modules'] },

  {
    files: ['**/*.{ts,tsx}'],
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      boundaries,
    },
    settings: {
      'boundaries/elements': [
        { type: 'app', pattern: 'src/app/*' },
        { type: 'pages', pattern: 'src/pages/*' },
        { type: 'widgets', pattern: 'src/widgets/*' },
        { type: 'features', pattern: 'src/features/*' },
        { type: 'entities', pattern: 'src/entities/*' },
        { type: 'shared', pattern: 'src/shared/*' },
      ],
      'boundaries/include': ['src/**/*'],
      'boundaries/ignore': ['**/*.test.*', '**/*.spec.*'],
    },
    rules: {
      // --- React ---
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],

      // --- TypeScript ---
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],

      // --- FSD: слои импортируют только сверху вниз ---
      'boundaries/dependencies': [
        'error',
        {
          default: 'disallow',
          policies: [
            {
              from: { element: { type: 'app' } },
              allow: [
                { to: { element: { type: ['pages', 'widgets', 'features', 'entities', 'shared'] } } },
              ],
            },
            {
              from: { element: { type: 'pages' } },
              allow: [
                { to: { element: { type: ['widgets', 'features', 'entities', 'shared'] } } },
              ],
            },
            {
              from: { element: { type: 'widgets' } },
              allow: [
                { to: { element: { type: ['features', 'entities', 'shared'] } } },
              ],
            },
            {
              from: { element: { type: 'features' } },
              allow: [
                { to: { element: { type: ['entities', 'shared'] } } },
              ],
            },
            {
              from: { element: { type: 'entities' } },
              allow: [{ to: { element: { type: 'shared' } } }],
            },
            {
              from: { element: { type: 'shared' } },
              allow: [{ to: { element: { type: 'shared' } } }],
            },
          ],
        },
      ],
    },
  },

  // Исключение для @x-мостов (единственный способ общения слайсов одного слоя)
  {
    files: ['src/**/@x/**/*.ts', 'src/**/@x/**/*.tsx'],
    rules: {
      'boundaries/dependencies': 'off',
    },
  },
);
