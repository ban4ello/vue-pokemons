module.exports = {
  root: true,
  env: {
    node: true,
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard',
  ],
  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    'quotes': ['error', 'single'],
    'semi': ['error', 'always'],
    'comma-dangle': ['error', 'always-multiline'],
    'camelcase': 'off',
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
