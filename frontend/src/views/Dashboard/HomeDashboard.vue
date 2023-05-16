<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { useAuthStore } from '@/store/AuthStore'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'
const store = useAuthStore()

const quizzes: any = ref({})
const JoinRoom = ref('')

const router = useRouter()

onMounted(() => {
  axios
    .get('/quiz', {
      headers: {
        Authorization: 'Bearer ' + store.token
      }
    })
    .then((res: any) => {
      quizzes.value = res.data.payload
      // console.log(quizzes.value)
    })
    .catch((err) => {
      // console.log(err)
    })
})

function navToCreateTest() {
  router.push({ name: 'create-quiz' })
}

function editQuiz(id: any) {
  router.push({
    name: 'update-quiz',
    params: {
      quiz_id: id
    }
  })
}

function joinLobbyAsJoiner(room: any) {
  router.push({
    name: 'quiz-lobby',
    params: {
      room: room
    }
  })
}
</script>

<template>
  <NavBar />
  <div class="mt-1">
    <div class="container-fluid">
      <div class="row mt-4">
        <div class="col-lg-1"></div>
        <div class="col-lg-6">
          <div class="row room-background mt-2">
            <div class="d-flex align-items-center justify-content-center">
              Private rooms are under repair

              <!-- <div class="row w-75">
                <form @submit.prevent="joinLobbyAsJoiner(JoinRoom)" class="col-md-8 mt-2">
                  <input
                    class="form-control form-control-lg"
                    type="text"
                    placeholder="Room Number"
                    aria-label=".form-control-lg example"
                    v-model="JoinRoom"
                  />
                </form>
                <div class="col-md-4 mt-2">
                  <div class="d-grid mx-auto">
                    <button
                      class="btn btn-primary btn-lg"
                      type="submit"
                      @click="joinLobbyAsJoiner(JoinRoom)"
                    >
                      JOIN
                    </button>
                  </div>
                </div>
              </div> -->
            </div>
          </div>
        </div>
        <div class="col-lg-1"></div>
        <div class="col-lg-3">
          <div class="row test-background mt-2" @click="navToCreateTest">
            <div class="d-flex align-items-center justify-content-center">
              <div class="row w-75">
                <div class="col-md-12 mt-2 text-center test-color">
                  <p class="h5 text-center">
                    <span class="pe-4"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor"
                        class="bi bi-plus-square-fill" viewBox="0 0 16 16">
                        <path
                          d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0z" />
                      </svg></span>Create a Test
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-1"></div>
      </div>
      <div class="row">
        <div class="col-md-1"></div>
        <div class="col-lg-10">
          <div class="row my-3">
            <div v-for="quiz in quizzes" :key="quiz.id" class="col-md-3 mt-4">
              <div class="card max">
                <div class="card-body">
                  <div class="d-flex justify-content-between">
                    <h3 class="card-title text-center">{{ quiz.title }}</h3>
                    <div v-if="quiz.admin">
                      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#F7A531"
                        class="bi bi-star-fill" viewBox="0 0 16 16">
                        <path
                          d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                      </svg>
                    </div>
                    <div v-else>
                      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#F7A531"
                        class="bi bi-people-fill" viewBox="0 0 16 16">
                        <path
                          d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7Zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216ZM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                      </svg>
                    </div>
                  </div>

                  <h5 class="card-subtitle my-4 text-muted no-long-text">{{ quiz.description }}</h5>
                  <p class="text-muted ">
                    Created by:
                    {{ quiz.creator.first_name + ' ' + quiz.creator.last_name }}
                  </p>
                  <div class="d-grid gap-2">
                    <button class="btn btn-primary px-4" @click="joinLobbyAsJoiner(quiz.room[0].room)">
                      Join
                    </button>
                    <button v-show="quiz.admin" class="btn btn-primary px-4" @click="editQuiz(quiz.id)">
                      Edit
                    </button>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-1"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.room-background {
  background: #f0f0f0;
  height: 165px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 25px;
}

.btn {
  background: var(--main-color);
  border: none;
  border-radius: 15px;
}

.btn:active {
  border: var(--main-color) 3px solid;
  background: #f0f0f0;
  color: var(--main-color);
}

.form-control {
  border: var(--main-color) 3px solid;
  border-radius: 25px;
}

.test-color {
  color: var(--main-color);
}

.test-background {
  background: #f0f0f0;
  height: 165px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 25px;
}

.max{
  height: inherit;
}

.card{
  border: 2px solid var(--main-color);
}

.card:hover {
  background-color: var(--main-color);
  color: white;
  box-shadow: 0 4px 8px 0 var(--main-color), 0 6px 20px 0 var(--main-color);
  transform: scale(1.1) ;
}

.card:hover .card-body .text-muted {
  color: white !important;
}

.card:hover .card-body div .btn {
  background-color: white;
  color: var(--main-color);
}

.no-long-text{
  text-overflow: ellipsis;
  overflow: hidden; 
  white-space: nowrap;
  width: 100%; 
  height: 1.2em;
}


@keyframes bounce {

  0%,
  20%,
  60%,
  100% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }

  40% {
    -webkit-transform: translateY(-20px);
    transform: translateY(-20px);
  }

  80% {
    -webkit-transform: translateY(-10px);
    transform: translateY(-10px);
  }
}

.test-background:hover {
  border: var(--main-color) 3px solid;
  animation: bounce 0.2s;
}
</style>
