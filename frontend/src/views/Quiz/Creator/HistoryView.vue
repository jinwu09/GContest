<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
import { useAuthStore } from '@/store/AuthStore'
import axios from 'axios'
import Swal from 'sweetalert2'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const store = useAuthStore()

const quizid: any = ref('')
const lists = ref<ICreator[]>([])

interface ICreator {
  Session: number
  totalScore: [
    {
      id: number
      first_name: string
      last_name: string
      score: number
    }
  ]
}
onMounted(() => {
  if (route.params.quizid != null) {
    quizid.value = `/${route.params.quizid}`
  }
  axios
    .get('/history/creator' + quizid.value, {
      headers: {
        Authorization: 'Bearer ' + store.token
      }
    })
    .then((res: any) => {
      lists.value = res.data.payload
      console.log(lists.value)
    })
})
</script>

<template>
  <div v-for="sets in lists" :key="sets.Session">
    <div>
      <p>Session: {{ sets.Session }}</p>
      <div v-for="set in sets.totalScore" :key="set.id">
        <p>id: {{ set.id }}</p>
        <p>name: {{ set.first_name }} {{ set.last_name }}</p>
        <p>score: {{ set.score }}</p>
      </div>
    </div>
    <br />
  </div>
</template>
