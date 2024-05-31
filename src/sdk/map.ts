import type { ILngLat } from '../base'
import type { WhichMap } from '../map'
import type { IPointLike } from './point'
import type { IEvented, IMapEventType } from './evented'

export interface IMapOption {
  container: string | HTMLDivElement
  zoom?: number
  center?: ILngLat
  maxZoom?: number
  minZoom?: number
}

export interface IFitBoundsOptions {
  padding: number
}

export interface IMap<o = any> extends IEvented<keyof IMapEventType> {
  _whichMap: WhichMap
  _original: o
  _id: string
  get loaded(): boolean
  setZoom: (zoom: number) => this
  getZoom: () => number
  zoomIn: () => this
  zoomOut: () => this
  setCenter: (center: ILngLat) => this
  getCenter: () => ILngLat
  panTo: (lnglat: ILngLat) => this
  flyTo: (lnglat: ILngLat) => this
  remove: () => void
  unproject: (point: IPointLike) => ILngLat
  project: (lnglat: ILngLat) => IPointLike
  getCanvas: () => HTMLCanvasElement
  getCanvasContainer: () => HTMLElement
  getContainer: () => HTMLElement
  fitBounds: (bound: [ILngLat, ILngLat], options?: IFitBoundsOptions) => this
}
