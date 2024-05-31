import { nanoid } from 'nanoid'
import type mapboxgl from 'mapbox-gl'
import type { IMap, IMarker, IMarkerEventType, IMarkerOption, IPopup } from '../../sdk'
import type { ILngLat } from '../../base'
import { WhichMap } from '..'
import { handleContainer, omit } from '../../utils'

export class Marker implements IMarker {
  _id: string
  _original: mapboxgl.Marker
  _whichMap = WhichMap.AiMap
  popup: IPopup | undefined
  constructor(opt: IMarkerOption = {}) {
    this._id = nanoid()

    const element = opt?.element === undefined
      ? opt.element
      : handleContainer(opt.element)

    this._original = new aimap.Marker({
      ...omit(opt, 'element'),
      element,
    })
  }

  getRotation(): number {
    return this._original.getRotation()
  }

  setRotation(rotate: number) {
    this._original.setRotation(rotate)
    return this
  }

  setLngLat(lnglat: ILngLat) {
    this._original.setLngLat(lnglat)
    return this
  }

  getLngLat(): ILngLat {
    const { lng, lat } = this._original.getLngLat()
    return [lng, lat]
  }

  addTo(map: IMap) {
    this._original.addTo(map._original as mapboxgl.Map)
    return this
  }

  remove() {
    this._original.remove()
    return this
  }

  setPopup(popup: IPopup<mapboxgl.Popup>) {
    this._original.setPopup(popup._original)
    this.popup = popup
    return this
  }

  getPopup(): IPopup | undefined {
    return this.popup
  }

  togglePopup() {
    this._original.togglePopup()
    return this
  }

  on<E extends keyof IMarkerEventType>(
    eventName: E,
    handler: (ev: IMarkerEventType[E]) => void,
  ) {
    this._original.on(eventName, handler as mapboxgl.EventedListener)
    return this
  }

  off<E extends keyof IMarkerEventType>(
    eventName: E,
    handler: (ev: IMarkerEventType[E]) => void,
  ) {
    this._original.on(eventName, handler as mapboxgl.EventedListener)
    return this
  }
}
