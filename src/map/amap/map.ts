import { nanoid } from 'nanoid'
import type { ILngLat } from '../../base'
import type { IMap, IMapEventType, IMapOption } from '../../sdk'
import { IMapEvent2AMapEvent } from '../../utils'
import { WhichMap } from '..'
import type { IPointLike } from '../../sdk/point'
import { Point } from './point'

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
    this._original.setCenter(new AMap.LngLat(center[0], center[1]), true, 0)
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

  unproject(point: IPointLike): ILngLat {
    const [x, y] = Array.isArray(point) ? point : [point.x, point.y]
    const { lng, lat } = this._original.containerToLngLat(new AMap.Pixel(x, y))
    return [lng, lat]
  }

  project(lnglat: ILngLat): IPointLike {
    const { x, y } = this._original.lngLatToContainer(
      new AMap.LngLat(lnglat[0], lnglat[1]),
    )

    return new Point(x, y)
  }

  getCanvas(): HTMLCanvasElement {
    const canvasContainer = this.getCanvasContainer()
    const dom = canvasContainer.querySelector('canvas') as HTMLCanvasElement

    if (!dom)
      throw new Error('cannot find canvas')

    return dom
  }

  getCanvasContainer(): HTMLElement {
    const container = this._original.getContainer()
    const dom = container.querySelector('.amap-layers') as HTMLElement

    if (!dom)
      throw new Error('cannot find canvas container')

    return dom
  }

  getContainer(): HTMLElement {
    return this._original.getContainer()
  }

  fitBounds(bounds: [ILngLat, ILngLat]) {
    const [southWest, northEast] = bounds
    this._original.setBounds(
      new AMap.Bounds(
        new AMap.LngLat(...southWest),
        new AMap.LngLat(...northEast),
      ),
      true,
    )
    return this
  }

  on<E extends keyof IMapEventType>(eventName: E, handler: (ev: IMapEventType[E]) => void) {
    interface AMapMapEvent {
      target: AMap.Map
      type: E
      originEvent: unknown
      lnglat?: AMap.LngLat
      pixel?: AMap.Pixel
    }

    const fixMapEvent = (e: AMapMapEvent) => {
      const event = {
        originalEvent: e.originEvent,
        target: this,
        type: eventName,
      } as any

      event.lngLat = e.lnglat ? { lng: e.lnglat.getLng(), lat: e.lnglat.getLat() } : undefined
      event.point = e.pixel ? e.pixel : undefined
      return event
    }

    this._original.on(IMapEvent2AMapEvent(eventName), (e: AMapMapEvent) => handler(fixMapEvent(e)))
    return this
  }

  off<E extends keyof IMapEventType>(eventName: E, handler: (ev: IMapEventType[E]) => void) {
    this._original.off(IMapEvent2AMapEvent(eventName), handler)
    return this
  }
}
