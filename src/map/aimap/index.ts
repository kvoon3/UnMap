import type { ILineString, ILineStringOption, IMap, IMapOption, IMarker, IMarkerOption, IPopupOption, ISDK } from '../../sdk'
import type { LoadUrlItem } from '../../base'
import { LineString } from './lingString'
import { Map } from './map'
import { Marker } from './marker'
import { Popup } from './popup'

export class AiMapSDK implements ISDK {
  Map(opt: IMapOption): IMap {
    return new Map(opt)
  }

  Popup(opt: IPopupOption) {
    return new Popup(opt)
  }

  Marker(opt: IMarkerOption): IMarker {
    return new Marker(opt)
  }

  LineString(opt: ILineStringOption): ILineString {
    return new LineString(opt)
  }

  load(loadUrls: LoadUrlItem[]): Promise<HTMLScriptElement | HTMLLinkElement>[] {
    return loadUrls.map((i) => {
      return new Promise((resolve, reject) => {
        let el: HTMLScriptElement | HTMLLinkElement
        switch (i.type) {
          case 'script':
            el = document.createElement('script')
            el.setAttribute('src', i.url)
            el.setAttribute('defer', '')
            el.setAttribute('async', 'async')
            break
          case 'link':
            el = document.createElement('link')
            el.setAttribute('href', i.url)
            el.setAttribute('rel', 'stylesheet')
            break
          default:
            reject(new Error('unknown type'))
            return
        }
        document.body.appendChild(el)
        el.addEventListener('load', () => resolve(el))
      })
    })
  }
}
