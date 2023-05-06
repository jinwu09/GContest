<script setup lang="ts">
import axios from 'axios'
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/store/AuthStore'
import { ref } from 'vue'
import { checkCompatEnabled } from '@vue/compiler-core'
import NavBar from '@/components/NavBar.vue'
const route = useRoute()
const store = useAuthStore()

interface IFeedbacks {
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
const feedback = ref<IFeedbacks>()

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
  <NavBar />
  <div class="mt-4">
    <div class="container-fluid">
      <div class="row">
        <h1 class="text-center">{{ feedback?.title }}</h1>
      </div>
      <div v-for="item in feedback?.question" :key="item.id" class="bounder my-1">
        <div class="row pt-3">
          <div class="container-fluid p-4">
            <div>
              Question: {{ item.content }}
            </div>
          </div>
        </div>
        <div class="row">
          <div class="container-fluid">
            <div>
              <hr />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="container-fluid">
            <div class="row">
              <p>Choices:</p>
              <div v-for="choice in item.choice" :key="choice.id" class="col-md-6">
                <p :class="choice.is_correct ? 'text-center green' : 'text-center red'">{{ choice.content }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="container-fluid">
            <div>
              <hr />
            </div>
          </div>
        </div>
        <div class="row">
          <div v-for="answer in item.answer" :key="answer.id">
            <p :class="answer.choice.is_correct ? 'green':'red'">Your Answer {{ answer.choice.content }} is {{ answer.choice.is_correct ? "Right" : "Wrong"}}</p>
          </div>
        </div>
        <!-- <div class="row">
          <div class="col-md-10">
            <h3>{{ item.content }}</h3>
          </div>
        </div> -->

        <!-- <h3>Choices:</h3>
        <div v-for="choice in item.choice" :key="choice.id">
          <h4>{{ choice.content }}</h4>
          <h5>{{ choice.is_correct }}</h5>
        </div>
        <div v-for="answer in item.answer" :key="answer.id">
          <h1>Answer</h1>
          {{ answer.choice.content }} is {{ answer.choice.is_correct }}
        </div> -->
      </div>
    </div>
  </div>

  <!-- <h1>quiz name {{ feedback?.title }}</h1>
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
    </div> -->
</template>

<style scoped>
.green {
  color: green;
}

.red {
  color: red;
}

.bounder{
  border: 3px solid var(--main-color);
  padding: 25px;
}
</style>
