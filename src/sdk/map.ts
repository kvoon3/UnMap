import type { ILnglatLike } from '../base'
import type { WhichMap } from '../map'
import type { IPointLike } from './point'
import type { IEvented, IMapEventType } from './evented'

export interface IMapOption {
  container: string | HTMLDivElement
  zoom?: number
  center?: ILnglatLike
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
  setCenter: (center: ILnglatLike) => this
  getCenter: () => ILnglatLike
  panTo: (lnglat: ILnglatLike) => this
  flyTo: (lnglat: ILnglatLike) => this
  remove: () => void
  unproject: (point: IPointLike) => ILnglatLike
  project: (lnglat: ILnglatLike) => IPointLike
  getCanvas: () => HTMLCanvasElement
  getCanvasContainer: () => HTMLElement
  getContainer: () => HTMLElement
  fitBounds: (bound: [ILnglatLike, ILnglatLike], options?: IFitBoundsOptions) => this
}
