<script setup lang="ts">
import RecentPill from '@/components/Dashboard/RecentPill.vue'
import NavBar from '@/components/NavBar.vue'
import { onMounted, ref } from 'vue'
import { useAuthStore } from '@/store/AuthStore'
import { useRouter } from 'vue-router'
import axios from 'axios'
const store = useAuthStore()
const router = useRouter()

const created = ref()

onMounted(() => {
  axios
    .get('/history/created', {
      headers: {
        Authorization: 'Bearer ' + store.token
      }
    })
    .then((res: any) => {
      
      // console.log(quizzes.value)
      created.value = res.data.payload
      
    })
    .catch((err) => {
      // console.log(err)
    })
})
</script>
<template>
  <NavBar />
  <RecentPill />
  <div class="container-fluid mt-2">
    <div class="row">
      <div class="col-md-1"></div>
      <div class="col-md-10">
        <div class="row my-3">
          <div v-for="quiz in created" :key="quiz.id" class="col-md-3 mt-4">
            <div class="card max">
              <div class="card-body">
                <div class="d-flex justify-content-between">
                  <h3 class="card-title text-center">{{ quiz.title }}</h3>
                </div>

                <h5 class="card-subtitle my-4 text-muted no-long-text">{{ quiz.description }}</h5>
                <div class="d-grid gap-2 mt-2">
                  <button
                    class="btn btn-primary px-4"
                    @click="
                      router.push({ name: 'recent-created-detail', params: { quiz_id: quiz.id } })
                    "
                  >
                    View Leaderboards
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
</template>

<style scoped>
@import url('@/assets/dashboard.css');
</style>
