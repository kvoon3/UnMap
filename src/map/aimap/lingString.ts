import { nanoid } from 'nanoid'
import type mapboxgl from 'mapbox-gl'
import type { MultiPoint } from 'geojson'
import type { LineString as AiMapLineString } from '../../types/maps'
import type { ILineString, ILineStringEventType, ILineStringOption, IMap } from '../../sdk'
import { WhichMap } from '..'

export class LineString implements ILineString {
  _id: string
  _original: AiMapLineString
  _whichMap = WhichMap.AiMap

  constructor(opt: ILineStringOption) {
    this._id = nanoid()
    // @ts-expect-error type error
    this._original = new aimap.LineString(opt)
  }

  setData(data: MultiPoint) {
    this._original.setData(data)
    return this
  }

  remove(): void {
    this._original.remove()
  }

  addTo(map: IMap) {
    this._original.addTo(map._original)
    return this
  }

  show() {
    this._original.show()
    return this
  }

  hide() {
    this._original.hide()
    return this
  }

  on<E extends keyof ILineStringEventType>(
    eventName: E,
    handler: (ev: ILineStringEventType[E]) => void,
  ) {
    this._original.on(eventName, handler as mapboxgl.EventedListener)
    return this
  }

  off<E extends keyof ILineStringEventType>(
    eventName: E,
    handler: (ev: ILineStringEventType[E]) => void,
  ) {
    this._original.on(eventName, handler as mapboxgl.EventedListener)
    return this
  }
}
