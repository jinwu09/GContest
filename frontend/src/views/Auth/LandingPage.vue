<script setup lang="ts">
import { useRouter } from 'vue-router'

// const router = useRouter();

// function navToLogin() {
//     router.push({ name: 'login' })
// }
</script>

<template>
  <!-- <div class="container-fluid backgroundimg">
    <div class="row">

        <div class="col-6 mt-4">
            <div class="d-flex justify-content-center my-5">
            <div class="btn btn-danger rounded mx-1">
                Login
            </div>
            <div class="btn btn-success rounded mx-1">
                Register
            </div>
        </div>
        <div class="row d-flex flex-column justify-content-center my-5">
                <div class="col text-center my-5">
                    <h1>QUIGER</h1>
                    <h4>Real Time Interactive Quiz Game</h4>
                </div>
                <div class="col">
                    <div class="d-flex justify-content-center">
                        <div class="quiz-code">
                            <input class="quiz-code-input" placeholder="Quiz Code" type="text" name="" id="">
                            <input class="qui-code-submit" type="submit" name="" id="">
                        </div>
                    </div>
                </div>
        </div>    
        </div>
        
        <div class="col-6">
            <div class="col">
                <img class="img-fluid sticky-md-bottom" src="src/assets/pic2.png" alt="">
            </div>
        </div>
    </div>
  </div> -->
</template>

<style scoped>
.backgroundimg {
  background-image: url(src/assets/landingpage.svg);
  background-repeat: no-repeat;
  height: 100vh;
  background-size: cover;
  background-position: center left;
}
.quiz-code{
    height: 95px;
    border: 1px solid #000;
    border-radius: 40px;
}
.img-design{

}
</style>
