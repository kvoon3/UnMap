import { nanoid } from 'nanoid'
import type { IMap, IPopup, IPopupOption } from '../../sdk'
import type { ILngLat } from '../../base'
import { handleContainer } from '../../utils'
import { WhichMap } from '..'

export class Popup implements IPopup {
  _id: string
  _original: mapboxgl.Popup
  _whichMap = WhichMap.AiMap
  _domContent: HTMLElement | undefined
  constructor(opt: IPopupOption) {
    this._id = nanoid()

    const defaultOpt: mapboxgl.PopupOptions = {
      closeOnClick: true,
      anchor: 'bottom',
      offset: undefined,
    }

    this._original = new aimap.Popup({
      ...defaultOpt,
      ...opt,
      offset: opt.offset
        ? Array.isArray(opt.offset)
          ? opt.offset
          : [opt.offset.x, opt.offset.y]
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

  setLngLat(lnglat: ILngLat) {
    this._original.setLngLat(lnglat)
    return this
  }

  getLngLat(): ILngLat {
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
