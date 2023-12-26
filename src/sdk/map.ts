import type { LngLat } from '../base'
import type { WhichMap } from '../map'
import type { ILayer } from './layer'

export interface IMapOption {
  container: string | HTMLDivElement
  zoom?: number
  center?: LngLat
  style?: string
}

export interface IMap extends ILayer {
  _whichMap: WhichMap
  _original: object
  _id: string
  // TODO: use MapType
  // MAP_TYPE: MapType
  addLayer(layer: ILayer | Array<ILayer>): void
  removeLayer(layer: ILayer | Array<ILayer>): void
  clearLayers(): void
  setZoom(zoom: number): void
  getZoom(): void
  zoomIn(): void
  zoomOut(): void
  // TODO: O.ViewportOption
  //   fitView(points: LngLat[], opt: O.ViewportOption): void
  setCenter(center: LngLat): void
  getCenter(): LngLat
  panTo(LngLat: LngLat): void
  // setMapType(type: string): IMap
  // getMapType?(): string
  search?(name: string, resolve: Function, reject?: Function): void
}
