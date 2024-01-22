import type { IPoint } from '../../sdk/point'

export class Point implements IPoint {
  _origin: mapboxgl.Point
  x: number
  y: number
  constructor(x: number, y: number) {
    this.x = x
    this.y = y
    this._origin = new aimap.Point(x, y)
  }

  clone() {
    return new Point(this.x, this.y)
  }

  toString() {
    return `{${this.x}, ${this.y}}`
  }
}
