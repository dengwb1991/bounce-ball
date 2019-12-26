module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: [
    'standard',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  plugins: ['@typescript-eslint', 'react'],
  env: {                         
    browser: true,
    node: true
  },
  settings: { 
    react: {
      pragma: 'React',
      version: 'detect'
    }
  }, 
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  rules: {
    'semi': 0,
    'eol-last': 0,
    'prefer-rest-params': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/explicit-function-return-type': "off"
  }                           
}