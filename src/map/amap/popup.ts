import { nanoid } from 'nanoid'
import type { ILngLat } from '../../base'
import type { IMap, IPopup, IPopupOption } from '../../sdk'
import { handleContainer, omit } from '../../utils'
import { WhichMap } from '..'

export class Popup implements IPopup {
  _id: string
  _original: AMap.InfoWindow
  _whichMap = WhichMap.AMap
  _domContent: HTMLElement | undefined
  className: string | undefined
  maxWidth: string | undefined
  constructor(opt: IPopupOption) {
    this._id = nanoid()
    const offset = opt.offset
      ? Array.isArray(opt.offset)
        ? new AMap.Pixel(...opt.offset)
        : new AMap.Pixel(opt.offset.x, opt.offset.y)
      : undefined
    this.className = opt.className
    this.maxWidth = opt.maxWidth

    this._original = new AMap.InfoWindow({
      ...omit(opt, 'offset'),
      offset,
    })
  }

  isOpen(): boolean {
    return this._original.getVisible()
  }

  setDOMContent(maybeHtmlNode: HTMLElement | string): IPopup {
    this._domContent = handleContainer(maybeHtmlNode)
    if (this.className)
      this._domContent.setAttribute('class', this.className)
    if (this.maxWidth)
      this._domContent.style.maxWidth = this.maxWidth
    this._original.setContent(this._domContent)
    return this
  }

  getElement() {
    return this._domContent
  }

  addTo(map: IMap<AMap.Map>): IPopup {
    this._original.addTo(map._original)
    return this
  }

  setLngLat(lnglat: ILngLat): IPopup {
    this._original.setPosition(lnglat)
    return this
  }

  getLngLat(): ILngLat {
    const lnglat = this._original.getPosition()
    if (!lnglat)
      throw new Error('cannot get popup position')

    const { lng, lat } = lnglat
    return [lng, lat]
  }

  remove(): void {
    this._original.remove()
  }

  on(eventName: string, handler: (ev: unknown) => void): this {
    // TODO: fix type error
    // @ts-expect-error type error
    this._original.on(eventName, handler)
    return this
  }

  off(eventName: string, handler: (ev: unknown) => void): this {
    // TODO: fix type error
    // @ts-expect-error type error
    this._original.on(eventName, handler)
    return this
  }
}
