<script setup lang="ts">
import { reactive } from 'vue'
import * as Quiz from './SocketIndex'
import { socket } from './Methods/SocketConfig'

socket.on(socket.id, (message) => {
  console.log(message)
})
// checks room

socket.emit('startex')
const prop = reactive({ roominput: '' })
</script>

<template>
  <div class="allgrey">
    <div>
      <button @click="Quiz.Room.JoinRoom(prop.roominput)">join room</button
      ><input type="text" v-model="prop.roominput" />
    </div>
    <div><button @click="Quiz.Room.CheckRoom()">check room</button></div>
    <div><button @click="Quiz.QuizStart(prop.roominput)">start quiz</button></div>
  </div>
</template>
<style>
.allgrey {
  background-color: #595959;
  height: 100vh;
}
</style>
