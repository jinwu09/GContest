<script setup lang="ts">
import axios from 'axios'
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/store/AuthStore'
import { ref } from 'vue'
import NavBar from '@/components/NavBar.vue'

const route = useRoute()
const router = useRouter()
const store = useAuthStore()

const UserList: any = ref(
  [
  // {
  //   "first_name":"Albert John",
  //   "last_name":"Santos",
  //   "score": 100
  // },
  //   {
  //   "first_name":"Mark Thaddeus",
  //   "last_name":"Manuel",
  //   "score": 5
  // },
    
]
)
const TotalScore = ref(0)

TotalScore.value = 5

onMounted(() => {
  // axios
  //   .get(`quiz/leaderboard/${route.params.session}/${route.params.room}`, {
  //     headers: {
  //       Authorization: 'Bearer ' + store.token
  //     }
  //   })
  //   .then((res) => {
  //     UserList.value = res.data.payload.UsersScore
  //     TotalScore.value = res.data.payload.QuizTotal
  //   })

  UserList.value.sort((a:any,b:any)=> parseFloat(a.score) - parseFloat(b.price))
})
</script>

<template>
  <NavBar />
  <div class="container-fluid">
    <div class="row mt-2">
      <div class="col-md-1">

      </div>
      <div class="col-md-10">
        <h1 class="mt-2">Leaderboards:</h1>
        <div v-for="user in UserList" :key="user.id">
          <div class="line">
            <h5>{{ user.first_name }} {{ user.last_name }}</h5>
            <h5> {{ user.score }} / {{ TotalScore }}</h5>
          </div>
          
        </div>
      </div>
      <div class="col-md-1">

      </div>
    </div>
  </div>
  <!-- <div class="test">
    <h1>LeaderBoards</h1>
    <div v-for="user in UserList" :key="user.id">
      <p>{{ user.first_name }} {{ user.last_name }} {{ user.score }} / {{ TotalScore }}</p>
    </div>
  </div> -->
</template>

<style scoped>
  .line{
    border-top: 2px var(--main-color) solid;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 60px;
    padding: 2%;
  }

  .line:hover{
    background-color: var(--main-color);
    color: white;
    transform: scale(1.1);
    transition: 0.1s ease-in-out;
  }

  @media only screen and (max-width: 768px) {
    .line:hover{
      transform: unset;
    }
  }
</style>
