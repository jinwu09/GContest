<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import Swal from 'sweetalert2'
import {useAuthStore} from '@/store/AuthStore'


const router = useRouter();

const email = ref('')
const password = ref('')
const store = useAuthStore()


function login(e: any) {
    axios.post('/login', {
        email: email.value,
        password: password.value
    }).then((res) => {
        store.setTokenValue(res.data.token)
        Swal.fire({
            icon: 'success',
            text: res.data.message,
        })

        router.push({ name: 'dashboard' })
    }).catch((err) => {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.response.data.message,
        })
    })
}

function navToRegister() {
    router.push({ name: 'register' })
}
</script>

<template>
    <div class="container-fluid">
        <div class="row site">
            <div class="col filler">

            </div>
            <div class="col-lg-8 col-md-12 white-background ">
                <div class="d-flex align-items-center justify-content-center vh-100 m-4">
                    <div class="row">
                        <div class="row">
                            <h1 class="title text-center">Quiger</h1>
                        </div>
                        <form @submit.prevent="login">
                            <div class="row">

                                <div class="col-md-12">
                                    <input v-model="email" class="form-control form-control-lg" type="email"
                                        placeholder="Email" aria-label=".form-control-lg example" autocomplete="off"
                                        required>

                                </div>
                            </div>
                            <div class="row mt-3">
                                <div class="col-md-12">
                                    <input v-model="password" class="form-control form-control-lg" type="password"
                                        placeholder="Password" aria-label=".form-control-lg example" autocomplete="off"
                                        required>

                                </div>
                            </div>
                            <div class="row mt-3">
                                <div class="d-grid mx-auto">
                                    <button class="btn btn-primary btn-lg" type="submit">LOGIN</button>
                                </div>
                            </div>
                            <div class="row mt-3">
                                <p class="text-center">Dont have an account? <u @click="navToRegister">REGISTER</u></p>
                            </div>
                        </form>
                    </div>




                </div>

            </div>
        </div>
    </div>
</template>

<style scoped>
@import url(@/assets/login-register-forms.css);
</style>