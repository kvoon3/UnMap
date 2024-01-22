import { nanoid } from 'nanoid'
import type mapboxgl from 'mapbox-gl'
import type { IPointLike } from '../../sdk/point'
import type { IMap, IMapEventType, IMapOption } from '../../sdk'
import type { ILngLat } from '../../base'
import { WhichMap } from '../mapType'

export class Map implements IMap {
  _whichMap = WhichMap.AiMap
  _original: mapboxgl.Map
  _id: string
  constructor(opt: IMapOption) {
    this._id = nanoid()
    this._original = new aimap.Map(opt)
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

  on<E extends keyof IMapEventType>(eventName: E, handler: (ev: IMapEventType[E]) => void) {
    this._original.on(eventName, handler)
    return this
  }

  off<E extends keyof IMapEventType>(eventName: E, handler: (ev: IMapEventType[E]) => void) {
    this._original.off(eventName, handler)
    return this
  }
}
