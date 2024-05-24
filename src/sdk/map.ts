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

export interface IMap<o = object> extends IEvented<keyof IMapEventType> {
  _whichMap: WhichMap
  _original: o
  _id: string
  get loaded(): boolean
  setZoom(zoom: number): IMap
  getZoom(): number
  zoomIn(): IMap
  zoomOut(): IMap
  setCenter(center: ILngLat): IMap
  getCenter(): ILngLat
  panTo(lnglat: ILngLat): IMap
  flyTo(lnglat: ILngLat): IMap
  remove(): void
  unproject(point: IPointLike): ILngLat
  project(lnglat: ILngLat): IPointLike
  getCanvas(): HTMLCanvasElement
  getCanvasContainer(): HTMLElement
  getContainer(): HTMLElement
  fitBounds(bound: [ILngLat, ILngLat], options?: IFitBoundsOptions): IMap
}
