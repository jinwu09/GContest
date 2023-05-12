import { io } from 'socket.io-client'
import { useAuthStore } from '@/store/AuthStore'

const store = useAuthStore()
export const socket = io(import.meta.env.VITE_APP_STATUS == 'LOCAL' ? import.meta.env.VITE_API_LOCAL_URL:import.meta.env.VITE_API_DEPLOYMENT_URL, {
  auth: {
    token: store.token
  },
  withCredentials: true,
  extraHeaders: {
    'my-custom-header': 'abcd'
  },
  transports: ['websocket']
})
socket.connect()

// socket.on('connect', () => {
//   console.log('socket connected, Socket id: ' + socket.id)
// })
// socket.on('disconnect', () => {
//   console.log('socket disconnect, Socket id: ' + socket.id)
// })
// socket.on('connect_error', (err) => {
//   console.log('err log ' + err)
// })

// socket.on('message', (data) => {
//   console.log(data)
// })
