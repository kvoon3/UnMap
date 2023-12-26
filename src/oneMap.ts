import type { IMapOption, IMarkerOption, ISDK } from './sdk'
import { AMapSDK } from './map'
import { WhichMap } from './map/mapType'
import { isEmpty } from './utils/boolean'

function useWhichSDK(which: WhichMap) {
  return {
    [WhichMap.AMap]: new AMapSDK(),
    [WhichMap.AiMap]: void 0,
  }[which]
}

export class OneMap {
  private sdk: ISDK | undefined
  constructor(maybeSDK: ISDK | WhichMap) {
    if (isEmpty(maybeSDK))
      throw new Error('sdk or which sdk info is required')

    if (typeof maybeSDK !== 'object') {
      const which = maybeSDK
      this.sdk = useWhichSDK(which)
    }
    else {
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

  load(url: string) {
    if (!this.sdk)
      throw new Error('sdk not loaded')

    this.sdk.load(url)
  }
}
