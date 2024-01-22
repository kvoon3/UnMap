export interface IPoint {
  x: number
  y: number
  clone(): IPoint
  toString(): string
}

export type IPointLike = IPoint | [number, number]
