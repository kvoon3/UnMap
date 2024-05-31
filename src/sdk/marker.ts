import type { ILngLat } from '../base'
import type { IAnchor } from '../base/anchor'
import type { WhichMap } from '../map'
import type { IEvented, IMarkerEventType } from './evented'
import type { IMap } from './map'
import type { IPopup } from './popup'

export interface IMarkerOption {
  element?: HTMLElement | string
  anchor?: IAnchor
  angle?: number

  // TODO: icon and size
  //   icon?: Icon
  //   offset?: Size
  draggable?: boolean
  crossOnDrag?: boolean
  raiseOnDrag?: boolean
}

export interface IMarker<o = any> extends IEvented<keyof IMarkerEventType> {
  _id: string
  _original: o
  _whichMap: WhichMap
  popup: IPopup | undefined
  setLngLat: (lnglat: ILngLat) => this
  getLngLat: () => ILngLat
  addTo: (map: IMap<any>) => this
  remove: () => this
  setRotation: (rotate: number) => this
  getRotation: () => number
  setPopup: (popup: IPopup<any>) => this
  getPopup: () => IPopup | undefined
  togglePopup: () => this
}
