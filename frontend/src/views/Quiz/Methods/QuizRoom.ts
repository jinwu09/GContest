import { socket } from './SocketConfig'

export const JoinRoom = (Roomname: string) => {
  const data: any = { Roomname }
  socket.emit('JoinRoom', data)
}
socket.on('JoinRoom', (response) => {
  console.log(response)
  // console.log(response.data.payload.data)
  // console.log(response.data.status)
})

export const CheckRoom = () => {
  socket.emit('CheckRoom')
}
socket.on('CheckRoom', (message) => {
  console.log('this is message')
  console.log(message)
})
