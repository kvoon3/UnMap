<script setup lang="ts">
function initMapSDK(aimap: any) {
  aimap.accessToken = 'UFJGhyFdSzvm1ZbecYglp6CssgnDK7PZ'
  aimap.baseApiUrl = 'https://location-dev.newayz.com'
  aimap.workerCount = 2
  return aimap
}

// function renderMap() {
//   const container = document.querySelector('#aimap')

//   if (!container) {
//     consola.error('not find map container DOM')
//     return void 0
//   }

//   if (!window.aimap) {
//     consola.error('not find aimap SDK')
//     return void 0
//   }

//   const aimap = window.aimap
//   initMapSDK(aimap)

//   new window.aimap.Map({
//     container,
//     center: [121.612846, 31.205494],
//     zoom: 13,
//     minZoom: 3,
//     maxZoom: 20,
//     pitch: 0,
//     bearing: 0,
//     style: 'aimap://styles/aimap/normal-v4',
//   })

//   const oneMap = new OneMap(aimap)
//   oneMap.Map({
//     container: '#aimap',
//     center: [121.612846, 31.205494],
//     zoom: 13,
//     style: 'aimap://styles/aimap/normal-v4',
//   })
// }
</script>

<template>
  <div>
   123
  </div>
</template>