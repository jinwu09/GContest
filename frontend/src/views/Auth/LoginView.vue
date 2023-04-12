<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

function navToRegister() {
  router.push({ name: 'register' })
}
</script>

<template>
  <div class="container-fluid">
    <div class="row site">
      <div class="col filler"></div>
      <div class="col-lg-8 col-md-12 white-background">
        <div class="d-flex align-items-center justify-content-center vh-100 m-4">
          <div class="row">
            <div class="row text text-center">
              <span class="display-5 title">
                <span style="--i: 1">Q</span>
                <span style="--i: 2">u</span>
                <span style="--i: 3">i</span>
                <span style="--i: 4">g</span>
                <span style="--i: 5">e</span>
                <span style="--i: 6">r</span>
              </span>
            </div>
            <form>
              <div class="row">
                <div class="col-md-12">
                  <input
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
                  Dont have an account? <u class="accountSwitch accountSwitchLink" @click="navToRegister">REGISTER</u>
                </p>
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
