import { nanoid } from 'nanoid'
import { WhichMap } from '../../map/mapType'
import type { IEventHandler, IMap, ISubTrackLayerOption, ITrackLayer, ITrackLayerOption } from '../../sdk'

import { anyEvent2AMapEvent, coordinateToAMapLngLat } from '../../utils'

export class TrackLayer implements ITrackLayer {
  _id: string
  _whichMap = WhichMap.AMap
  _original: AMap.Polyline
  passedLine: AMap.Polyline
  marker: AMap.Marker
  path: AMap.LngLat[] | [] = []
  constructor(opt: ITrackLayerOption) {
    this._id = nanoid()
    const trackLayer = opt.layers.find(layer => layer.name === 'track') as ISubTrackLayerOption

    //  const trackPointLayer = opt.layers.find(layer => layer.name === 'trackPoint')
    //  const startLayer = opt.layers.find(layer => layer.name === 'start')
    //  const endLayer = opt.layers.find(layer => layer.name === 'end')

    this.path = trackLayer?.data?.coordinates.map(coordinateToAMapLngLat) || []
    const strokeColor = trackLayer.style['line-color'] || undefined
    const strokeWeight = trackLayer.style['line-width'] || undefined

    this.marker = new AMap.Marker({
      position: trackLayer.data?.coordinates[0],
      // TODO: Type Error
      // @ts-expect-error todo, unknown property 'autoRotate'
      autoRotate: true,
    })

    this._original = new AMap.Polyline({
      path: this.path,
      strokeColor,
      strokeWeight,
      showDir: true,
    })

    this.passedLine = new AMap.Polyline({
      strokeColor: '#AF5',
    })

    // TODO: Type Error
    // @ts-expect-error todo, Type Error
    this.marker.on('moving', (e: { passedPath: AMap.LngLat[] }) => {
      this.passedLine.setPath(e.passedPath)
    })
  }

  addTo(map: IMap<AMap.Map>): ITrackLayer {
    map._original.add(this._original)
    map._original.add(this.marker)
    map._original.add(this.passedLine)
    return this
  }

  remove(): void {
    this.marker.remove()
    this._original.remove()
    this.passedLine.remove()
  }

  play() {
    this.marker.moveAlong(this.path, 200)
    return this
  }

  pause(): ITrackLayer {
    this.marker.pauseMove()
    return this
  }

  on(eventName: string, handler: IEventHandler) {
    this._original.on(anyEvent2AMapEvent(eventName), handler)
    return this
  }

  off(eventName: string, handler: IEventHandler) {
    this._original.off(anyEvent2AMapEvent(eventName), handler)
    return this
  }
}
