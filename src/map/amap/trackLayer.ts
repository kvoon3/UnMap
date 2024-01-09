import { nanoid } from 'nanoid'
import { WhichMap } from '../../map/mapType'
import type { IMap, ISubTrackLayerOption, ITrackLayer, ITrackLayerOption } from '../../sdk'

import { coordinateToAMapLngLat } from '../../utils'

export class TrackLayer implements ITrackLayer {
  _id: string
  _original: AMap.Polyline
  _whichMap = WhichMap.AMap
  marker: AMap.Marker
  constructor(opt: ITrackLayerOption) {
    this._id = nanoid()
    const trackLayer = opt.layers.find(layer => layer.name === 'track') as ISubTrackLayerOption

    //  const trackPointLayer = opt.layers.find(layer => layer.name === 'trackPoint')
    //  const startLayer = opt.layers.find(layer => layer.name === 'start')
    //  const endLayer = opt.layers.find(layer => layer.name === 'end')

    const path = trackLayer?.data?.coordinates.map(coordinateToAMapLngLat)
    const strokeColor = trackLayer.style['line-color'] || undefined
    const strokeWeight = trackLayer.style['line-width'] || undefined

    this.marker = new AMap.Marker({
      position: trackLayer.data?.coordinates[0],
      // @ts-expect-error todo
      autoRotate: true,
    })

    this._original = new AMap.Polyline({
      path,
      strokeColor,
      strokeWeight,
      showDir: true,
    })

    // @ts-expect-error todo
    this.marker.on('moving', (e) => {
      this._original.setPath(e.passedPath)
    })
  }

  addTo(map: IMap<AMap.Map>): ITrackLayer {
    map._original.add(this._original)
    return this
  }

  remove(): void {
    this._original.remove()
  }

  play() {
    this.marker.moveAlong()
    return this
  }

  pause(): ITrackLayer {
    this._original.pause()
    return this
  }

  on(eventName: string, handler: Function) {
    this._original.on(eventName, handler)
    return this
  }

  off(eventName: string, handler: Function) {
    this._original.on(eventName, handler)
    return this
  }
}
