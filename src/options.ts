import type { ILayer } from './sdk'

// TODO: move these interface into sdk folder

export interface IPopupOption {
  LngLat?: Array<number>
  content?: string | Element
  class?: string
  closeBtn?: boolean
  offset?: Array<number>
  zIndex?: number
}

export interface IPolylineOption {
  color?: string
  weight?: number
  opacity?: number
}

export interface IIconOption {
  url?: string
  size?: Array<number>
  anchor?: Array<number>
  labelOrigin?: Array<number>
}

export interface IViewportOption {
  margins: number[]
}

export interface IEventListenerOptions {
  eventName: string
  host: ILayer
  handler?: Function // one of them must be set (handler | listener)
  listener?: any
}

export interface ILabelOption {
  color?: string
  fontFamily?: string
  fontSize?: string
  fontWeight?: string
}
