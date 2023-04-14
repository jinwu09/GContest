declare global {
    interface Window {
        Pusher: any;
        Echo: any;
    }
}

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'

import App from './App.vue'
import router from './router'


import axios from 'axios';

import './assets/main.css';




axios.defaults.baseURL = 'http://127.0.0.1:8000/api'
// axios.defaults.withCredentials = true;
// axios.defaults.baseURL = 'http://api.quiger.com:8000/api'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
const app = createApp(App)

app.use(pinia)
app.use(router)

app.mount('#app')
