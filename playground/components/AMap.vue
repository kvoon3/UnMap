<script setup lang="ts">
import { OneMap, WhichMap } from '@kvoon3/one-map'
import { onMounted } from 'vue';
import { mockLngLats } from '../logic/state';
import { consola } from 'consola'

const oneMap = new OneMap(WhichMap.AMap)

function renderMap() {

  window.onAMapReady = onAMapReady

  window._AMapSecurityConfig = {
    securityJsCode: 'a3db38589ec7faba6945f6758fbd3750',
  }

  oneMap.load('https://webapi.amap.com/maps?v=2.0&key=bb3fe75c2fa757bf5c6563708ffcc419&callback=onAMapReady')
}

function onAMapReady() {
  consola.log('oneMap')

  const map = oneMap.Map({
    container: 'amap',
    center: [121.612846, 31.205494],
  })

  
  map.setCenter(mockLngLats.Shanghai)
  const res = map.getCenter()
  consola.log('current map center', res)

  oneMap
    .Marker({
      content: `<div>Marker</div>`
    })
    .setLngLat(mockLngLats.Shanghai)
    .addTo(map)
}

onMounted(() => renderMap())
</script>

<template>
  <div id="amap" />
</template>

<style lang="css" scoped>
#amap {
  height: 50vh;
  width: 100vw;
}
</style>