<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()

function navToLogin() {
  router.push({ name: 'login' })
}
</script>

<template>
  <div
    class="container-fluid page-background d-flex justify-content-center align-items-center align-contents-center pt-4"
  >
    <div class="row align-items-center mt-5 pt-5">
      <div class="background-animation skew1">
        <div class="moving-div-1"></div>
        <div class="moving-div-1"></div>
      </div>
      <div class="background-animation skew2">
        <div class="moving-div-2"></div>
        <div class="moving-div-2"></div>
      </div>
      <div class="col-lg-6">
        <div class="row text text-center d-flex justify-content-center align-items-center">
          <span class="display-5 title">
            <span style="--i: 1">Q</span>
            <span style="--i: 2">u</span>
            <span style="--i: 3">i</span>
            <span style="--i: 4">g</span>
            <span style="--i: 5">e</span>
            <span style="--i: 6">r</span>
          </span>
        </div>
        <div class="row text-center justify-content-center tag">
          A Real-time Interactive Quiz Game
        </div>
        <div class="row text text-center mt-5">
          <div class="input-group mb-3">
            <input
              type="text"
              class="form-control input"
              placeholder="Quiz Code"
              aria-label="Quiz Code"
              aria-describedby="Quiz Code"
            />
            <div class="input-group-append">
              <button class="submit hvr-glow" type="button">Enter</button>
            </div>
          </div>
          <!-- <input class="text input" placeholder="Quiz Code" />
            <button class="submit hvr-glow" type="submit">Submit</button> -->
        </div>
        <div class="row">
          <div class="text text-center accountLogin mb-5">
            Have An Account?<u @click="navToLogin" class="btn accountLogin accountLoginLink"
              >LOGIN</u
            >
          </div>
        </div>
      </div>
      <div class="col-lg-6">
        <div class="text-center">
          <div class="text-center">
            <img
              src="src/assets/pic.png"
              class="img-fluid LandPagePic hvr-bounce-in"
              alt="resposive image"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
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
  font-size: clamp(1rem, 5vw + 5rem, 15rem);
}
.title span {
  animation: waviy 1s infinite;
  animation-delay: calc(0.1s * var(--i));
  position: relative;
  display: inline-block;
}
.title:hover {
  color: #fff;
  text-shadow: 0 0 5px #B27CC5,
              0 0 25px #B27CC5,
              0 0 50px #B27CC5,
              0 0 100px #B27CC5;
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
