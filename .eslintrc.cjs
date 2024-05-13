module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@tanstack/eslint-plugin-query/recommended'
  ],
  ignorePatterns: [
    'dist',
    '.eslintrc.cjs',
    'tailwind.config.js',
    'tsconfig.json',
    'tsconfig.node.json',
    'babel.config.cjs',
    'jest.config.cjs',
    'jest.setup.js'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      tsx: true,
    }
  },
  overrides: [
    {
      "files": ["tests/**/*"],
      "env": {
        "jest": true
      }
    }
  ],
  plugins: ['react-refresh'],
  rules: {
    '@typescript-eslint/ban-types': 'warn',
    '@typescript-eslint/ban-ts-comment': 'warn',
    '@typescript-eslint/no-explicit-any': 'warn',
    'react-refresh/only-export-components': 'warn',
    'linebreak-style': 'off',
    'no-unused-vars': 0,
    '@typescript-eslint/no-unused-vars': 1,
    'import/no-import-module-exports': 0,
    'no-nested-ternary': 0,
    'import/no-unresolved': 0,
    'import/no-named-as-default': 0,
    'no-unused-expressions': 0,
    'comma-dangle': 0,  // not sure why airbnb turned this on. gross!
    'indent': [2, 2, {'SwitchCase': 1}],
    'no-console': 0,
    'no-alert': 0,
    'id-length': 0,
    'no-script-url': 0,
    'import/no-extraneous-dependencies': 0,
    'no-underscore-dangle': 0,
    'react/jsx-filename-extension': 0,
    'global-require': 0,
    'import/newline-after-import': 0,
    'import/extensions': 0,
    'prefer-template': 0,
    'max-len': 0,
    'react/prefer-stateless-function': 0,
    'react/forbid-prop-types': 0,
    'jsx-a11y/href-no-hash': 'off',
    'function-paren-newline': 0,
    'react/no-typos': 0,
    'jsx-a11y/anchor-is-valid': 0,
    'react/default-props-match-prop-types': 0,
    'arrow-parens': 0,
    'consistent-return': 2,
    'no-else-return'   : 1,
    'semi'             : [1, 'always'],
    'space-unary-ops'  : 2,
    'quotes': [2, 'single', { 'avoidEscape': true }],
    'quote-props': [2, 'consistent', { 'numbers': true }], 
    'jsx-quotes': [2, 'prefer-double'],
    'react-hooks/rules-of-hooks': 'warn', // Checks rules of Hooks
    'react-hooks/exhaustive-deps': 'warn' // Checks effect dependencies
  },
}
