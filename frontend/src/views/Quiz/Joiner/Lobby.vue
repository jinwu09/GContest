<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
import LobbyJoiner from '@/components/Joiner/LobbyJoiner.vue'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/store/AuthStore'
import { socket } from '@/Socket/SocketConfig'
import Swal from 'sweetalert2'
import { SwalDesign } from '@/assets/CustomSwal'

const route = useRoute()
const router = useRouter()
const store = useAuthStore()

const redirect = ref(false)

const admin = ref(false)
const isExist: any = ref(true)

const JoinRoom = (Roomname: any) => {
  socket.connect()
  const data: any = { Roomname }
  socket.emit('JoinRoom', data)
}

socket.on('JoinRoom', (res: any) => {
  // console.log(res.isExist)
  isExist.value = res.isExist || false
  joiners.value = res.data.RoomAttendees
  // console.log(joiners.value)
  admin.value = res.admin
  // console.log(admin.value)
})

socket.on('Room', (res: any) => {
  joiners.value = res.data.RoomAttendees
  // console.log(joiners.value)
})
socket.on('redirect', (res) => {
  redirect.value = true
  router.push({
    name: res.PageName,
    params: {
      room: route.params.room
    }
  })
})

interface IError {
  msg: {
    ErrorType: string
    cause: string
    ErrLine?: string
  }
  StatusCode: number
}
socket.on('Error', (res: IError) => {
  if (admin.value != true) return
  SwalDesign.fire({
    icon: 'error',
    title: 'Oops...',
    text: res.msg.cause
  })
})
interface IPassword {
  msg: string
}
socket.on('password', (res: IPassword) => {
  isExist.value = true
  SwalDesign.fire({
    icon: 'info',
    text: res.msg,
    input: 'password',
    showCancelButton: true
  }).then((result) => {
    console.log(result)
    if (result.isConfirmed) {
      socket.emit('JoinRoom', { password: result.value, Roomname: route.params.room })
    }
    if (result.dismiss) {
      router.push({
        name: 'dashboard'
      })
    }
  })
})

const QuizStart = () => {
  socket.emit('QuizStart', { Roomname: route.params.room })
}

const joiners: any = ref([])

onMounted(() => {
  JoinRoom(route.params.room)
})

onBeforeUnmount(() => {
  if (redirect.value !== true) {
    socket.disconnect()
  }
})
</script>

<template>
  <NavBar />
  <div class="mt-2">
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-1"></div>
        <div class="col-lg-10" v-if="!isExist">
          <h1>Room doesn't exist</h1>
        </div>
        <div class="col-lg-10" v-if="isExist">
          <button v-if="admin == true" @click="QuizStart()" class="floating-button" type="button">
            Start the Quiz!
          </button>
          <div class="row pt-2">
            <h1>In Lobby:</h1>
          </div>
          <div class="row">
            <div v-for="user in joiners" :key="user.User.id" class="col-md-3 pt-2">
              <LobbyJoiner
                :id="user.User.id"
                :username="user.User.first_name + ' ' + user.User.last_name"
              />
            </div>
          </div>
        </div>
        <div class="col-lg-1"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Gloria+Hallelujah&display=swap');

.floating-button {
  position: fixed;
  bottom: 40px;
  right: 40px;
  height: 80px;
  padding: 20px;
  background-color: var(--main-color);
  color: #fff;
  border-radius: 25px;
  text-align: center;
  box-shadow: 2px 2px 3px #999;
}

.floating-button:hover {
  transform: scale(1.2);
  background-color: var(--hover-color);
}
</style>
