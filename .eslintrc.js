module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 13,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  ignorePatterns: ['README.md', 'package-lock.json', 'package.json', '/public/', '**/*.css'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/jsx-filename-extension': 'off',
    'react/function-component-definition': 'off',
    'import/no-unresolved': 'off',
    'react/prop-types': 'off',
    'max-len': ['error', { code: 120 }],
    'no-plusplus': 'off',
    'no-nested-ternary': 'off',
    'default-param-last': 'off',
    'react/jsx-no-constructed-context-values': 'off',
    'no-alert': 'off',
  },
};
