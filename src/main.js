import './assets/main.css'

import { createApp } from 'vue'

import App from './App.vue'
// import MyLoading from '@/components/loading/index.js'
import LoadingComponent from '@/components/loading/index.vue'

const app = createApp(App)

app.mount('#app')
