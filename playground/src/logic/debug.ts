import type { IMap, IMarker } from '@kvoon/unmap'

export function traceAllMapEvent(m: IMap) {
  const evtLog = (e: any) => consola.withTag('Map Event').trace('e', e)

  m.on('load', evtLog)
  m.on('click', evtLog)
  m.on('dblclick', evtLog)

  m.on('drag', evtLog)
  m.on('dragstart', evtLog)
  m.on('dragend', evtLog)

  m.on('touchstart', evtLog)
  m.on('touchend', evtLog)

  m.on('mousedown', evtLog)
  m.on('mouseup', evtLog)
  m.on('mouseout', evtLog)
  m.on('mousemove', evtLog)
  m.on('mouseover', evtLog)
}

export function traceAllMarkerEvent(m: IMarker) {
  const evtLog = (e: any) => consola.withTag('Marker Event').trace('e', e)

  m.on('drag', evtLog)
  m.on('dragstart', evtLog)
  m.on('dragend', evtLog)
}
