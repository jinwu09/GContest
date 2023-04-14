<script setup lang="ts">



import NavBar from '@/components/NavBar.vue';
import LobbyJoiner from '@/components/Joiner/LobbyJoiner.vue'
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useAuthStore } from '@/store/AuthStore';

import Echo from 'laravel-echo';
import axios from 'axios';

import Pusher from 'pusher-js';

const route = useRoute()
const store = useAuthStore()
const quiz_id = ref()

const joiners: any = ref([])

window.Pusher = Pusher;

// const socketId = window.Echo.socketId();

window.Echo = new Echo({
    broadcaster: 'pusher',
    key: 'local',
    cluster: 'eu',
    wsHost: '127.0.0.1',
    wsPort: '6001',
    // wssPort: import.meta.env.VITE_PUSHER_PORT ?? 443,
    forceTLS: false,
    disableStats: true,
    authEndpoint: 'http://127.0.0.1:8000/api/broadcasting/auth',
    auth: {
        headers: {
            Authorization: 'Bearer ' + store.token
        }
    },
    authorizer: (channel: any, options: any) => {
        return {
            authorize: (socketId: any, callback: any) => {
                axios.post('broadcasting/auth', {
                    socket_id: socketId,
                    channel_name: channel.name,
                }, {
                    headers: {
                        Authorization: 'Bearer ' + store.token
                    }
                })
                    .then(response => {
                        callback(null, response.data);
                    })
                    .catch(error => {
                        callback(error);
                    });
            }
        };
    },
    encrypted: true,
    enabledTransports: ['ws', 'wss'],
});



window.Echo.join(`quiz.${route.params.quiz_id}`)
    .here((users: any) => {
        console.log(users)
    })

onMounted(() => {
    quiz_id.value = route.params.quiz_id

    axios.post('/lobby/join/' + route.params.quiz_id, null, {
        headers: {
            Authorization: 'Bearer ' + store.token
        }
    }).then((res) => {

    })
})

onBeforeUnmount(() => {
    window.Echo.leaveChannel(`quiz.${quiz_id.value}`)
    axios.post('/lobby/leave/' + quiz_id.value, null,
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
                            <LobbyJoiner :id="user.id" :username="user.firstName + user.lastName" />
                        </div>
                    </div>
                </div>
                <div class="col-lg-1"></div>

            </div>
        </div>
    </div>
</template>

<style scoped></style>