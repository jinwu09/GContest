<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'

// const addUser = document.querySelector(".col");

// addUser.addEventListener("addUser");

// function addUser(){
//     const newDiv = document.createElement("div");
// }
</script>

<template>
  <NavBar />
  <main>
    <div class="mt-2">
      <div class="container-fluid">
        <div class="row my-5">

            <div class="col-1"></div>

            <div class="col-10">
              <div class="row">
                <label class="text-left text-uppercase font-weight-bold h1">In Lobby:</label>
              </div>

              <div class="row my-3">

                <div class="row gx-5">

                  <div class="col">
                    dynamic? 1
                  </div>

                  <div class="col">
                    dynamic? 2
                  </div>

                  <div class="col">
                    dynamic? 3
                  </div>

                  <div class="col">
                    dynamic? 4
                  </div>

                </div>

              </div>

            </div>

            <div class="col-1"></div>
          </div>

      </div>
    </div>
  </main>
</template>

<style scoped></style>
