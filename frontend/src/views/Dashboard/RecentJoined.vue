<script setup lang="ts">
import NavBar from '@/components/NavBar.vue';
import RecentPill from '@/components/Dashboard/RecentPill.vue'

import { onMounted, ref } from 'vue'
import { useAuthStore } from '@/store/AuthStore'
import { useRouter } from 'vue-router'
import axios from 'axios';
const store = useAuthStore()
const router = useRouter()

const joined = ref();

onMounted(() => {
    axios
        .get('/history/joined', {
            headers: {
                Authorization: 'Bearer ' + store.token
            }
        })
        .then((res: any) => {
            // console.log(res.data.payload)
            // console.log(quizzes.value)
            joined.value = res.data.payload
        })
        .catch((err) => {
            // console.log(err)
        })
})

</script>
<template>
    <NavBar />
    <RecentPill />
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-1"></div>
            <div class="col-md-10">
                <div class="row mt-2">
                    <div v-for="j in joined" :key="j.quiz_id" class="col-md-3 mt-4">
                        <div class="card max">
                            <div class="card-body">
                                <div class="d-flex justify-content-between">
                                    <h3 class="card-title">{{ j.title }}</h3>
                                    <p>{{ j.user_score }} / {{ j.quiz_score }}</p>

                                </div>

                                <h5 class="card-subtitle text-muted">{{ j.description }}</h5>
                                <div class="d-grid gap-2 mt-2">
                                    <button class="btn btn-primary px-4" @click="router.push({name: 'recent-joined-detail', params:{quiz_id: j.quiz_id}})">
                                        View
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-1"></div>
        </div>
    </div>
</template>

<style scoped>
@import url('@/assets/dashboard.css');
</style>