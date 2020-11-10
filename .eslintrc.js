module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  ignorePatterns: [
    'node_modules/',
    '.nuxt/',
    '.vercel/',
    '.vscode/',
    'dist/',
    'public/',
    'static/'
  ],
  rules: {
    'vue/attribute-hyphenation': 'off',
    'vue/no-v-html': 'off',
    'no-console': 'off'
  }
}
