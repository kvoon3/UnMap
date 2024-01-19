<script setup lang="ts">
import { UnMap, WhichMap, IMap, IMarker, ILineString } from '@kvoon3/unmap'
import { mockLngLats } from '../logic/state'
import { cleanMapItem, loadAMapSDK, loadAiMapSDK } from '../logic/utils'
import { traceAllMapEvent, traceAllMarkerEvent } from '../logic/debug'
import PersonMarker from '../components/PersonMarker.vue'
import { render } from 'vue'

const containerId = 'map'
const whichMap = ref<WhichMap>(WhichMap.AiMap)
let unMap: UnMap = new UnMap(whichMap.value)
const map = shallowRef<IMap | undefined>(undefined)

const marker = shallowRef<IMarker | undefined>(undefined)
const lineString = shallowRef<ILineString | undefined>(undefined)

const mapName = computed(() =>
  whichMap.value === WhichMap.AMap
    ? 'AMap'
    : whichMap.value === WhichMap.AiMap
      ? 'AiMap'
      : 'unknown map'
)

function renderAiMap() {
  return new Promise<IMap>((resolve, reject) => {
    loadAiMapSDK(unMap)
      .then(() => {
        map.value = unMap.Map({
          container: containerId,
          center: mockLngLats.Shanghai,
          zoom: 7,
          // @ts-expect-error type error
          style: 'aimap://styles/aimap/normal-v3',
        })

        map.value?.on('load', () => {
          if (map.value)
            resolve(map.value)
        })
      })
      .catch(error => {
        console.error(error)
        reject(error)
      })
  })
}

function renderAMap() {
  return new Promise<IMap>((resolve, reject) => {
    loadAMapSDK(unMap)
      .then(() => {
        consola.log('unMap')

        map.value = unMap.Map({
          container: containerId,
          center: mockLngLats.Shanghai,
          zoom: 7,
        })

        map.value?.on('load', () => {
          if (map.value)
            resolve(map.value)
        })
      })
      .catch((error) => {
        consola.error('error', error)
        reject(error)
      })
  })
}

function renderMarker(map: IMap) {
  const onClick = (e: MouseEvent | TouchEvent) => {
    // TODO: set popup
    if (!marker.value)
      return

    consola.log('toggle popup')
    marker.value.togglePopup()

    consola.log('marker.value.getPopup()', marker.value.getPopup())
  }


  // @ts-expect-error type error
  window.onMarkerClick = onClick

  return new Promise((resolve) => {
    // create person marker
    const personMarkerVue = h(PersonMarker, {
      label: 'Guoodli',
      onClick,
    })
    const personMarkerContainer = document.createElement('div')
    render(personMarkerVue, personMarkerContainer)

    // create popup
    const popupContainer = document.createElement('div')
    render(h('div', {
      class: 'bg-red color-white h-10 text-lg rounded-lg p1',
      innerHTML: 'Popup',
      onClick,
    }), popupContainer)

    marker.value = unMap
      .Marker({
        content: personMarkerContainer,
      })
      .setLngLat(mockLngLats.Shanghai)
      .setPopup(
        unMap
          .Popup({
            offset: {
              x: 0,
              y: 0
            }
          })
          .setDOMContent(popupContainer)
      )
      .addTo(map)

    const markerLngLat = marker.value?.getLngLat()
    consola.log('markerLngLat', markerLngLat)
    resolve(marker.value)
  })
}

function renderLineString(map: IMap) {
  lineString.value = unMap.LineString({
    name: 'theLineString',
    data: {
      type: 'Point',
      coordinates: [
        mockLngLats.Peking,
        mockLngLats.Shanghai,
        mockLngLats.Shanghai2,
      ]
    },
    style: {
      'line-color': 'red',
      'line-width': 2,
    }
  })
    .addTo(map)
}

function switchMap(which: WhichMap) {
  cleanMapItem([map, marker], containerId)
  unMap = new UnMap(which)

  const $renderMap = which === WhichMap.AMap
    ? renderAMap()
    : renderAiMap()

  $renderMap
    .then(renderMarker)

  $renderMap
    .then(renderLineString)
}

function onMapReady(m: IMap) {

  m.setCenter(mockLngLats.Shanghai)
  const res = m.getCenter()
  consola.log('current map center', res)

  traceAllMapEvent(m)
}

function onMarkerReady(m: IMarker) {
  if (!m)
    return
  traceAllMarkerEvent(m)
}

watch(
  whichMap,
  (which) => switchMap(which),
  { immediate: true }
)

watch(
  map,
  (m) => m ? onMapReady(m) : void 0,
  { immediate: true }
)

watch(
  marker,
  (m) => m ? onMarkerReady(m) : void 0,
  { immediate: true }
)
</script>

<template>
  <div class="map-wrapper" :id="containerId" h100dvh w100dvw bg-slate />
  <!-- <PersonMarker ref="markerEl" /> -->
  <Teleport to="body">
    <header inset-0 mx-auto absolute h-fit text-center text-base bg-secondary>{{ mapName }}</header>
  </Teleport>
  <Teleport to="body">
    <section flex="~ col" items-center justify-center absolute right-4 bottom-4 gap2>
      <button btn bg-base @click="whichMap = WhichMap.AiMap">Use AiMap</button>
      <button btn bg-base @click="whichMap = WhichMap.AMap">Use AMap</button>
    </section>
  </Teleport>
</template>
