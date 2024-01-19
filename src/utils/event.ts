import type { IMapEventType } from '../sdk'
import { objectKeys } from './object'

const eventMapObject: { [key in keyof IMapEventType]: AMap.EventType } = {
  load: 'complete',
  drag: 'dragging',
  dragend: 'dragend',
  dragstart: 'dragstart',
  click: 'click',
  dblclick: 'dblclick',
  mousedown: 'mousedown',
  mouseout: 'mouseout',
  mouseup: 'mouseup',
  mousemove: 'mousemove',
  mouseover: 'mouseover',
  touchstart: 'touchstart',
  touchend: 'touchend',
  zoom: 'zoomchange',
  zoomstart: 'zoomstart',
  zoomend: 'zoomend',
  move: 'mapmove',
  movestart: 'movestart',
  moveend: 'moveend',
  rotatestart: 'rotatestart',
  rotate: 'rotatechange',
}

export function IMapEvent2AMapEvent(eventName: keyof IMapEventType): AMap.EventType {
  return eventMapObject[eventName]
}

export function anyEvent2AMapEvent(eventName: string): AMap.EventType {
  const maybeIMapEvent = objectKeys(eventMapObject).find(evtname => evtname === eventName)
  if (!maybeIMapEvent)
    throw new Error('event not supported')

  return eventMapObject[maybeIMapEvent]
}
