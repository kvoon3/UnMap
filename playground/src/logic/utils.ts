import type { UnMap } from '@kvoon3/unmap'
import type { MaybeRef } from 'vue'
import { isAMapSDKLoaded, isAiMapSDKLoaded } from './state'

export function loadAMapSDK(unMap: UnMap) {
  return new Promise((resolve, reject) => {
    if (isAMapSDKLoaded.value) {
      resolve('done')
      return
    }

    // @ts-expect-error type error
    window._AMapSecurityConfig = {
      securityJsCode: 'a3db38589ec7faba6945f6758fbd3750',
    }

    Promise.all(
      unMap.load([{
        type: 'script',
        url: 'https://webapi.amap.com/maps?v=2.0&key=bb3fe75c2fa757bf5c6563708ffcc419',
      }]),
    )
      .then(() => {
        isAMapSDKLoaded.value = true
        consola.log('loaded amap', AMap)
        resolve('done')
      })
      .catch(error => reject(error))
  })
}
export function loadAiMapSDK(unMap: UnMap) {
  return new Promise((resolve, reject) => {
    if (isAiMapSDKLoaded.value) {
      resolve('done')
      return
    }

    Promise.all(
      unMap.load([{
        type: 'link',
        url: 'https://location-dev.newayz.com/aimap-gl-js/v2.6.0/aimap-gl.css',
      }, {
        type: 'script',
        url: 'https://location-dev.newayz.com/aimap-gl-js/v2.6.0/aimap-gl.js',
      }]),
    )
      .then(() => {
        aimap.accessToken = 'UFJGhyFdSzvm1ZbecYglp6CssgnDK7PZ'
        aimap.baseApiUrl = 'https://location-dev.newayz.com'
        aimap.workerCount = 2
        isAiMapSDKLoaded.value = true

        consola.log('loaded aimap', aimap)
        resolve('done')
      })
      .catch(error => reject(error))
  })
}

/**
 *
 * @param items
 * @param maybeContainerDOM el or id
 */
export function cleanMapItem(
  items: MaybeRef<{ remove: Function } | undefined>[],
  maybeContainerDOM?: HTMLElement | string,
) {
  items.forEach((item) => {
    if (isRef(item)) {
      item.value?.remove()
      item.value = undefined
    }
    else {
      item?.remove()
      item = undefined
    }
  })

  if (maybeContainerDOM) {
    const container
    = typeof maybeContainerDOM === 'string'
      ? document.getElementById(maybeContainerDOM)
      : maybeContainerDOM

    if (container)
      container.innerHTML = ''
  }
}
