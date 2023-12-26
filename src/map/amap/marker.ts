/// <reference path="../../types/amap.d.ts" />

import { nanoid } from 'nanoid'
import type { LngLat } from '../../base'
import type { IMarker, IMarkerOption } from '../../sdk'
import { WhichMap } from '../mapType'
import type { Map } from './map'

export class Marker implements IMarker {
  _whichMap = WhichMap.AMap
  _original: AMap.Marker
  _id: string = nanoid()
  constructor(opt: IMarkerOption) {
    this._original = new AMap.Marker(opt)
  }

  setLngLat(LngLat: LngLat) {
    this._original.setPosition(LngLat)
    return this
  }

  getLngLat(): LngLat {
    const { lng, lat } = this._original.getPosition()
    return [lng, lat]
  }

  on?(eventName: string, handler: Function): void {
    throw new Error('Method not implemented.')
  }

  off?(eventName: string, handler: Function): void {
    throw new Error('Method not implemented.')
  }

  addTo(map: Map) {
    this._original.addTo(map._original)
    return this
  }
}
