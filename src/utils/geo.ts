export function coordinateToAMapLngLat(coordinate: [number, number]): AMap.LngLat {
  return new AMap.LngLat(coordinate[0], coordinate[1])
}
