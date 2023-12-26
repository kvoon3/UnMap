/// <reference path="../../types/amap.d.ts" />

import type { ILayer, ILayerOption, IMapOption, IMarkerOption, ISDK } from '../../sdk'
import { Marker } from './marker'
import { Map } from './map'

export class AMapSDK implements ISDK {
  Layer(opt: ILayerOption): ILayer {
    throw new Error('Method not implemented.')
  }

  Popup(opt: ILayerOption): ILayer {
    throw new Error('Method not implemented.')
  }

  Marker(opt: IMarkerOption) {
    return new Marker(opt)
  }

  Map(opt: IMapOption) {
    return new Map(opt)
  }

  load(url: string): void {
    const script = document.createElement('script')
    script.setAttribute('src', url)
    script.setAttribute('defer', '')
    script.setAttribute('async', 'async')

    document.body.appendChild(script)
  }
}
