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
    })
})

function toCSV() {
  let headers = ["Name", "Score", "Total Score"]
  const seperator = ','

  const csv = [headers.join(seperator),
  ...feedback.value.map((row: any) => headers.map((field: any) => {
    if (field == 'Name') {
      return `${row.first_name + ' ' + row.last_name}`
    } else if (field == 'Score') {
      return `${row.score}`
    } else if (field == 'Total Score') {
      return `${quiz.value.totalScore}`
    }
  }).join(seperator))
  ]

  let csvContent = "data:text/csv;charset=utf-8,"
    + csv.join("\n");
  var encodedUri = encodeURI(csvContent);
  window.open(encodedUri);

}
</script>

<template>
  <NavBar />
  <div class="container-fluid">
    <div class="row mt-2">
      <div class="col-md-1"></div>
      <div class="col-md-10">
        <div class="d-flex justify-content-between align-items-center">
          <h3 class="mt-2">Leaderboards:</h3>
          <div class="clickable " @click="toCSV"><h5><span>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-file-earmark-arrow-down-fill" viewBox="0 0 16 16">
  <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zm-1 4v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 0 1 .708-.708L7.5 11.293V7.5a.5.5 0 0 1 1 0z"/>
</svg>
          </span> Download</h5></div>
          <!-- <button >albert</button> -->

        </div>
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

.clickable{
  cursor: pointer;
}

.clickable:hover{
  cursor: pointer;
  color: var(--main-color);
  border: 1 solid var(--main-color);
}


@media only screen and (max-width: 768px) {
  .line:hover {
    transform: unset;
  }
}
</style>
