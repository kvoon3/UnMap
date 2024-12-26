import { nanoid } from 'nanoid'
import { type ILnglatLike, toLnglat } from '../../base'
import type { IFitBoundsOptions, IMap, IMapEventType, IMapOption } from '../../sdk'
import { IMapEvent2AMapEvent } from '../../utils'
import { WhichMap } from '..'
import type { IPointLike } from '../../sdk/point'
import { Point } from './point'

export class Map implements IMap {
  _whichMap = WhichMap.AMap
  _original: AMap.Map
  _id: string
  _loaded: boolean = false

  get loaded() {
    return this._loaded
  }

  constructor(opt: IMapOption) {
    const zooms: [number, number] = [opt.minZoom || 2, opt.maxZoom || 30]
    const center = opt.center ? toLnglat(opt.center) : opt.center

    this._id = nanoid()

    this._original = new AMap.Map(opt.container, {
      ...opt,
      center,
      zooms,
    })

    this.on('load', () => this._loaded = true)
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

  setCenter(center: ILnglatLike) {
    const [lng, lat] = Array.isArray(center) ? center : [center.lng, center.lat]

    this._original.setCenter(new AMap.LngLat(lng, lat), true, 0)
    return this
  }

  getCenter(): ILnglatLike {
    const { lng, lat } = this._original.getCenter()
    return [lng, lat]
  }

  panTo(lnglat: ILnglatLike) {
    this._original.panTo(Array.isArray(lnglat) ? lnglat : [lnglat.lng, lnglat.lat])
    return this
  }

  flyTo(lnglat: ILnglatLike) {
    this.panTo(lnglat)
    return this
  }

  unproject(point: IPointLike): ILnglatLike {
    const [x, y] = Array.isArray(point) ? point : [point.x, point.y]
    const { lng, lat } = this._original.containerToLngLat(new AMap.Pixel(x, y))
    return [lng, lat]
  }

  project(lnglat: ILnglatLike): IPointLike {
    const [lng, lat] = Array.isArray(lnglat) ? lnglat : [lnglat.lng, lnglat.lat]
    const { x, y } = this._original.lngLatToContainer(
      new AMap.LngLat(lng, lat),
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

  fitBounds(bounds: [ILnglatLike, ILnglatLike], options?: IFitBoundsOptions) {
    const [southWest, northEast] = bounds
    this._original.setBounds(
      new AMap.Bounds(
        new AMap.LngLat(...(
          toLnglat(southWest)
        )),
        new AMap.LngLat(...(
          toLnglat(northEast)
        )),
      ),
      true,
      Array.from({ length: 4 }).map(() => options?.padding ? options.padding : 0),
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
