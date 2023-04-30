<script setup lang="ts">
import axios from 'axios'
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/store/AuthStore'
import { ref } from 'vue'
const route = useRoute()
const store = useAuthStore()
onMounted(() => {
  axios
    .get(`quiz/feedback/${route.params.session}`, {
      headers: {
        Authorization: 'Bearer ' + store.token
      }
    })
    .then((res) => {
      console.log(res.data.payload.feedback)
    })
})
</script>

<template>
  <div class="test">meow</div>
</template>

<style>
.test {
  background-color: gray;
  height: 100vh;
}
</style>
