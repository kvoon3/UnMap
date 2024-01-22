import type { IPoint } from '../../sdk/point'

export class Point implements IPoint {
  _origin: AMap.Pixel
  x: number
  y: number
  constructor(x: number, y: number) {
    this.x = x
    this.y = y
    this._origin = new AMap.Pixel(x, y)
  }

  clone() {
    return new Point(this.x, this.y)
  }

  toString() {
    return `{${this.x}, ${this.y}}`
  }
}
