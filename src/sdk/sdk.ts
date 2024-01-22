import type { LoadUrlItem } from '../base/loadUrl'
import type { ILineString, ILineStringOption } from './lineString'
import type { IMap, IMapOption } from './map'
import type { IMarker, IMarkerOption } from './marker'
import type { IPoint } from './point'
import type { IPopup, IPopupOption } from './popup'

export interface ISDK {
  Map(opt: IMapOption): IMap
  Popup(opt?: IPopupOption): IPopup
  Marker(opt?: IMarkerOption): IMarker
  LineString(opt: ILineStringOption): ILineString
  Point(x: number, y: number): IPoint

  load(loadUrls: LoadUrlItem[]): Promise<HTMLScriptElement | HTMLLinkElement>[]
}
