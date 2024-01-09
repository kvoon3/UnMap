import type { LoadUrlItem } from '../base/loadUrl'
import type { ILineString, ILineStringOption } from './lineString'
import type { IMap, IMapOption } from './map'
import type { IMarker, IMarkerOption } from './marker'
import type { IPopup, IPopupOption } from './popup'

export interface ISDK {
  Map(opt: IMapOption): IMap
  Popup(opt?: IPopupOption): IPopup
  Marker(opt?: IMarkerOption): IMarker
  LineString(opt: ILineStringOption): ILineString
  //   Icon(opt: IconOption): Icon

  load(loadUrls: LoadUrlItem[]): Promise<HTMLScriptElement | HTMLLinkElement>[]
}
