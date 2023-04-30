<script setup lang="ts">
import axios from 'axios'
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/store/AuthStore'
import { ref } from 'vue'
import { checkCompatEnabled } from '@vue/compiler-core'
const route = useRoute()
const store = useAuthStore()

interface tFeedbacks {
  title: string
  question: [
    {
      id: number
      content: string
      score: number
      quizId: number
      choice: [
        {
          id: number
          content: string
          is_correct: boolean
          questionId: number
        }
      ]
      answer: [
        {
          id: number
          choice: {
            id: number
            content: string
            is_correct: boolean
          }
        }
      ]
    }
  ]
}
const feedback = ref<tFeedbacks>()

onMounted(() => {
  axios
    .get(`quiz/feedback/${route.params.session}`, {
      headers: {
        Authorization: 'Bearer ' + store.token
      }
    })
    .then((res) => {
      console.log(res.data.payload.feedback)
      feedback.value = res.data.payload.feedback
    })
})
</script>

<template>
  <div class="test">
    <h1>quiz name {{ feedback?.title }}</h1>
    <div v-for="item in feedback?.question" :key="item.id">
      <h1>question: {{ item.content }}</h1>
      <h2>score: {{ item.score }}</h2>
      <h3>Choices:</h3>
      <div v-for="choice in item.choice" :key="choice.id">
        <h4>{{ choice.content }}</h4>
        <h5>{{ choice.is_correct }}</h5>
      </div>
      <div v-for="answer in item.answer" :key="answer.id">
        <h1>Answer</h1>
        {{ answer.choice.content }} is {{ answer.choice.is_correct }}
      </div>
    </div>
  </div>
</template>

<style>
.test {
  background-color: gray;
  height: 100vh;
}
</style>
