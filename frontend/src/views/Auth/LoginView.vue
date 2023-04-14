<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useAuthStore } from '@/store/AuthStore'

const router = useRouter()

const email = ref('')
const password = ref('')
const store = useAuthStore()

function login(e: any) {
  axios
    .post('/login', {
      email: email.value,
      password: password.value
    })
    .then((res) => {

      store.setTokenValue(res.data.token)
      Swal.fire({
        icon: 'success',
        text: res.data.message
      })

      router.push({ name: 'dashboard' })
    })
    .catch((err) => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.data.message
      })
    })
}

function navToRegister() {
  router.push({ name: 'register' })
}
</script>

<template>
  <div
    class="container-fluid page-background d-flex justify-content-center align-items-center align-contents-center pt-4"
  >
    <div class="background-animation skew1">
      <div class="moving-div-1"></div>
      <div class="moving-div-1"></div>
    </div>
    <div class="background-animation skew2">
      <div class="moving-div-2"></div>
      <div class="moving-div-2"></div>
    </div>

    <div class="col-lg-8 col-md-12">
      <div class="d-flex align-items-center justify-content-center vh-100 m-4">
        <div class="row">
          <div class="row">
            <h1 class="title text-center">Quiger</h1>
          </div>
          <form @submit.prevent="login">
            <div class="row">
              <div class="col-md-12">
                <input
                  v-model="email"
                  class="form-control form-control-lg"
                  type="email"
                  placeholder="Email"
                  aria-label=".form-control-lg example"
                  autocomplete="off"
                  required
                />
              </div>
            </div>
            <div class="row mt-3">
              <div class="col-md-12">
                <input
                  v-model="password"
                  class="form-control form-control-lg"
                  type="password"
                  placeholder="Password"
                  aria-label=".form-control-lg example"
                  autocomplete="off"
                  required
                />
              </div>
            </div>
            <div class="row mt-3">
              <div class="d-grid mx-auto">
                <button class="btn btn-primary btn-lg" type="submit">LOGIN</button>
              </div>
            </div>
            <div class="row mt-3">
              <p class="text-center accountSwitch">
                Dont have an account? <u class="accountSwitchLink" @click="navToRegister">REGISTER</u>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url(@/assets/login-register-forms.css);
.page-background {
  background-color: #f2edeb;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
  overflow: hidden;
}
.background-animation {
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
}
.skew1 {
  transform: skew(20deg);
}
.skew2 {
  transform: skew(-20deg);
}
.moving-div-1 {
  width: 80%;
  height: 100%;
  background-color: #ada7ff;
  position: absolute;
  animation: move 10s infinite alternate linear;
  opacity: 0.7;
}
.moving-div-1:nth-child(2) {
  width: 80%;
  height: 100%;
  background-color: #d481ff;
  animation-duration: 7s;
  opacity: 0.6;
}
.moving-div-2 {
  width: 80%;
  height: 100%;
  background-color: #9fa0ff;
  position: absolute;
  animation: move 8s infinite alternate linear;
  opacity: 0.5;
}
.moving-div-2:nth-child(2) {
  width: 80%;
  height: 100%;
  background-color: #e0c3fc;
  animation-duration: 6s;
  opacity: 0.4;
}
@keyframes move {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}
.title {
  font-family: var(--title-font);
  color: var(--main-color);
  font-size: clamp(1rem, 5vw + 4rem, 15rem);
}
.title span {
  animation: waviy 1s infinite;
  animation-delay: calc(0.1s * var(--i));
  position: relative;
  display: inline-block;
}
.title:hover {
  color: #fff;
  text-shadow: 0 0 5px #b27cc5, 0 0 25px #b27cc5, 0 0 50px #b27cc5, 0 0 100px #b27cc5;
}
.tag {
  font-size: clamp(0.5rem, 5vw + 1rem, 2rem);
}
.input {
  border: solid #653780 !important;
  border-radius: 5rem;
  border-width: 3px !important;
  background: none !important;
  bottom: 0.5px !important;
  box-shadow: none !important;
  text-align: center;
  margin-left: 2rem;
}
input,
input::placeholder {
  font: clamp(0.1rem, 5vw + 1rem, 1.3rem) sans-serif;
}
::-webkit-input-placeholder {
  text-align: center;
  font-size: 30px;
}
:-moz-placeholder {
  text-align: center;
  font-size: 30px;
}
.submit {
  border-radius: 5rem;
  border-color: #653780;
  background-color: #653780;
  color: white;
  min-height: 41px;
  padding: 0px 3rem;
  position: relative;
  left: -20%;
  font-size: 20px;
}
.hvr-glow {
  display: inline-block;
  vertical-align: middle;
  -webkit-transform: perspective(1px) translateZ(0);
  transform: perspective(1px) translateZ(0);
  box-shadow: 0 0 1px rgba(0, 0, 0, 0);
  -webkit-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -webkit-transition-property: box-shadow;
  transition-property: box-shadow;
}
.hvr-glow:hover,
.hvr-glow:focus,
.hvr-glow:active {
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.6);
}
.accountLogin {
  color: #c2549d !important;
  font-size: clamp(0.1rem, 5vw + 1rem, 1.2rem);
}
.accountLoginLink {
  position: relative;
  text-decoration: none;
  font-style: italic;
}
.accountLoginLink::before {
  content: '';
  position: absolute;
  width: 100%;
  height: 4px;
  border-radius: 4px;
  background-color: #c2549d !important;
  color: #c2549d !important;
  bottom: 0;
  left: 0;
  transform-origin: right;
  transform: scaleX(0);
  transition: transform 0.3s ease-in-out;
}

.accountLoginLink:hover::before {
  transform-origin: left;
  transform: scaleX(1);
}
.LandPagePic {
  position: relative;
  animation: picAnimate 0.5s infinite alternate linear;
  width: 65svh;
}
@keyframes picAnimate {
  0% {
    bottom: 0px;
    top: 10px;
  }
  100% {
    bottom: 10px;
    top: 0px;
  }
}
.hvr-bounce-in {
  display: inline-block;
  vertical-align: middle;
  -webkit-transform: perspective(1px) translateZ(0);
  transform: perspective(1px) translateZ(0);
  box-shadow: 0 0 1px rgba(0, 0, 0, 0);
  -webkit-transition-duration: 0.5s;
  transition-duration: 0.5s;
}
.hvr-bounce-in:hover,
.hvr-bounce-in:focus,
.hvr-bounce-in:active {
  -webkit-transform: scale(1.2);
  transform: scale(1.2);
  -webkit-transition-timing-function: cubic-bezier(0.47, 2.02, 0.31, -0.36);
  transition-timing-function: cubic-bezier(0.47, 2.02, 0.31, -0.36);
}
</style>
