import { nanoid } from 'nanoid'
import type { IMap, ITrackLayer, ITrackLayerOption } from '../../sdk'
import type { TrackLayer as AiMapTrackLayer } from '../../types/maps'
import { WhichMap } from '..'

export class TrackLayer implements ITrackLayer {
  _id: string
  _original: AiMapTrackLayer
  _whichMap = WhichMap.AiMap
  constructor(opt: ITrackLayerOption) {
    this._id = nanoid()
    this._original = new aimap.TrackLayer(opt)
  }

  addTo(map: IMap<mapboxgl.Map>): ITrackLayer {
    this._original.addTo(map._original)
    return this
  }

  remove(): void {
    this._original.remove()
  }

  play() {
    this._original.play()
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
