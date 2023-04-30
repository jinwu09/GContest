<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
import { onMounted, onBeforeUnmount } from 'vue'
import { socket } from '@/Socket/SocketConfig'
import { useRoute, useRouter } from 'vue-router'
import { ref } from 'vue'

const route = useRoute()
const router = useRouter()
const question: any = ref({
  content: 'loading...',
  choice: [
    { content: 'loading...' },
    { content: 'loading...' },
    { content: 'loading...' },
    { content: 'loading...' }
  ]
})
const FirstQuestion = ref(true)
const LastQuestion = ref(false)

function PreviousQuestion() {
  socket.emit('previous', { Roomname: route.params.room })
}

function nextQuestion() {
  socket.emit('next', { Roomname: route.params.room })
}
function DoneSession() {
  socket.emit('Done', { Roomname: route.params.room })
}

socket.on('refresh', () => {
  socket.emit('QuizLoad', { Roomname: route.params.room })
  socket.emit('AdminQuizLoad', { Roomname: route.params.room })
})

socket.on('AdminQuizLoad', (res) => {
  FirstQuestion.value = res.FirstQuestion
  LastQuestion.value = res.LastQuestion
})
socket.on('QuizLoad', (res) => {
  //   console.log(res)
  question.value = res.question
})
socket.on('redirectToDone', (res) => {
  router.push({
    name: res.PageName,
    params: {
      room: route.params.room,
      session: res.session.id
    }
  })
})
onMounted(() => {
  socket.emit('QuizLoad', { Roomname: route.params.room })
  socket.emit('AdminQuizLoad', { Roomname: route.params.room })
})
onBeforeUnmount(() => {
  socket.disconnect()
})
</script>

<template>
  <NavBar />
  <div class="container-fluid">
    <div class="d-flex align-items-center justify-content-center box">
      <div class="row w-100">
        <div class="col-md-12">
          <div class="row d-flex justify-content-between">
            <button class="col-2 q-button" @click="PreviousQuestion()" :disabled="FirstQuestion">
              Previous
            </button>
            <button
              class="col-2 q-button"
              @click="nextQuestion()"
              :disabled="LastQuestion"
              v-if="LastQuestion == false"
            >
              Next
            </button>
            <button class="col-2 q-button" @click="DoneSession()" v-if="LastQuestion == true">
              Done
            </button>
          </div>
          <div class="row question-area mt-2" id="qa">
            <h3 class="h3" id="text">
              {{ question.content }}
            </h3>
          </div>
          <div class="row d-flex justify-content-between mt-2">
            <div class="col-md-6 a-button" id="a">
              {{ question.choice[0].content }}
            </div>
            <div class="col-md-6 a-button" id="b">
              {{ question.choice[1].content }}
            </div>
            <div class="col-md-6 a-button" id="c">
              {{ question.choice[2].content }}
            </div>
            <div class="col-md-6 a-button" id="d">
              {{ question.choice[3].content }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.box {
  height: 90vh;
}

.question-area {
  background-color: #d9d9d9;
  min-height: 30vh;
  padding: 20px;
  word-wrap: break-word;
}

/* #text{
        font-size: var(--font-size);
    } */

.q-button,
.a-button {
  text-align: center;
  background-color: #d9d9d9;
  min-height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.a-button {
  min-height: 90px;
  word-wrap: break-word;
  padding: 16px;
}

#a {
  color: #fff;
  background-color: #7e549e;
}
#b {
  color: #fff;
  background-color: #c2549d;
}
#c {
  color: #fff;
  background-color: #fc8370;
}
#d {
  color: #fff;
  background-color: #fecb3e;
}
</style>
