module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'standard',
    'plugin:cypress/recommended'
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    "semi": ["error", "always"],
    //"quotes": "off",
    "comma-dangle": ["error", "always-multiline"],
    "cypress/no-unnecessary-waiting": "warn",
    "spaced-comment": ["error", "never"],
    "eol-last": ["error", "never"],
    "eqeqeq": ["error", "smart"],
    "n/handle-callback-err": "warn",
    "no-tabs": 0
  },
  ignorePatterns: ['node_modules/', '.eslintrc.js', '.husky/pre-commit', 'convert.js', 'jsontoxls.js', 'cypress/reports/', 'cypress/results/'],
}
