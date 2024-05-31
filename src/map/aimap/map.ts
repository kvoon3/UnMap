import { nanoid } from 'nanoid'
import type mapboxgl from 'mapbox-gl'
import type { IPointLike } from '../../sdk/point'
import type { IFitBoundsOptions, IMap, IMapEventType, IMapOption } from '../../sdk'
import type { ILngLat } from '../../base'
import { WhichMap } from '../mapType'
import { Point } from './point'

export class Map implements IMap<mapboxgl.Map> {
  _whichMap = WhichMap.AiMap
  _original: mapboxgl.Map
  _id: string
  _loaded: boolean = false
  get loaded() {
    return this._loaded
  }

  constructor(opt: IMapOption) {
    this._id = nanoid()
    this._original = new aimap.Map(opt)

    this.on('load', () => this._loaded = true)
  }

  remove(): void {
    this._original.remove()
  }

  setZoom(zoom: number) {
    this._original.setZoom(zoom)
    return this
  }

  getZoom() {
    return this._original.getZoom()
  }

  zoomIn() {
    this._original.zoomIn()
    return this
  }

  zoomOut() {
    this._original.zoomOut()
    return this
  }

  setCenter(center: ILngLat) {
    this._original.setCenter(new aimap.LngLat(center[0], center[1]))
    return this
  }

  getCenter(): ILngLat {
    return this._original.getCenter().toArray() as [number, number]
  }

  panTo(lnglat: ILngLat) {
    this._original.panTo(lnglat)
    return this
  }

  flyTo(lnglat: ILngLat) {
    this._original.flyTo({
      center: lnglat,
    })
    return this
  }

  unproject(point: IPointLike): ILngLat {
    const { lng, lat } = this._original.unproject(
      Array.isArray(point)
        ? point
        : [point.x, point.y],
    )

    return [lng, lat]
  }

  project(lnglat: ILngLat) {
    const { x, y } = this._original.project(lnglat)
    return new Point(x, y)
  }

  getCanvas(): HTMLCanvasElement {
    return this._original.getCanvas()
  }

  getCanvasContainer(): HTMLElement {
    return this._original.getContainer()
  }

  getContainer(): HTMLElement {
    return this._original.getContainer()
  }

  fitBounds(bounds: [ILngLat, ILngLat], options?: IFitBoundsOptions) {
    this._original.fitBounds(bounds, options)
    return this
  }

  on<E extends keyof IMapEventType>(eventName: E, handler: (ev: IMapEventType[E]) => void) {
    const fixMapEvent = (e: any) => {
      e.target = this
      return e
    }

    this._original.on(eventName, e => handler(fixMapEvent(e)))
    return this
  }

  off<E extends keyof IMapEventType>(eventName: E, handler: (ev: IMapEventType[E]) => void) {
    this._original.off(eventName, handler)
    return this
  }
}
