module.exports = {
  root: true,

  env: {
    node: true,
    es2021: true,
  },

  parser: '@typescript-eslint/parser',

  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
  },

  plugins: ['@typescript-eslint'],

  extends: ['eslint:recommended', 'prettier'],

  rules: {
    '@typescript-eslint/no-var-requires': 0,
    'no-unused-vars': 'warn',
  },
}
