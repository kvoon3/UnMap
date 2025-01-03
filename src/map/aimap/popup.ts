import { nanoid } from 'nanoid'
import type { IMap, IPopup, IPopupOption } from '../../sdk'
import type { ILnglatLike } from '../../base'
import { handleContainer } from '../../utils'
import { WhichMap } from '..'

export class Popup implements IPopup {
  _id: string
  _original: mapboxgl.Popup
  _whichMap = WhichMap.AiMap
  _domContent: HTMLElement | undefined
  constructor(opt?: IPopupOption) {
    this._id = nanoid()

    const {
      anchor = 'bottom',
      offset = undefined,
      className = '',
      maxWidth = '',
    } = opt || {}

    this._original = new aimap.Popup({
      closeButton: true,
      anchor,
      className,
      maxWidth,
      offset: offset
        ? Array.isArray(offset)
          ? offset
          : [offset.x, offset.y]
        : undefined,
    })
  }

  isOpen(): boolean {
    return this._original.isOpen()
  }

  setDOMContent(maybeHtmlNode: HTMLElement | string): IPopup {
    this._domContent = handleContainer(maybeHtmlNode)
    this._original.setDOMContent(handleContainer(maybeHtmlNode))
    return this
  }

  getElement() {
    return this._domContent
  }

  addTo(map: IMap<mapboxgl.Map>): IPopup {
    this._original.addTo(map._original)
    return this
  }

  setLngLat(lnglat: ILnglatLike) {
    this._original.setLngLat(lnglat)
    return this
  }

  getLngLat(): ILnglatLike {
    const { lng, lat } = this._original.getLngLat()
    return [lng, lat]
  }

  remove(): void {
    this._original.remove()
  }

  on(eventName: string, handler: (ev: unknown) => void): this {
    this._original.on(eventName, handler)
    return this
  }

  off(eventName: string, handler: (ev: unknown) => void): this {
    this._original.on(eventName, handler)
    return this
  }
}
