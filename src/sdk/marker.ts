import type { ILngLat } from '../base'
import type { IAnchor } from '../base/anchor'
import type { WhichMap } from '../map'
import type { IEvented } from './evented'
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

export interface IMarker<o = object> extends IEvented {
  _id: string
  _original: o
  _whichMap: WhichMap
  popup: IPopup | undefined
  setLngLat(lnglat: ILngLat): IMarker
  getLngLat(): ILngLat
  addTo(map: IMap): IMarker
  remove(): IMarker
  setRotation(rotate: number): IMarker
  getRotation(): number
  setPopup(popup: IPopup): IMarker
  getPopup(): IPopup | undefined
  togglePopup(): IMarker
}
