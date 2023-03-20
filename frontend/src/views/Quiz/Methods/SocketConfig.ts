import { io } from 'socket.io-client'

export const socket = io('http://localhost:8080', {
  withCredentials: true,
  extraHeaders: {
    'my-custom-header': 'abcd'
  },
  transports: ['websocket']
})

socket.on('connect', () => {
  console.log('socket connected, Socket id: ' + socket.id)
})
socket.on('connect_error', (err) => {
  console.log('err log ' + err)
})
