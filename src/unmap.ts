import type { IMapOption, IMarkerOption, IPopupOption, ISDK } from './sdk'
import { AMapSDK, AiMapSDK } from './map'
import { WhichMap } from './map/mapType'
import { isEmpty } from './utils'
import type { LoadUrlItem } from './base/loadUrl'
import type { ILineStringOption } from './sdk/lineString'

function useWhichSDK(which: WhichMap) {
  return {
    [WhichMap.AMap]: new AMapSDK(),
    [WhichMap.AiMap]: new AiMapSDK(),
  }[which]
}

export class UnMap {
  whichMap: WhichMap | 'unknownMap'
  private sdk: ISDK | undefined
  constructor(maybeSDK: ISDK | WhichMap, whichMap?: WhichMap) {
    if (isEmpty(maybeSDK))
      throw new Error('sdk or which sdk info is required')

    if (typeof maybeSDK !== 'object') {
      const which = maybeSDK
      this.whichMap = which
      this.sdk = useWhichSDK(which)
    }
    else {
      this.whichMap = whichMap || 'unknownMap'
      const sdk = maybeSDK
      this.sdk = sdk
    }

    return this
  }

  Map(opt: IMapOption) {
    if (!this.sdk)
      throw new Error('sdk not loaded')

    return this.sdk.Map(opt)
  }

  Marker(opt?: IMarkerOption) {
    if (!this.sdk)
      throw new Error('sdk not loaded')

    return this.sdk.Marker(opt)
  }

  Popup(opt?: IPopupOption) {
    if (!this.sdk)
      throw new Error('sdk not loaded')

    return this.sdk.Popup(opt)
  }

  LineString(opt: ILineStringOption) {
    if (!this.sdk)
      throw new Error('sdk not loaded')

    return this.sdk.LineString(opt)
  }

  Point(x: number, y: number) {
    if (!this.sdk)
      throw new Error('sdk not loaded')

    return this.sdk.Point(x, y)
  }

  load(loadUrls: LoadUrlItem[]) {
    if (!this.sdk)
      throw new Error('sdk not loaded')

    return this.sdk.load(loadUrls)
  }
}
