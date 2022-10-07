module.exports = {
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser

  extends: [
    'next/core-web-vitals',
    'plugin:@typescript-eslint/recommended', // Uses the recommended rules from @typescript-eslint/eslint-plugin
    'prettier', // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
    'plugin:prettier/recommended', // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
  ],

  rules: {
    'react/no-unescaped-entities': 'off',
    'dot-notation': 'off',

    'no-useless-return': 'off',
    'no-useless-catch': 'off',

    'space-before-function-paren': [
      'error',
      {
        anonymous: 'always',
        named: 'never',
        asyncArrow: 'always',
      },
    ],

    indent: 'off',

    '@typescript-eslint/no-unused-vars': ['error'],
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-empty-interface': 'off',

    '@next/next/no-img-element': 'off',
    '@next/next/inline-script-id': 'off',
    'react/display-name': 'off',
  },
};
