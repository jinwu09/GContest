import { socket } from './SocketConfig'
import { useProfileStore } from '@/store/ProfileStore'

const profile = useProfileStore()

export const JoinRoom = (Roomname: string) => {
  const data: any = { Roomname, username: profile.username }
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
