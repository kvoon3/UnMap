import type { ICircleStyle, IIconStyle, ILineStyle, ISymbolStyle, ITextStyle } from '../base'
import type { WhichMap } from '../map'
import type { IEvented } from './evented'
import type { IMap } from '.'

export interface ITrackLayerOption {
  images?: {
    id: string
    url: string
    type: 'png' | 'jpg' | 'jpeg'
  }[]
  layers: (
    ISubStartLayerOption
    | ISubEndLayerOption
    | ISubTrackLayerOption
    | ISubTrackPointLayerOption
  )[]
  animation?: {
    repeat: boolean
    duration: number
    autoplay: boolean
  }
}

export interface ISubTrackLayerOption {
  name: 'track'
  style: ILineStyle
  data?: {
    coordinates: [number, number][]
  }
}
export interface ISubStartLayerOption {
  name: 'start'
  style: ICircleStyle | ITextStyle | IIconStyle | ISymbolStyle
  data?: {
    name: string
  }
}
export interface ISubEndLayerOption {
  name: 'end'
  style: ICircleStyle | ITextStyle | IIconStyle | ISymbolStyle
  data?: {
    name: string
  }
}
export interface ISubTrackPointLayerOption {
  name: 'trackPoint'
  style: ICircleStyle
  data?: object
}

export interface ITrackLayer<o = object> extends IEvented<string> {
  _id: string
  _original: o
  _whichMap: WhichMap
  addTo: (map: IMap) => ITrackLayer
  remove: () => void
  play: () => ITrackLayer
  pause: () => ITrackLayer
}
