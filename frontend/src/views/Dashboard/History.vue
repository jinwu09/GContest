<script setup lang="ts">
import NavBar from '@/components/NavBar.vue';
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/store/AuthStore'
const router = useRouter()


const store = useAuthStore()


const history = ref()

onMounted(() => {
  axios
    .get('/history/1', {
      headers: {
        Authorization: 'Bearer ' + store.token
      }
    })
    .then((res: any) => {
      console.log(res.data.payload)
      // console.log(quizzes.value)
        history.value = res.data.payload
    })
    .catch((err) => {
      // console.log(err)
    })
})
</script>

<template>
    <NavBar />
    <div class="container-fluid">
        <div class="row">
        <div class="col-md-1"></div>
        <div class="col-lg-10">
          <!-- <div class="row my-3">
            <div v-for="quiz in history" :key="quiz.id" class="col-md-3 mt-4">
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
                    <button class="btn btn-primary px-4" @click="router.push({name: 'history-detail', params:{quiz_id: quiz.id}})">
                      View
                    </button>
                  </div>

                </div>
              </div>
            </div>
          </div> -->
        </div>
        <div class="col-md-1"></div>
      </div>
    </div>
</template>

<style scoped>

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
.card{
  border: 2px solid var(--main-color);
}

.card:hover {
  background-color: var(--main-color);
  color: white;
  box-shadow: 0 4px 8px 0 var(--main-color), 0 6px 20px 0 var(--main-color);
  transform: scale(1.1) rotate(3deg);
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
</style>