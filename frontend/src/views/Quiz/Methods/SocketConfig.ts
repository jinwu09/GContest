import { io } from 'socket.io-client'
import { useAuthStore } from '@/store/AuthStore'

const store = useAuthStore()

export const socket = io('http://localhost:8080', {
  auth: {
    token: store.token
  },
  withCredentials: true,
  extraHeaders: {
    'my-custom-header': 'abcd'
  },
  transports: ['websocket']
})

socket.on('connect', () => {
  console.log('socket connected, Socket id: ' + socket.id)
})
socket.on('disconnect', () => {
  console.log('socket disconnect, Socket id: ' + socket.id)
})
socket.on('connect_error', (err) => {
  console.log('err log ' + err)
})

socket.on('message', (data) => {
  console.log(data)
})
