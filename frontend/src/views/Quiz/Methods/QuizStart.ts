import { socket } from './SocketConfig'

export const QuizStart = (room: string) => {
  socket.emit('QuizStart', { room })
}

socket.on('QuizStart', (dataIO) => {
  console.log('test')
  console.log(dataIO)
})
