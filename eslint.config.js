import antfu from '@antfu/eslint-config'

// @ts-check

export default antfu(
  {
    // has some type issue in vscode
    // typescript: {
    //   tsconfigPath: './tsconfig.json',
    // },
    ignores: [
      // eslint ignore globs here
      'playground',
      'src/utils/coordtransform.js',
    ],
  },
  {
    rules: {
      'no-object-constructor': 'error',
    },
  },
)
