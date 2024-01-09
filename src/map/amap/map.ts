import { nanoid } from 'nanoid'
import type { ILngLat } from '../../base'
import type { IMap, IMapEventType, IMapOption } from '../../sdk'
import { IMapEvent2AMapEvent } from '../../utils'
import { WhichMap } from '..'

export class Map implements IMap {
  _whichMap = WhichMap.AMap
  _original: AMap.Map
  _id: string
  constructor(opt: IMapOption) {
    const zooms: [number, number] = [opt.minZoom || 2, opt.maxZoom || 30]

    this._id = nanoid()

    this._original = new AMap.Map(opt.container, {
      ...opt,
      zooms,
    })
  }

  remove(): void {
    this._original.destroy()
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
    this._original.setCenter(new AMap.LngLat(center[0], center[1]))
    return this
  }

  getCenter(): ILngLat {
    const { lng, lat } = this._original.getCenter()
    return [lng, lat]
  }

  panTo(lnglat: ILngLat) {
    this._original.panTo(lnglat)
    return this
  }

  flyTo(lnglat: ILngLat) {
    this.panTo(lnglat)
    return this
  }

  on<E extends keyof IMapEventType>(eventName: E, handler: (ev: IMapEventType[E]) => void) {
    this._original.on(IMapEvent2AMapEvent(eventName), handler)
    return this
  }

  off<E extends keyof IMapEventType>(eventName: E, handler: (ev: IMapEventType[E]) => void) {
    this._original.off(IMapEvent2AMapEvent(eventName), handler)
    return this
  }
}
