<script setup lang="ts">
import axios from 'axios'
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/store/AuthStore'
import { ref } from 'vue'
import NavBar from '@/components/NavBar.vue'
const route = useRoute()
const store = useAuthStore()

const feedback: any = ref([
  // {"id":5,"first_name":"Albert John","last_name":"Santos","score":0}
])
const quiz: any = ref()
// {"id":1,"title":"asdas","description":"asdasda","totalScore":20}

onMounted(async () => {
  await axios
    .get(`history/created/${route.params.quiz_id}`, {
      headers: {
        Authorization: 'Bearer ' + store.token
      }
    })
    .then((res) => {
      feedback.value = res.data.payload.list
      quiz.value = res.data.payload
      // console.log(res.data.payload)
    })
})
</script>

<template>
  <NavBar />
  <div class="container-fluid">
    <div class="row mt-2">
      <div class="col-md-1"></div>
      <div class="col-md-10">
        <div class="row mt-2">
          <h1>Title: {{ quiz?.title }}</h1>
          <h3>Description: {{ quiz?.description }}</h3>
        </div>
        <h4 class="mt-2">Leaderboards:</h4>
        <div v-for="user in feedback" :key="user.id">
          <div class="line">
            <h5>{{ user?.first_name }} {{ user?.last_name }}</h5>
            <h5>{{ user?.score }} / {{ quiz?.totalScore }}</h5>
          </div>
        </div>
      </div>
      <div class="col-md-1"></div>
    </div>
  </div>
</template>

<style scoped>
.line {
  border-top: 2px var(--main-color) solid;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  padding: 2%;
}

.line:hover {
  background-color: var(--main-color);
  color: white;
  transform: scale(1.1);
  transition: 0.1s ease-in-out;
}

@media only screen and (max-width: 768px) {
  .line:hover {
    transform: unset;
  }
}
</style>
