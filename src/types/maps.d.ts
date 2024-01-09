import type mapboxgl from 'mapbox-gl'
import type { GeoJSON } from 'geojson'

interface LineStyle {
  'line-blur'?: number
  'line-cap'?: string
  'line-color'?: string
  'line-dasharray'?: number[]
  'line-gap-width'?: number
  'line-gradient'?: string
  'line-join'?: 'bevel' | 'round' | 'miter'
  'line-miter-limit'?: number
  'line-offset'?: number
  'line-opacity'?: number
  'line-patten'?: Image
  'line-round-limit'?: number
  'line-sort-key'?: number
  'line-translate'?: number[]
  'line-translate-anchor'?: 'map' | 'viewport'
  'line-width'?: number
  'visible'?: boolean
}

interface CircleStyle {
  'circle-blur': number
  'circle-color': string
  'circle-blend': 'normal' | 'light'
  'circle-opacity': number
  'circle-pitch-alignment': 'map' | 'viewport'
  'circle-pitch-scale': 'map' | 'viewport'
  'circle-radius': number
  'circle-sort-key': number
  'circle-stroke-color': string
  'circle-stroke-opacity': number
  'circle-stroke-width': number
  'circle-translate': [number, number]
  'circle-translate-anchor': 'map' | 'viewport'
  'visibility': 'visible' | 'none'
}

interface TextStyle {
  'text-allow-overlap': boolean
  'text-anchor': 'center' | 'left' | 'right' | 'top' | 'bottom' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  'text-color': 'string'
  'text-field': string
  'text-font': string[]
  'text-halo-blur': number
  'text-halo-color': string
  'text-halo-width': number
  'text-ignore-placement': boolean
  'text-justify': 'center' | 'left' | 'right'
  'text-keep-upright': boolean
  'text-letter-sacing': number
  'text-line-height': number
  'text-max-angle': number
  'text-max-width': number
  'text-offset': number[]
  'text-opacity': number
  'text-optional': number
  'text-padding': number
  'text-pitch-alignment': 'map' | 'viewport' | 'auto'
  'text-rotate': number
  'text-rotation-alignment': 'map' | 'viewport' | 'auto'
  'text-size': number
  'text-transform': 'none' | 'uppercase' | 'lowercase' | 'capitalize'
  'text-translate': number[]
  'text-translate-anchor': 'map' | 'viewport'
  'text-variable-anchor': 'center' | 'left' | 'right' | 'top' | 'bottom' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'[]
  'text-writing-mode': 'horizontal' | 'vertical'
  'visibility': 'visible' | 'none'
}

interface IconStyle {
  'icon-allow-overlap': boolean
  'icon-anchor': 'center' | 'left' | 'right' | 'top' | 'bottom' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  'icon-color': string
  'icon-halo-blur': number
  'icon-halo-color': string
  'icon-halo-width': number
  'icon-ignore-placement': boolean
  'icon-image': Image
  'icon-keep-upright': boolean
  'icon-offset': number[]
  'icon-opacity': number
  'icon-optional': boolean
  'icon-padding': number
  'icon-pitch-alignment': 'map' | 'viewport' | 'auto'
  'icon-rotate': number
  'icon-rotation-alignment': 'map' | 'viewport' | 'auto'
  'icon-size': number
  'icon-text-fit': 'none' | 'width' | 'height' | 'both'
  'icon-text-fit-padding': [number, number, number, number]
  'icon-translate': [number, number]
  'icon-translate-anchor': 'map' | 'viewport'
  'visibility': 'visible' | 'none'
}

interface SymbolStyle {
  'symbol-avoid-edges': boolean
  'symbol-placement': 'point' | 'line' | 'line-center'
  'symbol-sort-key': number
  'symbol-spacing': number
}

interface HeatmapStyle {
  'heatmap-color': string
  'heatmap-intensity': number
  'heatmap-opacity': number
  'heatmap-radius': number
  'heatmap-weight': number
  'visibility': 'visible' | 'none'
}

interface ExtrusionStyle {
  'extrusion-base': number
  'extrusion-color': string
  'extrusion-height': number
  'extrusion-opacity': number
  'extrusion-pattern': Image
  'extrusion-translate': [number, number]
  'extrusion-translate-anchor': 'map' | 'viewport'
  'extrusion-vertical-gradient': boolean

}

interface RasterStyle {
  'raster-brightness-max': number
  'raster-brightness-min': number
  'raster-contrast': number
  'raster-fade-duration': number
  'raster-hue-rotate': number
  'raster-opacity': number
  'raster-resampling': 'nearest' | 'linear'
  'raster-saturation': number
  'visibility': 'visible' | 'none'
}

interface FillStyle {
  'fill-antialias': boolean
  'fill-color': string
  'fill-opacity': number
  'fill-pattern': Image
  'fill-sort-key': number
  'fill-translate': [number, number]
  'fill-translate-anchor': 'map' | 'viewport'
  'visibility': 'visible' | 'none'
}

class LineString implements mapboxgl.Evented {
  constructor(opt: LineStringOption)
  addTo(map): LineString
  remove(): LineString
  show(): LineString
  hide(): LineString
  setzIndex(zIndex, options?): LineString
  flyTo(options?): LineString
  fitView(options?): LineString
  setStyle(style, options?): LineString
  setData(data, options?): LineString
  setJoinData(data, options?): LineString
  updateJoinData(data, options?): LineString
  setFilter(filter, options?): LineString
  setPopup(popup, options): LineString
  getPopup(): mapboxgl.Popup
  togglePopup(): LineString
  highlight(options?): LineString
  clearHighlight(options?): LineString
  on(type, listener): LineString
  once(type, listener): LineString
  off(type, listener): LineString
}

interface LineStringOption {
  id?: string
  map?: Map
  zIndex?: number
  minZoom?: number
  maxZoom?: number
  interactive?: boolean
  spatialReference?: string
  images?: Array<Image>
  data: GeoJSON.Point
  dataId?: string
  dataOptions?: DataOption
  joinData?: object
  joinOptions?: JoinOption
  style?: LineStyle
  filterFilter?: Filter
  focus?: Focus
  highlight?: HighlightOption
}

export class LingStringMouseEvent {
  type:
    | 'mousedown'
    | 'mouseup'
    | 'click'
    | 'dblclick'
    | 'mousemove'
    | 'mouseenter'
    | 'mouseleave'

  point: Point
  lngLat: LngLat

  preventDefault(): void
  defaultPrevented: boolean
}

interface LineStringEventType {
  mouseup: LingStringMouseEvent
  mousedown: LingStringMouseEvent
  click: LingStringMouseEvent
  dblclick: LingStringMouseEvent
  mousemove: LingStringMouseEvent
  mouseenter: LingStringMouseEvent
  mouseleave: LingStringMouseEvent
}

class TrackLayer implements mapboxgl.Evented {
  constructor(opt: TrackLayerOption)
  addTo(map: mapboxgl.Map): TrackLayer
  remove(): void
  show(): TrackLayer
  play(): TrackLayer
  hide(): TrackLayer
  pause(): TrackLayer
  setzIndex(idx: number | string, opt?: object): TrackLayer
  flyTo(opt?: object): TrackLayer
  fitView(opt?: object): TrackLayer
  setStyle(style: object, opt?: object): TrackLayer
  setPopup(popup: mapboxgl.Popup | string, opt?: object): TrackLayer
  getPopup(): mapboxgl.Popup
  togglePopup(): TrackLayer
  hightlight(opt?: object): TrackLayer
  clearHightlight(opt?: object): TrackLayer
  blink(opt?: object): TrackLayer
  clearBlink(opt?: object): TrackLayer
  on(eventName: string, handler: Function): TrackLayer
  off(eventName: string, handler: Function): TrackLayer
}

interface TrackLayerOption {
  id?: string
  map?: mapboxgl.Map
  zIndex?: number | string
  minZoom?: number
  maxZoom?: number
  spatialReference?: string
  images?: Image[]
  layers: (
    SubTrackLayerOption
    | SubStartLayerOption
    | SubEndLayerOption
    | SubTrackPointLayerOption
  )[]
  animation?: mapboxgl.AnimationOptions
}

interface subTrackLayerOption {
  name: 'track'
  style: LineStyle
  data: GeoJSON.Point
}

interface SubStartLayerOption {
  name: 'start'
  style: CircleStyle | TextStyle | IconStyle | SymbolStyle
  data: object
}

interface SubEndLayerOption {
  name: 'end'
  style: CircleStyle | TextStyle | IconStyle | SymbolStyle
  data: object
}

interface SubTrackPointLayerOption {
  name: 'trackPoint'
  style: CircleStyle
}

export declare global {
  export const aimap: typeof mapboxgl & {
    LineString: typeof LineString
    TrackLayer: typeof TrackLayer
  }
}

export namespace aimap {
  export type LineString = LineString
  export type TrackLayer = TrackLayer
}
