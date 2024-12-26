export type ILngLat = [number, number] | { lng: number, lat: number }
export function toLnglatArray(lnglat: ILngLat): [number, number] {
  return Array.isArray(lnglat) ? lnglat : [lnglat.lng, lnglat.lat]
}
