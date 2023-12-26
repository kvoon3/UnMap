/// <reference path="../../types/aimap.d.ts" />

import { nanoid } from 'nanoid'
import type { LngLat } from '../../base'
import type { ILayer, IMap } from '../../sdk'
import { WhichMap } from '../mapType'

export class Map implements IMap {
  _whichMap = WhichMap.AiMap
  _original: object
  _id: string = nanoid()
  constructor(opt: any) {

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
    throw new Error('Method not implemented.')
  }

  getCenter(): LngLat {
    throw new Error('Method not implemented.')
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
