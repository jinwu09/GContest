<script setup lang="ts">
import NavBar from '@/components/NavBar.vue';

import { onMounted, ref } from 'vue'
import { useAuthStore } from '@/store/AuthStore'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios';
const store = useAuthStore()
const router = useRouter()
const route = useRoute()

const feedback = ref({} as any);

onMounted(() => {
    axios
        .get('/history/joined/' + route.params.quiz_id, {
            headers: {
                Authorization: 'Bearer ' + store.token
            }
        })
        .then((res: any) => {

            // console.log(quizzes.value)
            feedback.value = res.data.payload[0]
            console.log(feedback.value)
        })
        .catch((err) => {
            // console.log(err)
        })
})
</script>

<template>
    <NavBar />
    <div class="mt-4">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-1"></div>
                <div class="col-md-10">
                    <div class="row">
                        <div class="d-flex justify-content-between">
                            <h1 class="text-center">{{ feedback.title }}</h1>
                            <router-link :to="{ name: 'recent-joined' }"><span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor"
                                        class="bi bi-arrow-left-square-fill" viewBox="0 0 16 16">
                                        <path
                                            d="M16 14a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12zm-4.5-6.5H5.707l2.147-2.146a.5.5 0 1 0-.708-.708l-3 3a.5.5 0 0 0 0 .708l3 3a.5.5 0 0 0 .708-.708L5.707 8.5H11.5a.5.5 0 0 0 0-1z" />
                                    </svg>
                                </span></router-link>
                        </div>
                    </div>
                    <div v-for="item in feedback.question" :key="item.id" class="bounder my-1">
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
                                        <p :class="choice.is_correct ? 'text-center green' : 'text-center red'">{{
                                            choice.content }}
                                        </p>
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
                                <p :class="answer.choice.is_correct ? 'green' : 'red'">Your Answer {{ answer.choice.content
                                }} is {{
    answer.choice.is_correct ? "Right" : "Wrong" }}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-1"></div>
            </div>

        </div>
    </div>
</template>

<style scoped>
.green {
    color: green;
}

.red {
    color: red;
}

.bounder {
    border: 3px solid var(--main-color);
    padding: 25px;
}
</style>