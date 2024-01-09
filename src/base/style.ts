// TODO: complete Image type
type Image = any

export interface ILineStyle {
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

export interface ICircleStyle {
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

export interface ITextStyle {
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

export interface IIconStyle {
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

export interface ISymbolStyle {
  'symbol-avoid-edges': boolean
  'symbol-placement': 'point' | 'line' | 'line-center'
  'symbol-sort-key': number
  'symbol-spacing': number
}

export interface IHeatmapStyle {
  'heatmap-color': string
  'heatmap-intensity': number
  'heatmap-opacity': number
  'heatmap-radius': number
  'heatmap-weight': number
  'visibility': 'visible' | 'none'
}

export interface IExtrusionStyle {
  'extrusion-base': number
  'extrusion-color': string
  'extrusion-height': number
  'extrusion-opacity': number
  'extrusion-pattern': Image
  'extrusion-translate': [number, number]
  'extrusion-translate-anchor': 'map' | 'viewport'
  'extrusion-vertical-gradient': boolean

}

export interface IRasterStyle {
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

export interface IFillStyle {
  'fill-antialias': boolean
  'fill-color': string
  'fill-opacity': number
  'fill-pattern': Image
  'fill-sort-key': number
  'fill-translate': [number, number]
  'fill-translate-anchor': 'map' | 'viewport'
  'visibility': 'visible' | 'none'
}
