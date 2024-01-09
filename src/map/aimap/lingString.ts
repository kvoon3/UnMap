import { nanoid } from 'nanoid'
import type mapboxgl from 'mapbox-gl'
import type { LineString as AiMapLineString } from '../../types/maps'
import type { ILineString, ILineStringOption, IMap, IMarkerEventType } from '../../sdk'
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

  setData(data: ILineStringOption['data']): ILineString {
    this._original.setData(data)
    return this
  }

  remove(): void {
    this._original.remove()
  }

  addTo(map: IMap): ILineString {
    this._original.addTo(map._original)
    return this
  }

  show(): ILineString {
    this._original.show()
    return this
  }

  hide(): ILineString {
    this._original.hide()
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
