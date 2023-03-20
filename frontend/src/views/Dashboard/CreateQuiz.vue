<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
</script>

<template>
  <NavBar />
  <div class="mt-1">
    <div class="container-fluid">
      <div class="row">
        <div></div>
        <div class="col-lg-7">
          <div class="col-lg-9 p-2 m-5 outer_box">
            <div class="col-md-12 px-3">
              <div class="row d-flex justify-content-around">

                <!-- question number -->
                <div class="col-10">
                  <textarea
                  class="col-lg-12 border rounded title w-100"
                  placeholder="Question No."
                ></textarea>
                </div>

                <!-- delete button -->
                <div class="col-2 py-2 ">
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

              <!-- input question textarea -->
              <div class="row d-flex justify-content-center">
                <textarea
                  class="col-lg-12 border rounded m-1 pt-3 pb-5 questions"
                  placeholder="Input Question Here.."
                ></textarea>
              </div>

              <div class="row d-flex justify-content-between">
                <!-- choice 1 -->
                <div class="col-6 py-2 choices">
                  <div class="form-check w-50">
                    <input class="form-check-input my-3" type="radio" name="flexRadioDefault" id="flexRadioDefault1">
                    <textarea class="textarea w-100 h-100 choice1" id="exampleFormControlTextarea1" placeholder="choice 1" rows="1"></textarea>
                  </div>
                </div>
                <!-- choice 2 -->
                <div class="col-6 py-2 choices">
                  <div class="form-check w-50">
                    <input class="form-check-input my-3" type="radio" name="flexRadioDefault" id="flexRadioDefault1">
                    <textarea class="textarea w-100 h-100 choice1" id="exampleFormControlTextarea1" placeholder="choice 2" rows="1"></textarea>
                  </div>
                </div>
              </div>

              <div class="row my-1">
                <!-- choice 3 -->
                <div class="col-6 py-2 choices">
                  <div class="form-check w-50">
                    <input class="form-check-input my-3" type="radio" name="flexRadioDefault" id="flexRadioDefault1">
                    <textarea class="textarea w-100 h-100 choice1" id="exampleFormControlTextarea1" placeholder="choice 3" rows="1"></textarea>
                  </div>
                </div>
                <!-- choice 4 -->
                <div class="col-6 py-2 choices">
                  <div class="form-check w-50">
                    <input class="form-check-input my-3" type="radio" name="flexRadioDefault" id="flexRadioDefault1">
                    <textarea class="textarea w-100 h-100 choice1" id="exampleFormControlTextarea1" placeholder="choice 4" rows="1"></textarea>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

        <div class="col-lg-5">
            <!-- second collumn form -->
            <div class="border gx-5 gy-2 mt-5 d-flex align-items-stretch">
              <div class="col-12">
                <form class="p-3">
                <div class="form-group">
                  <label for="formGroup1">Title</label>
                  <input type="text" class="form-control" id="formGroupExampleInput">
                </div>
                <div class="form-group">
                  <label for="formGroup2">Room Number</label>
                  <input type="text" class="form-control" id="formGroupExampleInput2">
                </div>
                <div class="form-group">
                  <label for="formGroup2">Status</label>
                  <input type="text" class="form-control" id="formGroupExampleInput2">
                </div>
                <div class="form-group">
                  <label for="formGroup2">Room Password</label>
                  <input type="text" class="form-control" id="formGroupExampleInput2">
                </div>
                <div class="d-flex justify-content-around">
                  <button class="btn btn-success pt-2 mt-2 mx-1 w-50" type="submit">Update Quiz</button>
                  <button class="btn btn-danger pt-2 mt-2 mx-1 w-50" type="submit">Delete Quiz</button>
                </div>
              </form>
              </div>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.delete {
  border: none !important;
  cursor: pointer !important;
  appearance: none !important;
  background-color: inherit !important;
  transition: transform 0.7s ease-in-out !important;
}
.delete:hover {
  transform: rotate(360deg) !important;
}
.outer_box {
  background-color: #3c2a2f;
  border-radius: 25px !important;
}
.title {
  background-color: #ffffff;
  border-radius: 10px !important;
  padding-top: 25px;
}
.radio1 {
  background-color: #ffffff;
  border-radius: 10px !important;
}
.radio2 {
  background-color: #ffffff;
  border-radius: 10px !important;
}
.radio3 {
  background-color: #ffffff;
  border-radius: 10px !important;
}
.radio4 {
  background-color: #ffffff;
  border-radius: 10px !important;
}
.questions {
  background-color: #ffffff;
  border-radius: 10px !important;
}
.choices {
  background-color: #ffffff !important;
  border-radius: 10px !important;
}
.textarea{
  resize: none !important;
  box-sizing: border-box !important;
  border-radius: 10px !important;
  border: none !important;
}
.choice1{
  padding-top: 13px;
}
</style>
