import type { IEvented } from './sdk'

// TODO: move these interface into sdk folder

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
  host: IEvented
  handler?: Function // one of them must be set (handler | listener)
  listener?: any
}

export interface ILabelOption {
  color?: string
  fontFamily?: string
  fontSize?: string
  fontWeight?: string
}
