<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
import { useAuthStore } from '@/store/AuthStore'
import axios from 'axios'
import Swal from 'sweetalert2'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const store = useAuthStore()

const lists = ref<IJoined[]>([])

interface IJoined {
  quizID: number
  title: string
  QuizScore: number
  UserScore: number
}
onMounted(() => {
  axios
    .get('/history/joined', {
      headers: {
        Authorization: 'Bearer ' + store.token
      }
    })
    .then((res) => {
      lists.value = res.data.payload
      console.log(lists.value)
    })
})
</script>

<template>
  <div>
    <div v-for="list in lists" :key="list.quizID">
      <p>quizID: {{ list.quizID }}</p>
      <p>title: {{ list.title }}</p>
      <p>QuizScore: {{ list.QuizScore }}</p>
      <p>UserScore: {{ list.UserScore }}</p>
      <br />
    </div>
  </div>
</template>
