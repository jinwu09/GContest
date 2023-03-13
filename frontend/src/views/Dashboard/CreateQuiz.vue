<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
</script>

<template>
  <NavBar />
  <div class="mt-1">
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-8">
          <div class="col-lg-9 p-2 m-5 outer_box">
            <div class="row d-flex justify-content-center">
              <div class="col-lg-10 m-2 p-2 title">Title Here</div>
              <div class="col-lg-1 mt-2">
                <button class="delete" type="submit">
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      fill="currentColor"
                      class="bi bi-trash-fill"
                      viewBox="0 0 16 16"
                      color = "white"
                    >
                      <path
                        d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"
                      />
                    </svg>
                  </span>
                </button>
              </div>
            </div>
            <div class="row d-flex justify-content-center">
              <textarea class="col-lg-11 border rounded m-1 pt-3 pb-5 questions" placeholder="Input Question Here.."></textarea>
            </div>
            <div class="row d-flex justify-content-center">
              <textarea class="col-lg-6 m-1 p-1 radio1" placeholder=" Choice 1"></textarea>
              <div class="col-lg-5 border rounded m-1 p-2 radio2">
                <input
                  class="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault1"

                />
                <textarea label class="form-check-label p-1 choice2" for="flexRadioDefault1" placeholder="Choice 2"></textarea>
              </div>
            </div>
            <div class="row d-flex justify-content-center">
              <div class="col-lg-5 border rounded m-1 p-2 radio3">
                <input
                  class="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault1"
                />
                <textarea label class="form-check-label p-1 choice3" for="flexRadioDefault1" placeholder="Choice 3"></textarea>
              </div>
              <div class="col-lg-5 border rounded m-1 p-2 radio4">
                <input
                  class="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault1"
                
                />
                <textarea label class="form-check-label p-1 choice4" for="flexRadioDefault1" placeholder="Choice 4"></textarea>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="border gx-3 gy-1 mt-3 d-flex align-items-stretch">1</div>
        </div>
        
      </div>
    </div>
  </div>
</template>
<style scoped>
.delete {
  border: none;
  cursor: pointer;
  appearance: none;
  background-color: inherit;
  transition: transform 0.7s ease-in-out;
}
.delete:hover {
  transform: rotate(360deg);
}
.outer_box{
  background-color: #3C2A2F;
  border-radius: 25px !important
}
.title{
  background-color: #FFFFFF;
  border-radius: 10px !important
}
.radio1{
  background-color: #FFFFFF;
  border-radius: 10px !important
}
.radio2{
  background-color: #FFFFFF;
  border-radius: 10px !important
}
.radio3{
  background-color: #FFFFFF;
  border-radius: 10px !important
}
.radio4{
  background-color: #FFFFFF;
  border-radius: 10px !important
}
.questions{
  background-color: #FFFFFF;
  border-radius: 10px !important
}
.choice1{
  border: none;
}
.choice2{
  border: none;
}
.choice3{
  border: none;
}
.choice4{
  border: none;
}
</style>
