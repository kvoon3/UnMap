import Long from 'long'

const x_PI = Long.string('3.14159265358979324')
  .multiply(Long.fromValue(3000))
  .divide(Long.fromValue(180))
const PI = Long.fromString('3.1415926535897932384626')
const a = Long.fromValue(6378245.0)
const ee = Long.fromString('0.00669342162296594323')

/**
 * 百度坐标系 (BD-09) 与 火星坐标系 (GCJ-02)的转换
 * 即 百度 转 谷歌、高德
 */
function bd09togcj02(bd_lat, bd_lon) {
  bd_lon = Long.fromValue(bd_lon)
  bd_lat = Long.fromValue(bd_lat)
  const x = bd_lon.subtract(Long.fromValue(0.0065))
  const y = bd_lat.subtract(Long.fromValue(0.006))
  const z = x.multiply(x).add(y.multiply(y)).sqrt().subtract(Long.fromValue(0.00002).multiply(y.multiply(x_PI).sin()))
  const theta = y.divide(x).atan2().subtract(Long.fromValue(0.000003).multiply(x.multiply(x_PI).cos()))
  const gg_lng = z.multiply(theta.cos())
  const gg_lat = z.multiply(theta.sin())
  return [gg_lat.toNumber(), gg_lng.toNumber()]
}

/**
 * 火星坐标系 (GCJ-02) 与百度坐标系 (BD-09) 的转换
 * 即谷歌、高德 转 百度
 */
function gcj02tobd09(lat, lng) {
  lat = Long.fromValue(lat)
  lng = Long.fromValue(lng)
  const z = lng.multiply(lng).add(lat.multiply(lat)).sqrt().add(Long.fromValue(0.00002).multiply(lat.multiply(x_PI).sin()))
  const theta = lat.divide(lng).atan2().add(Long.fromValue(0.000003).multiply(lng.multiply(x_PI).cos()))
  const bd_lng = z.multiply(theta.cos()).add(Long.fromValue(0.0065))
  const bd_lat = z.multiply(theta.sin()).add(Long.fromValue(0.006))
  return [bd_lat.toNumber(), bd_lng.toNumber()]
}

/**
 * WGS84转GCj02
 */
function wgs84togcj02(lat, lng) {
  lat = Long.fromValue(lat)
  lng = Long.fromValue(lng)
  if (out_of_china(lat, lng)) {
    return [lat.toNumber(), lng.toNumber()]
  }
  else {
    let dlat = transformlat(lat.subtract(Long.fromValue(35)), lng.subtract(Long.fromValue(105)))
    let dlng = transformlng(lat.subtract(Long.fromValue(35)), lng.subtract(Long.fromValue(105)))
    const radlat = lat.divide(Long.fromValue(180)).multiply(PI)
    let magic = radlat.sin()
    magic = Long.fromValue(1).subtract(ee.multiply(magic).multiply(magic))
    const sqrtmagic = magic.sqrt()
    dlat = dlat.multiply(Long.fromValue(180)).divide(a.multiply(Long.fromValue(1).subtract(ee))).divide(magic.multiply(sqrtmagic)).multiply(PI)
    dlng = dlng.multiply(Long.fromValue(180)).divide(a.divide(sqrtmagic).multiply(radlat.cos())).multiply(PI)
    const mglat = lat.add(dlat)
    const mglng = lng.add(dlng)
    return [mglat.toNumber(), mglng.toNumber()]
  }
}

/**
 * GCJ02 转换为 WGS84
 */
function gcj02towgs84(lat, lng) {
  lat = Long.fromValue(lat)
  lng = Long.fromValue(lng)
  if (out_of_china(lat.toNumber(), lng.toNumber())) {
    return [lat.toNumber(), lng.toNumber()]
  }
  else {
    let dlat = transformlat(lat.subtract(Long.fromValue(35)), lng.subtract(Long.fromValue(105)))
    let dlng = transformlng(lat.subtract(Long.fromValue(35)), lng.subtract(Long.fromValue(105)))
    const radlat = lat.divide(Long.fromValue(180)).multiply(PI)
    let magic = radlat.sin()
    magic = Long.fromValue(1).subtract(ee.multiply(magic).multiply(magic))
    const sqrtmagic = magic.sqrt()
    dlat = dlat.multiply(Long.fromValue(180)).divide(a.multiply(Long.fromValue(1).subtract(ee))).divide(magic.multiply(sqrtmagic)).multiply(PI)
    dlng = dlng.multiply(Long.fromValue(180)).divide(a.divide(sqrtmagic).multiply(radlat.cos())).multiply(PI)
    const mglat = lat.add(dlat)
    const mglng = lng.add(dlng)
    return [lat.multiply(Long.fromValue(2)).subtract(mglat).toNumber(), lng.multiply(Long.fromValue(2)).subtract(mglng).toNumber()]
  }
}

function transformlat(lat, lng) {
  lat = Long.fromValue(lat)
  lng = Long.fromValue(lng)
  let ret = Long.fromValue(-100.0)
    .add(Long.fromValue(2.0).multiply(lng))
    .add(Long.fromValue(3.0).multiply(lat))
    .add(Long.fromValue(0.2).multiply(lat).multiply(lat))
    .add(Long.fromValue(0.1).multiply(lng).multiply(lat))
    .add(Long.fromValue(0.2).multiply(Math.sqrt(Math.abs(lng))))

  ret = ret.add(
    Long.fromValue(20.0)
      .multiply(Math.sin(Long.fromValue(6.0).multiply(lng).multiply(PI)))
      .add(Long.fromValue(20.0).multiply(Math.sin(Long.fromValue(2.0).multiply(lng).multiply(PI))))
      .multiply(Long.fromValue(2.0 / 3.0)),
  )

  ret = ret.add(
    Long.fromValue(20.0)
      .multiply(Math.sin(lat.multiply(PI)))
      .add(Long.fromValue(40.0).multiply(Math.sin(lat.divide(Long.fromValue(3.0)).multiply(PI))))
      .multiply(Long.fromValue(2.0 / 3.0)),
  )

  ret = ret.add(
    Long.fromValue(160.0)
      .multiply(Math.sin(lat.divide(Long.fromValue(12.0)).multiply(PI)))
      .add(Long.fromValue(320.0).multiply(Math.sin(lat.multiply(PI).divide(Long.fromValue(30.0)))))
      .multiply(Long.fromValue(2.0 / 3.0)),
  )

  return ret
}

function transformlng(lat, lng) {
  lat = Long.fromValue(lat)
  lng = Long.fromValue(lng)
  let ret = Long.fromValue(300.0)
    .add(lng)
    .add(Long.fromValue(2.0).multiply(lat))
    .add(Long.fromValue(0.1).multiply(lng).multiply(lng))
    .add(Long.fromValue(0.1).multiply(lng).multiply(lat))
    .add(Long.fromValue(0.1).multiply(Math.sqrt(Math.abs(lng))))

  ret = ret.add(
    Long.fromValue(20.0)
      .multiply(Math.sin(Long.fromValue(6.0).multiply(lng).multiply(PI)))
      .add(Long.fromValue(20.0).multiply(Math.sin(Long.fromValue(2.0).multiply(lng).multiply(PI))))
      .multiply(Long.fromValue(2.0 / 3.0)),
  )

  ret = ret.add(
    Long.fromValue(20.0)
      .multiply(Math.sin(lat.multiply(PI)))
      .add(Long.fromValue(40.0).multiply(Math.sin(lat.divide(Long.fromValue(3.0)).multiply(PI))))
      .multiply(Long.fromValue(2.0 / 3.0)),
  )

  ret = ret.add(
    Long.fromValue(150.0)
      .multiply(Math.sin(lat.divide(Long.fromValue(12.0)).multiply(PI)))
      .add(Long.fromValue(300.0).multiply(Math.sin(lat.divide(Long.fromValue(30.0)).multiply(PI))))
      .multiply(Long.fromValue(2.0 / 3.0)),
  )

  return ret.toNumber()
}

/**
 * 判断是否在国内，不在国内则不做偏移
 */
function out_of_china(lat, lng) {
  lat = Long.fromValue(lat)
  lng = Long.fromValue(lng)
  // 纬度3.86~53.55,经度73.66~135.05
  return !(lng.greaterThan(73.66) && lng.lessThan(135.05) && lat.greaterThan(3.86) && lat.lessThan(53.55))
}

export default {
  bd09togcj02,
  gcj02tobd09,
  wgs84togcj02,
  gcj02towgs84,
}
