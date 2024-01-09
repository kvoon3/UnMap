import type { ILineStyle, ILngLat } from '../base'
import type { IEvented, WhichMap } from '..'
import type { IMap } from './map'

export interface ILineStringOption {
  name: string
  data: {
    type: 'Point'
    coordinates: ILngLat[]
  }
  style: ILineStyle
}

export interface ILineString<o = object> extends IEvented {
  _id: string
  _original: o
  _whichMap: WhichMap
  setData(data: ILineStringOption['data']): ILineString
  remove(): void
  addTo(map: IMap): ILineString
  show(): ILineString
  hide(): ILineString
}
