/// <reference path="../../types/amap.d.ts" />

import { nanoid } from 'nanoid'
import type { LngLat } from '../../base'
import type { ILayer, IMap, IMapOption } from '../../sdk'
import { WhichMap } from '../mapType'

export class Map implements IMap {
  _whichMap = WhichMap.AMap
  _original: AMap.Map
  _id: string = nanoid()
  constructor(opt: IMapOption) {
    this._original = new AMap.Map(opt.container, {
      zoom: opt.zoom,
      center: opt.center,
    })
  }

  addLayer(layer: ILayer | ILayer[]): void {
    throw new Error('Method not implemented.')
  }

  removeLayer(layer: ILayer | ILayer[]): void {
    throw new Error('Method not implemented.')
  }

  clearLayers(): void {
    throw new Error('Method not implemented.')
  }

  setZoom(zoom: number): void {
    throw new Error('Method not implemented.')
  }

  getZoom(): void {
    throw new Error('Method not implemented.')
  }

  zoomIn(): void {
    throw new Error('Method not implemented.')
  }

  zoomOut(): void {
    throw new Error('Method not implemented.')
  }

  setCenter(center: LngLat): void {
    this._original.setCenter(new AMap.LngLat(...center))
  }

  getCenter(): LngLat {
    const { lng, lat } = this._original.getCenter()
    return [lng, lat]
  }

  panTo(LngLat: LngLat): void {
    throw new Error('Method not implemented.')
  }

  search?(name: string, resolve: Function, reject?: Function | undefined): void {
    throw new Error('Method not implemented.')
  }

  on?(eventName: string, handler: Function): void {
    throw new Error('Method not implemented.')
  }

  off?(eventName: string, handler: Function): void {
    throw new Error('Method not implemented.')
  }
}
