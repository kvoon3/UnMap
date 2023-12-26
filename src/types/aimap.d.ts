declare namespace AiMap {
  /** base Overlayer */
  export class Overlayer {
    hide(): void
    show(): void
    setMap(map: Map): void
    getMap(): Map
    toString(): string
    on(eventName: string, handler: Function, context: object): EventListener
    off(eventName: string, handler: Function, context: object): void
    setExtData(ext: any): void
    getExtData(): any
  }

  /** Pixel */
  export class Pixel {
    constructor(x: number, y: number)
    getX(): number
    getY(): number
    equals(point: Pixel): boolean
    toString(): string
  }

  /** Size */
  export class Size {
    constructor(width: number, height: number)
    getWidth(): number
    getHeight(): number
    toString(): string
  }

  /** LngLat */
  export type LngLat = [ number, number ]
  export type LngLatLike = [ number, number ]

  // TODO: finish it
  export type LngLatBoundsLike = object

  /** Bounds */
  export class Bounds {
    constructor(southWest: LngLat, northEast: LngLat)
    contains(point: LngLat): boolean
    getCenter(): LngLat
    getSouthWest(): LngLat
    getNorthEast(): LngLat
    toString(): string
  }

  // TODO: point
  export class Point {}

  // TODO: finish it
  export type PointLike = [number, number]

  /** Map */
  export class Map {
    constructor(container: string | Element, opts: MapOptions)
    addImage(id: string, image: HTMLImageElement | ImageData | URL | Base64, options: {
      type: string
      frameWidth: number
      pixelRatio: number // default 1
      sdf: boolean // default false
      content: [number, number, number ]
      stretchX: [number, number][]
      stretchY: [number, number][]
    }): this
    updateImageOption(id: string, options: { speed: number /* default 1 */ }): this
    hasImage(id: string): boolean
    removeImage(id: string): void
    getCenter(): LngLat
    setCenter(center: LngLat, eventData?: object): this
    panBy(offset: PointLike, options: PointLike, eventData: object): this
    panTo(lnglat: LngLatLike, options: AnimationOptions, eventData: object): this
    getZoom(): number
    setZoom(zoom: number, eventData: object): this
    zoomTo(zoom: number, options: AnimationOptions, eventData: object): this
    zoomIn(options: AnimationOptions, eventData: object): this
    zoomOut(options: AnimationOptions, eventData: object): this
    getBearing(): number
    setBearing(bearing: number, eventData: object): this
    getPadding(): PaddingOptions
    setPadding(padding: PaddingOptions, eventData: object): this
    rotateTo(bearing: number, options: AnimationOptions, eventData: object): this
    resetNorth(options: AnimationOptions, eventData: object): this
    resetNorthPitch(options: AnimationOptions, eventData: object): this
    snapToNorth(options: AnimationOptions, eventData: object): this
    getPitch(): number
    setPitch(pitch: number, eventData: object): this
    cameraForBounds(bounds: LatLngBoundLike, options: CameraOptions)

    poiOnAMAP(obj: object): void
    detailOnAMAP(obj: object): void
    getZoom(): number
    getLayers(): any[] // TODO: Layer[]
    getCenter(): LngLat
    getContainer(): Element
    getCity(): any
    getBounds(): Bounds
    getlabelzIndex(): number
    getLimitBounds(): number
    getLang(): string
    getSize(): Size
    getRotation(): number
    getStatus(): object
    getDefaultCursor(): string
    getScale(dpi: number): number
    setZoom(zoom: number): void
    setlabelzIndex(index: number): void
    setLayers(layers: Overlayer[]): void
    add(overlayers: Overlayer[]): void
    remove(overlayers: Overlayer[]): void
    setAllOverlays(type: any): Overlayer[] // TODO:
    setCenter(position: LngLat): void
    setZoomAndCenter(zoom: number, center: LngLat): void
    clearLimitBounds(): void
    setLang(lang: string): void
    setRotation(rotation: number): void
    setStatus(status: object): void
    setDefaultCursor(cursor: string): void
    zoomIn(): void
    zoomOut(): void
    panTo(position: LngLat | number[]): void
    panBy(x: number, y: number): void
    setFitView(overlayers: Overlayer[]): void
    clearMap(): void
    destroy(): void
    plugin(name: string | string[], callback: Function): void
    addControl(obj: object): void
    removeControl(obj: object): void
    clearInfoWindow(): void
    pixelToLngLat(pixel: Pixel, level: number): Pixel
    lnglatToPixel(lnglat: LngLat, level: number): LngLat
    lngLatToContainer(lnglat: LngLat): Pixel
    setMapStyle(style: string): void
    getMapStyle(): string
    setFeatures(features: any[]): void
    getFeatures(): any[]
    setDefaultLayer(layer: TileLayer): void
  }
  export interface MapOptions {
    view?: View2D
    zoom?: number // []
    zooms?: number[] // pc[3,18], mobile[3,19]
    center?: LngLat | number[]
    layers?: any[]
    labelzIndex?: number
    lang?: string
    cursor?: string
    crs?: string
    animateEnable?: boolean
    isHotspot?: boolean
    dragEnable?: boolean
    zoomEnable?: boolean
    doubleClickZoom?: boolean
    jogEnable?: boolean
    scrollWheel?: boolean
    touchZoom?: boolean
    showBuildingBlock?: boolean
    features?: any[]
    mapStyle?: string
  }

  export interface AnimationOptions {
    duration: number
    easing: function
    offset: PointLike
    animate: boolean
  }

  export interface PaddingOptions {
    top: number
    bottom: number
    left: number
    right: number
  }

  export interface CameraOptions {
    padding: number | PaddingOptions
    offset: PointLike
    maxZoom: number
  }

  /** ********View2D */
  export class View2D {
    constructor(opt: View2DOptions)
  }

  export interface View2DOptions {
    center?: LngLat
    rotation?: number
    zoom?: number
    crs?: string
  }

  /** *******event */
  export class event {
    addDomListener(instance: Element, eventName: string, handler: Function, context: object): EventListener
    addListenerOnce(instance: Element, eventName: string, handler: Function, context: object): EventListener
    removeListener(listener: EventListener): void
    trigger(instance: any, eventName: string, extArgs: any): void
  }

  export interface EventListener {
    // TODO: No description
  }

  export interface MapsEvent {
    lnglat?: LngLat
    pixel?: Pixel
    type?: string
    target?: object
  }

  /** ******TileLayer */
  export class TileLayer {
    RoadNet: RoadNet
    Satellite: Satellite
    constructor(tileOpt: TileLayerOptions)
    setOpacity(alpha: number): void
    show(): void
    hide(): void
    getTiles(): any[]
    reload(): void
    setTileUrl(url: string): void
    getZooms(): any[]
    setzIndex(index: number): void
    setMap(map: Map): void
  }

  export class RoadNet {

  }
  export class Satellite {

  }

  export interface TileLayerOptions {
    map?: Map
    titleSize?: number
    tileUrl?: string
    errorUrl?: string
    getTileUrl?: string | { Function(x: number, y: number, z: number): string }
    zIndex?: number
    opacity?: number
    zooms?: number[]
    detectRetina?: boolean
  }

  /** *******Marker */
  export class Marker extends Overlayer {
    constructor(opt: MarkerOptions)
    addTo(map: Map): Marker
    markerOnAMAP(obj: object): void
    getOffset(): Pixel
    setOffset(offset: Pixel): void
    getAnimation(): string
    setAnimation(animation: string): void
    setClickable(clickable: boolean): void
    getClickable(): boolean
    getPosition(): LngLat
    setPosition(lnglat: LngLat | number[]): void
    setAngle(angle: number): void
    setLabel(label: object): void
    getLabel(): object
    getAngle(): number
    setzIndex(index: number): void
    getzIndex(): number
    setIcon(content: string | Icon): void
    getIcon(): string | Icon
    setDraggable(draggable: boolean): void
    getDraggable(): boolean
    setCursor(cursor: string): string
    setContent(html: string | Element): void
    moveAlong(path: LngLat[], speed: number, f: Function, circlable: boolean): void
    moveTo(lnglat: LngLat, speed: number, f: Function): void
    stopMove(): void
    pauseMove(): void
    resumeMove(): void
    setTitle(title: string): void
    setTop(isTop: boolean): void
    getTop(): boolean
    setShadow(icon: Icon): void
    getShadow(): Icon
    setShape(shape: MarkerShape): void
    getShape(): MarkerShape
  }

  export interface MarkerOptions {
    map?: Map
    position?: LngLat | number[]
    offset?: Pixel
    icon?: string | Icon
    content?: string | HTMLElement
    topWhenClick?: boolean
    bubble?: boolean
    draggable?: boolean
    raiseOnDrag?: boolean
    cursor?: string
    visible?: boolean
    zIndex?: number
    angle?: number
    autoRotation?: boolean
    animation?: string
    shadow?: Icon
    title?: string
    clickable?: boolean
    shape?: MarkerShape
    extData?: any
    label?: { content: string | Element, offset: number[] }
  }

  export class MarkerShape {
    constructor(opt: MarkerShapeOptions)
  }

  export interface MarkerShapeOptions {
    coords?: number[]
    type?: string
  }

  /** *******Icon */
  export class Icon {
    constructor(opt: IconOptions)
    getImageSize(): Size
    setImageSize(size: Size): void
  }

  export interface IconOptions {
    // You'd better set size to new AMap.Size(19, 31)
    // Because AMap.Icon can not set offset
    size?: Size
    imageOffset?: Pixel
    image?: string
  }

  /** *******Polyline */
  export class Polyline extends Overlayer {
    constructor(opt: PolylineOptions)
    getPath(): LngLat[]
    setPath(lnglats: number[][]): void
    setOptions(opt: PolylineOptions): void
    getOptions(): PolylineOptions
    getLength(): number // m
    getBounds(): Bounds
  }
  export interface PolylineOptions {

  }
}

declare interface Window {
}
