import { createApp } from 'vue'
import App from './App.vue'
import { router } from './src/router'
import './src/styles'

const app = createApp(App)

app.use(router)

app.mount('#app')
