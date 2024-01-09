import type { ILineStringOption, IMapOption, IMarkerOption, IPopupOption, ISDK } from '../../sdk'
import type { LoadUrlItem } from '../../base'
import { Marker } from './marker'
import { Map } from './map'
import { Popup } from './popup'
import { LineString } from './lingString'

export class AMapSDK implements ISDK {
  Popup(opt: IPopupOption) {
    return new Popup(opt)
  }

  Marker(opt: IMarkerOption) {
    return new Marker(opt)
  }

  Map(opt: IMapOption) {
    return new Map(opt)
  }

  LineString(opt: ILineStringOption) {
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
