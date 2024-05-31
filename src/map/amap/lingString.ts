import { nanoid } from 'nanoid'
import type mapboxgl from 'mapbox-gl'
import type { ILineString, ILineStringEventType, ILineStringOption, IMap } from '../../sdk'

import { WhichMap } from '..'
import { IMapEvent2AMapEvent, coordinateToAMapLngLat, omit } from '../../utils'

export class LineString implements ILineString<AMap.Polyline> {
  _id: string
  _original: AMap.Polyline
  _whichMap = WhichMap.AMap

  constructor(opt: ILineStringOption) {
    const path = opt.data.coordinates.map(coordinateToAMapLngLat)
    const borderWeight = opt.style['line-width']
    const strokeColor = opt.style['line-color']

    this._id = nanoid()

    this._original = new AMap.Polyline({
      ...omit(opt, 'data', 'style'),
      path,
      borderWeight,
      strokeColor,
    })
  }

  setData(data: ILineStringOption['data']) {
    const path = data.coordinates.map(coordinateToAMapLngLat)
    this._original.setPath(path)
    return this
  }

  remove(): void {
    this._original.remove()
  }

  addTo(map: IMap<AMap.Map>) {
    map._original.add(this._original)
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
    this._original.on(IMapEvent2AMapEvent(eventName), handler as mapboxgl.EventedListener)
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
