<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
import { useAuthStore } from '@/store/AuthStore'
import axios from 'axios'
import { SwalDesign } from '@/assets/CustomSwal'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
// import Vue from "vue";
const route = useRoute()
const router = useRouter()

const store = useAuthStore()

const content = ref('')
const score = ref(0)

const choice_a = ref({
  id: '',
  content: '',
  isCorrect: ''
})

const choice_b = ref({
  id: '',
  content: '',
  isCorrect: ''
})

const choice_c = ref({
  id: '',

  content: '',
  isCorrect: ''
})

const choice_d = ref({
  id: '',
  content: '',
  isCorrect: true
})

function updateQuiz() {
  // console.log(route.params.question_id)
  axios
    .put(
      '/question/' + route.params.question_id,
      {
        content: content.value,
        score: score.value,
        choices: [
          {
            id: choice_a.value.id,
            content: choice_a.value.content,
            is_correct: choice_a.value.isCorrect
          },
          {
            id: choice_b.value.id,
            content: choice_b.value.content,
            is_correct: choice_b.value.isCorrect
          },
          {
            id: choice_c.value.id,
            content: choice_c.value.content,
            is_correct: choice_c.value.isCorrect
          },
          {
            id: choice_d.value.id,
            content: choice_d.value.content,
            is_correct: choice_d.value.isCorrect
          }
        ]
      },
      {
        headers: {
          Authorization: 'Bearer ' + store.token
        }
      }
    )
    .then((res) => {
      SwalDesign.fire({
        icon: 'success',
        title: res.data.message
      })

      router.push({ name: 'update-quiz', params: { quiz_id: route.params.quiz_id } })
    })
    .catch((err) => {
      console.log(err)
    })
}
function test() {
  console.log('test')
}
onMounted(() => {
  axios
    .get('/question/' + route.params.question_id, {
      headers: {
        Authorization: 'Bearer ' + store.token
      }
    })
    .then((res) => {
      console.log(res.data.payload)
      content.value = res.data.payload.content
      score.value = res.data.payload.score

      choice_a.value.id = res.data.payload.choice[0].id
      choice_a.value.content = res.data.payload.choice[0].content
      choice_a.value.isCorrect = res.data.payload.choice[0].is_correct

      choice_b.value.id = res.data.payload.choice[1].id
      choice_b.value.content = res.data.payload.choice[1].content
      choice_b.value.isCorrect = res.data.payload.choice[1].is_correct

      choice_c.value.id = res.data.payload.choice[2].id
      choice_c.value.content = res.data.payload.choice[2].content
      choice_c.value.isCorrect = res.data.payload.choice[2].is_correct

      choice_d.value.id = res.data.payload.choice[3].id
      choice_d.value.content = res.data.payload.choice[3].content
      choice_d.value.isCorrect = res.data.payload.choice[3].is_correct
    })
})
</script>

<template>
  <NavBar />
  <div class="container-fluid d-flex">
    <!-- first main column -->
    <div class="col-1"></div>

    <!-- second main column -->
    <div class="col-10">
      <!-- Top Space -->
      <div class="row topSpace"></div>
      <!-- second main column first row -->
      <div class="row my-3">
        <div class="col-3">
          <div class="btn-group w-100">
            <select
              class="form-select hvr-grow-rotate"
              aria-label="Default select example"
              v-model="score"
            >
              <option disabled value="" class="hvr-grow-rotate" selected>Select Quiz Points</option>
              <option>0</option>
              <option>5</option>
              <option>10</option>
              <option>15</option>
              <option>20</option>
            </select>
          </div>
        </div>
        <div class="col-3">
          <div class="w-100"></div>
        </div>
        <div class="col-3">
          <div
            class="w-100 btn btn-danger hvr-wobble-bottom"
            @click="router.push({ name: 'update-quiz', params: { quiz_id: route.params.quiz_id } })"
          >
            Cancel
          </div>
        </div>
        <div class="col-3">
          <div class="w-100 btn btn-success hvr-wobble-bottom" @click="updateQuiz">Update</div>
        </div>
      </div>

      <!-- second main column second row -->
      <div row="row mt-3">
        <div class="col-12">
          <textarea
            v-model="content"
            oninput='this.style.height = "";this.style.height = this.scrollHeight + "px"'
            class="rounded align-center text-center noBorder bigTextbox w-100 px-3 py-5"
            placeholder="Insert your Question here"
          ></textarea>
        </div>
      </div>

      <!-- second main column third row -->

      <div class="row">
        <div class="col-12 d-flex">
          <div class="w-25 p-2 questionBox1 rounded m-2">
            <label class="switch w-100 mb-3">
              <input type="checkbox" v-model="choice_a.isCorrect" />
              <span class="slider rounded"></span>
            </label>
            <textarea
              name="text"
              v-model="choice_a.content"
              oninput='this.style.height = "";this.style.height = this.scrollHeight + "px"'
              class="rounded text-center noBorder w-100 questionBoxColor1"
              placeholder="Insert answer"
            ></textarea>
          </div>
          <div class="w-25 p-2 questionBox2 rounded m-2">
            <label class="switch w-100 mb-3">
              <input type="checkbox" v-model="choice_b.isCorrect" />
              <span class="slider rounded"></span>
            </label>
            <textarea
              name="text"
              v-model="choice_b.content"
              oninput='this.style.height = "";this.style.height = this.scrollHeight + "px"'
              class="rounded text-center noBorder w-100 questionBoxColor2"
              placeholder="Insert answer"
            ></textarea>
          </div>
          <div class="w-25 p-2 questionBox3 rounded m-2">
            <label class="switch w-100 mb-3">
              <input type="checkbox" v-model="choice_c.isCorrect" />
              <span class="slider rounded"></span>
            </label>
            <textarea
              name="text"
              v-model="choice_c.content"
              oninput='this.style.height = "";this.style.height = this.scrollHeight + "px"'
              class="rounded text-center noBorder w-100 questionBoxColor3"
              placeholder="Insert answer"
            ></textarea>
          </div>
          <div class="w-25 p-2 questionBox4 rounded m-2">
            
            <label class="switch w-100 mb-3">
              
              <input type="checkbox" v-model="choice_d.isCorrect" />
              <span class="slider rounded"></span>
            </label>
            <textarea
              name="text"
              v-model="choice_d.content"
              oninput='this.style.height = "";this.style.height = this.scrollHeight + "px"'
              class="rounded text-center questionBoxColor4 noBorder w-100"
              placeholder="Insert answer"
            ></textarea>
          </div>
        </div>
      </div>
    </div>

    <!-- third main column -->
    <div class="col-1"></div>
  </div>
</template>

<style scoped>
.topSpace {
  margin: 2% !important;
}

/* Dropdown */
.hvr-grow-rotate {
  display: inline-block;
  vertical-align: middle;
  -webkit-transform: perspective(1px) translateZ(0);
  transform: perspective(1px) translateZ(0);
  box-shadow: 0 0 1px rgba(0, 0, 0, 0);
  -webkit-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -webkit-transition-property: transform;
  transition-property: transform;
}

.hvr-grow-rotate:hover,
.hvr-grow-rotate:focus,
.hvr-grow-rotate:active {
  -webkit-transform: scale(1.1) rotate(4deg);
  transform: scale(1.1) rotate(4deg);
  background-color: blue;
  color: white;
  border-radius: 10px;
}

textarea {
  color: white;
}

@-webkit-keyframes hvr-pulse-grow {
  to {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
}

@keyframes hvr-pulse-grow {
  to {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
}

/* Cancel and Save */
@-webkit-keyframes hvr-wobble-bottom {
  16.65% {
    -webkit-transform: skew(-12deg);
    transform: skew(-12deg);
  }

  33.3% {
    -webkit-transform: skew(10deg);
    transform: skew(10deg);
  }

  49.95% {
    -webkit-transform: skew(-6deg);
    transform: skew(-6deg);
  }

  66.6% {
    -webkit-transform: skew(4deg);
    transform: skew(4deg);
  }

  83.25% {
    -webkit-transform: skew(-2deg);
    transform: skew(-2deg);
  }

  100% {
    -webkit-transform: skew(0);
    transform: skew(0);
  }
}

@keyframes hvr-wobble-bottom {
  16.65% {
    -webkit-transform: skew(-12deg);
    transform: skew(-12deg);
  }

  33.3% {
    -webkit-transform: skew(10deg);
    transform: skew(10deg);
  }

  49.95% {
    -webkit-transform: skew(-6deg);
    transform: skew(-6deg);
  }

  66.6% {
    -webkit-transform: skew(4deg);
    transform: skew(4deg);
  }

  83.25% {
    -webkit-transform: skew(-2deg);
    transform: skew(-2deg);
  }

  100% {
    -webkit-transform: skew(0);
    transform: skew(0);
  }
}

.hvr-wobble-bottom {
  display: inline-block;
  vertical-align: middle;
  -webkit-transform: perspective(1px) translateZ(0);
  transform: perspective(1px) translateZ(0);
  box-shadow: 0 0 1px rgba(0, 0, 0, 0);
  -webkit-transform-origin: 100% 0;
  transform-origin: 100% 0;
}

.hvr-wobble-bottom:hover,
.hvr-wobble-bottom:focus,
.hvr-wobble-bottom:active {
  -webkit-animation-name: hvr-wobble-bottom;
  animation-name: hvr-wobble-bottom;
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-timing-function: ease-in-out;
  animation-timing-function: ease-in-out;
  -webkit-animation-iteration-count: 1;
  animation-iteration-count: 1;
}

.noBorder {
  border: none !important;
  outline: none !important;
  border-style: none !important;
  border-color: Transparent !important;
  background-color: var(--main-color) !important;
}

::placeholder {
  text-align: center !important;
  color: rgb(199, 198, 198) !important;
}

.bigTextbox {
  font-size: 30px !important;
  color: white !important;
  /* background-color: #dfdcdc !important; */
  border: 2px solid black;
}

.questionBox1 {
  font-size: 20px !important;
  background-color: #7e549e !important;
  color: white !important;
}

.questionBox2 {
  font-size: 20px !important;
  background-color: #c2549d !important;
  color: white !important;
}

.questionBox3 {
  font-size: 20px !important;
  background-color: #fc8370 !important;
  color: white !important;
}

.questionBox4 {
  font-size: 20px !important;
  background-color: #fecb3e !important;
  color: white !important;
}

.questionBoxColor1 {
  background-color: #7e549e !important;
}

.questionBoxColor2 {
  background-color: #c2549d !important;
}

.questionBoxColor3 {
  background-color: #fc8370 !important;
}

.questionBoxColor4 {
  background-color: #fecb3e !important;
}

.bt1 {
  padding: 10px !important;
  margin: 10x !important;
}

.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: red;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  color: white;
  height: 26px;
  width: 100px;
  left: 80px;
  bottom: 4px;
  background-color: None;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  content: 'Correct';
  background-color: green !important;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

.slider:hover {
  color: #fdec6e;
  text-shadow: 0px 0px 30px #fdec6e;
  -moz-transition: all 0.2s ease-in;
  -o-transition: all 0.2s ease-in;
  -webkit-transition: all 0.2s ease-in;
  transition: all 0.2s ease-in;
}
</style>
