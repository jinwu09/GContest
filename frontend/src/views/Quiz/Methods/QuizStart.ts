import { socket } from './SocketConfig'

export const QuizStart = (
  room: string,
  token: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6Ijk2MmRjZTA2LTU4MDctNDk0Yi1iMzYyLTdjYTM4ZjFkNTI3OSIsImlhdCI6MTY3ODkzMjU4MX0.qzm7jvBirxIjHV1UBSqW5c49aKHkCc4abtbjNbTdlUY'
) => {
  socket.emit('QuizStart', { token, room })
}

socket.on('QuizStart', (dataIO) => {
  console.log('test')
  console.log(dataIO)
})
