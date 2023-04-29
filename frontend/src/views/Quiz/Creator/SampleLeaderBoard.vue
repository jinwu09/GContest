<script setup lang="ts">
import axios from 'axios'
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/store/AuthStore'
import { ref } from 'vue'

const route = useRoute()
const router = useRouter()
const store = useAuthStore()

const UserList: any = ref({})
const TotalScore = ref(0)

onMounted(() => {
  axios
    .get(`quiz/leaderboard/${route.params.session}/${route.params.room}`, {
      headers: {
        Authorization: 'Bearer ' + store.token
      }
    })
    .then((res) => {
      UserList.value = res.data.payload.UsersScore
      TotalScore.value = res.data.payload.QuizTotal
    })
})
</script>

<template>
  <div class="test">
    <h1>LeaderBoards</h1>
    <div v-for="user in UserList" :key="user.id">
      <p>{{ user.first_name }} {{ user.last_name }} {{ user.score }} / {{ TotalScore }}</p>
    </div>
  </div>
</template>

<style>
.test {
  background-color: gray;
  height: 100vh;
}
</style>
