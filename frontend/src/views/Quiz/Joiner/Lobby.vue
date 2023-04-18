<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
import LobbyJoiner from '@/components/Joiner/LobbyJoiner.vue'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/store/AuthStore'

import { socket } from '../Methods/SocketConfig'
import axios from 'axios'

const route = useRoute()
const router = useRouter()
const store = useAuthStore()

const quiz_id = ref()
const admin = ref(false)

const JoinRoom = (Roomname: any) => {
  socket.connect()
  const data: any = { Roomname }
  socket.emit('JoinRoom', data)
}

socket.on('JoinRoom', (res: any) => {
  joiners.value = res.data.RoomAttendees
  console.log(joiners.value)
  admin.value = res.admin
  console.log(admin.value)
})

socket.on('Room', (res: any) => {
  joiners.value = res.data.RoomAttendees
  console.log(joiners.value)
})
socket.on('redirect', (res) => {
  if (admin.value == true) {
    // router.push({
    //   name:
    // })
  } else {
    router.push({
      name: 'quiz-join',
      params: {
        quiz_id: res.quiz_id,
        room: route.params.room
      }
    })
  }
})

const QuizStart = () => {
  socket.emit('QuizStart', { Roomname: route.params.room })
}

const joiners: any = ref([])

onMounted(() => {
  JoinRoom(route.params.room)
})

onBeforeUnmount(() => {
  socket.disconnect()
})
</script>

<template>
  <NavBar />
  <div class="mt-2">
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-1"></div>
        <div class="col-lg-10">
          <div class="row">
            <h1>In Lobby:</h1>
          </div>
          <div class="row">
            <div v-for="user in joiners" :key="user.User.id" class="col-md-3 pt-2">
              <LobbyJoiner
                :id="user.User.id"
                :username="user.User.first_name + user.User.last_name"
              />
            </div>
          </div>
          <div v-if="admin == true" @click="QuizStart()"><button>Start</button></div>
        </div>
        <div class="col-lg-1"></div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
