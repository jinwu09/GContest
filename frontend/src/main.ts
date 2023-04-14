declare global {
    interface Window {
        Pusher:any;
        Echo:any;
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

import Echo from 'laravel-echo';

import Pusher from 'pusher-js';

window.Pusher = Pusher;

// const socketId = window.Echo.socketId();

// window.Echo = new Echo({
//     broadcaster: 'pusher',
//     key: 'local',
//     cluster: 'mt1',
//     wsHost: '127.0.0.1',
//     wsPort: '6001',
//     wssPort: import.meta.env.VITE_PUSHER_PORT ?? 443,
//     forceTLS: false,
//     disableStats:true,
//     authorizer: (channel: any, options:any) => {
//         return {
//             authorize: (socketId:any, callback:any) => {
//                 axios.post('/api/broadcasting/auth', {
//                     socket_id: socketId,
//                     channel_name: channel.name
//                 })
//                 .then(response => {
//                     callback(null, response.data);
//                 })
//                 .catch(error => {
//                     callback(error);
//                 });
//             }
//         };
//     },
//     enabledTransports: ['ws', 'wss'],
// });

// axios.defaults.baseURL = 'http://127.0.0.1:8000/api'
axios.defaults.baseURL = 'http://api.quiger.com:8000/api'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
const app = createApp(App)

app.use(pinia)
app.use(router)

app.mount('#app')
