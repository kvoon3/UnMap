export type ILnglatLike = ILnglat | ILnglatObject
export type ILnglat = [number, number]
export interface ILnglatObject { lng: number, lat: number }

export function toLnglat(lnglat: ILnglatLike): [number, number] {
  return Array.isArray(lnglat) ? lnglat : [lnglat.lng, lnglat.lat]
}
