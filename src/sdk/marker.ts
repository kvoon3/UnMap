import type { LngLat } from '../base'
import type { WhichMap } from '../map'
import type { ILayer } from './layer'
import type { IMap } from './map'

export interface IMarkerOption {
  content?: HTMLElement | string
  anchor?: string
  angle?: number

  // TODO: icon and size
  //   icon?: Icon
  //   offset?: Size
  draggable?: boolean
  crossOnDrag?: boolean
  raiseOnDrag?: boolean
}

export interface IMarker extends ILayer {
  _id: string
  _original: object
  _whichMap: WhichMap
  setLngLat(LngLat: LngLat): IMarker
  getLngLat(): LngLat
  addTo(map: IMap): IMarker
}
