<script setup lang="ts">
import NavBar from '@/components/NavBar.vue';
import LobbyJoiner from '@/components/Joiner/LobbyJoiner.vue'
import { onBeforeUnmount, onMounted, ref } from 'vue';
import Echo from 'laravel-echo';
import { useRoute } from 'vue-router';
import axios from 'axios';
import { useAuthStore } from '@/store/AuthStore';
import Swal from 'sweetalert2';

const route = useRoute()
const store = useAuthStore()

const joiners: any = [
    // {   
    //     'id': 0,
    //     'username': 'Albert'
    // },
    // {
    //     'id': 1,
    //     'username': 'Oten'
    // },
]

const join_id = ref()

window.Echo.join(`quiz.${route.params.quiz_id}`)
    .listen('QuizJoinAsParticipant', (e: any) => {
        console.log(e.message)
    })

    window.addEventListener('beforeunload', function (e) {
  // Cancel the event
  e.preventDefault(); // If you prevent default behavior in Mozilla Firefox prompt will always be shown
  // Chrome requires returnValue to be set
  e.returnValue = '';
});

onMounted(() => {
    axios.post('/joiner/', {
        quizId: route.params.quiz_id
    }, {
        headers: {
            Authorization: 'Bearer ' + store.token
        }
    }).then((res) => {
        join_id.value = res.data.joinId
        Swal.fire(
            {
                title:res.data.message
            }
        )
    })
})

onBeforeUnmount(() => {
    axios.delete('/joiner/' + join_id.value,
        {
            headers: {
                Authorization: 'Bearer ' + store.token
            }
        }
    ).then((res) => {
    })
})

</script>

<template>
    <NavBar />
    <div class="mt-2">
        <div class="container-fluid">
            <div class="row">
                <div class="col-lg-1"></div>
                <div class="col-lg-10">
                    <div class="row">
                        <h1>In Lobby:</h1>
                    </div>
                    <div class="row">
                        <div v-for="user in joiners" :key="user.id" class="col-md-3 pt-2">
                            <LobbyJoiner :id="user.id" :username="user.username" />
                        </div>
                    </div>
                </div>
                <div class="col-lg-1"></div>

            </div>
        </div>
    </div>
</template>

<style scoped></style>