import { nanoid } from 'nanoid'
import type { IEventHandler, IMap, IMarker, IMarkerEventType, IMarkerOption, IPopup } from '../../sdk'
import type { ILngLat } from '../../base'
import { IMapEvent2AMapEvent, handleContainer, omit } from '../../utils'
import { WhichMap } from '..'

interface InitState {
  domContainer: HTMLElement | undefined
  anchor: IMarkerOption['anchor']
}

const IAnchor2AMapAnchor = {
  'center': 'center',
  'bottom': 'bottom-center',
  'top': 'top-center',
  'left': 'middle-left',
  'right': 'middle-right',
  'top-left': 'top-left',
  'top-right': 'top-right',
  'bottom-left': 'bottom-left',
  'bottom-right': 'bottom-right',
}

export class Marker implements IMarker {
  _whichMap = WhichMap.AMap
  _original: AMap.Marker
  _id: string
  domContainer: HTMLElement | undefined
  private _initState: InitState
  popup: IPopup | undefined
  isPopupOpen: boolean = false
  constructor(opt: IMarkerOption = {}) {
    this._id = nanoid()

    const anchor = IAnchor2AMapAnchor[opt.anchor || 'center']

    const content = opt.element === undefined
      ? opt.element
      : handleContainer(opt.element)

    this.domContainer = content

    this._initState = {
      anchor: opt.anchor,
      domContainer: content,
      // TODO: use cloneNode
      // domContainer: content?.cloneNode(true) as HTMLElement | undefined,
    }

    this._original = new AMap.Marker({
      ...omit(opt, 'element'),
      anchor,
      content,
    })
  }

  getInitState() {
    return this._initState
  }

  setLngLat(lnglat: ILngLat) {
    this._original.setPosition(lnglat)
    return this
  }

  getLngLat(): ILngLat {
    const position = this._original.getPosition()
    if (!position)
      throw new Error('cannot get lnglat')

    const { lng, lat } = position

    return [lng, lat]
  }

  addTo(map: IMap<AMap.Map>) {
    map._original.add(this._original)
    return this
  }

  remove() {
    this._original.remove()
    return this
  }

  setRotation(rotate: number) {
    this._original.setAngle(rotate)
    return this
  }

  getRotation(): number {
    return this._original.getAngle()
  }

  setPopup(popup: IPopup<AMap.InfoWindow>) {
    const DOMContent = popup.getElement()

    if (!DOMContent)
      throw new Error('not find popup dom content')

    this.popup = popup
    return this
  }

  getPopup(): IPopup | undefined {
    return this.popup
  }

  togglePopup() {
    if (!this.popup)
      throw new Error('not set popup')

    if (!this.isPopupOpen) {
      // open
      this.isPopupOpen = true

      const wrapper = document.createElement('div')
      wrapper.style.position = 'relative'

      const popupContent = this.popup.getElement()
      const domContainer = this.domContainer

      if (popupContent) {
        wrapper.appendChild(popupContent)
        popupContent.style.position = 'absolute'
        popupContent.style.left = '0'
        popupContent.style.transform = 'translateY(-110%)'
      }
      if (domContainer)
        wrapper.appendChild(domContainer)

      // this._original.setAnchor('bottom-center')

      this._original.setContent(
        wrapper,
      )
    }
    else {
      // close
      this.isPopupOpen = false

      this._original.setContent(
        this.getInitState().domContainer,
      )
    }
    return this
  }

  on<E extends keyof IMarkerEventType>(
    eventName: E,
    handler: IEventHandler<IMarkerEventType[E]>,
  ) {
    this._original.on(IMapEvent2AMapEvent(eventName), handler)
    return this
  }

  off<E extends keyof IMarkerEventType>(
    eventName: E,
    handler: IEventHandler<IMarkerEventType[E]>,
  ) {
    this._original.off(IMapEvent2AMapEvent(eventName), handler)
    return this
  }
}
