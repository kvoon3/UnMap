import antfu from '@antfu/eslint-config'
import unocss from '@unocss/eslint-plugin'

export default antfu(
  {
    ignores: [
      // eslint ignore globs here
    ],
  },
  unocss.configs.flat,
)
