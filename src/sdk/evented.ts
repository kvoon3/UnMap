import type { ILnglatLike } from '../base'
import type { IMap } from './map'
import type { IPoint } from './point'

export interface IEventedOption {
  // LngLat?: Array<number>;
  content?: string | Element
  // class?: string;
  // closeBtn?: boolean;
}

interface IEvent<TOrig = undefined> {
  type: string
  target: IMap
  originalEvent: TOrig
}

export type IEventHandler<E = any> = (e: E) => void

interface IMapTouchEvent extends IEvent<TouchEvent> {
  type: 'touchstart' | 'touchend' | 'touchcancel'

  // TODO: complete IPoint
  // point: IPoint;
  // points: Point[];

  lngLat: ILnglatLike
  lngLats: ILnglatLike[]

  preventDefault: () => void
  defaultPrevented: boolean
}

interface IMapMouseEvent extends IEvent<MouseEvent> {
  type:
    | 'mousedown'
    | 'mouseup'
    | 'click'
    | 'dblclick'
    | 'mousemove'
    | 'mouseover'
    | 'mouseenter'
    | 'mouseleave'
    | 'mouseout'
    | 'contextmenu'

  // TODO: complete IPoint
  point: IPoint
  lngLat: ILnglatLike

  preventDefault: () => void
  defaultPrevented: boolean
}

export interface IMapEventType {
  load: IEvent

  touchend: IMapTouchEvent
  touchstart: IMapTouchEvent

  click: IMapMouseEvent
  dblclick: IMapMouseEvent

  mousemove: IMapMouseEvent
  mouseup: IMapMouseEvent
  mousedown: IMapMouseEvent
  mouseout: IMapMouseEvent
  mouseover: IMapMouseEvent

  movestart: IEvent<MouseEvent | TouchEvent | WheelEvent | undefined>
  move: IEvent<MouseEvent | TouchEvent | WheelEvent | undefined>
  moveend: IEvent<MouseEvent | TouchEvent | WheelEvent | undefined>

  zoomstart: IEvent<MouseEvent | TouchEvent | WheelEvent | undefined>
  zoom: IEvent<MouseEvent | TouchEvent | WheelEvent | undefined>
  zoomend: IEvent<MouseEvent | TouchEvent | WheelEvent | undefined>

  rotatestart: IEvent<MouseEvent | TouchEvent | undefined>
  rotate: IEvent<MouseEvent | TouchEvent | undefined>
  // rotateend: IEvent<MouseEvent | TouchEvent | undefined>

  dragstart: IEvent<MouseEvent | TouchEvent | undefined>
  drag: IEvent<MouseEvent | TouchEvent | undefined>
  dragend: IEvent<MouseEvent | TouchEvent | undefined>
}

export interface IMarkerEventType {
  dragstart: IEvent<MouseEvent | TouchEvent | undefined>
  drag: IEvent<MouseEvent | TouchEvent | undefined>
  dragend: IEvent<MouseEvent | TouchEvent | undefined>
}

export interface ITrackEventType {
  click: IMapMouseEvent
  dblclick: IMapMouseEvent
  movestart: IEvent<MouseEvent | TouchEvent | WheelEvent | undefined>
  move: IEvent<MouseEvent | TouchEvent | WheelEvent | undefined>
  moveend: IEvent<MouseEvent | TouchEvent | WheelEvent | undefined>
}

interface ILineStringMouseEvent extends IEvent<MouseEvent> {
  type:
    | 'mousedown'
    | 'mouseup'
    | 'click'
    | 'dblclick'
    | 'mousemove'
    | 'mouseenter'
    | 'mouseleave'
  // TODO: complete IPoint
  // point: IPoint;
  lngLat: ILnglatLike

  preventDefault: () => void
  defaultPrevented: boolean
}

export interface ILineStringEventType {
  mouseup: ILineStringMouseEvent
  mousedown: ILineStringMouseEvent
  click: ILineStringMouseEvent
  dblclick: ILineStringMouseEvent
  mousemove: ILineStringMouseEvent
}

export interface IEvented<E extends string> {
  on: (eventName: E, handler: (...args: any[]) => any) => this // AddEventListener function，not required
  off: (eventName: E, handler: (...args: any[]) => any) => this // Remove a previously added listener funciton
}
