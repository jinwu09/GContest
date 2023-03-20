import { socket } from './SocketConfig'

export const JoinRoom = (Roomname: string, Username: string = 'testuser') => {
  const data = { Roomname, Username }
  socket.emit('JoinRoom', data)
}
socket.on('JoinRoom', (message) => {
  console.log(message)
})

export const CheckRoom = () => {
  socket.emit('CheckRoom')
}
socket.on('CheckRoom', (message) => {
  console.log('this is message')
  console.log(message)
})
