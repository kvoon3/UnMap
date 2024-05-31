import type { ILineStyle, ILngLat } from '../base'
import type { IEvented, ILineStringEventType, WhichMap } from '..'
import type { IMap } from './map'

export interface ILineStringOption {
  name: string
  data: {
    type: 'Point'
    coordinates: ILngLat[]
  }
  style: ILineStyle
}

export interface ILineString<o = object> extends IEvented<keyof ILineStringEventType> {
  _id: string
  _original: o
  _whichMap: WhichMap
  setData: (data: ILineStringOption['data']) => this
  remove: () => void
  addTo: (map: IMap) => this
  show: () => this
  hide: () => this
}
