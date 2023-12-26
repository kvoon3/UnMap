import type { ILayer, ILayerOption } from './layer'
import type { IMap, IMapOption } from './map'
import type { IMarker, IMarkerOption } from './marker'

export interface ISDK {
//   Util: Util
  Map(opt: IMapOption): IMap
  Layer(opt: ILayerOption): ILayer
  Popup(opt: ILayerOption): ILayer
  Marker(opt?: IMarkerOption): IMarker
  //   Polyline(points: Array<LngLat>, opt?: PolylineOption): Polyline
  //   Icon(opt: IconOption): Icon
  load(url: string, href?: string): void
}
