import type { IEvented } from '../sdk/evented'
import type { ILngLat } from '../base'
import type { WhichMap } from '../map'
import type { IAnchor } from '../base/anchor'
import type { IMap } from './map'
import type { IPointLike } from './point'

export interface IPopupOption {
  // TODO: handler anchor
  anchor?: IAnchor
  offset?: IPointLike
  className?: string
  maxWidth?: string
}

export interface IPopup<o = object> extends IEvented {
  _id: string
  _original: o
  _whichMap: WhichMap
  _domContent: HTMLElement | undefined
  isOpen(): boolean
  setDOMContent(maybeHtmlNode: HTMLElement | string): IPopup
  getElement(): HTMLElement | undefined
  addTo(map: IMap): IPopup
  remove(): void
  setLngLat(lnglat: ILngLat): IPopup
  getLngLat(): ILngLat
}
