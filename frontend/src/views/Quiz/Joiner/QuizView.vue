<script setup lang="ts">
import { ref } from 'vue'
import { socket } from '@/Socket/SocketConfig'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()

const has_submitted = ref(true)
const Choies: any = ref([])
const QuestionID: any = ref(0)
socket.emit('QuizLoad', { Roomname: route.params.room })

socket.on('QuizLoad', (res) => {
  has_submitted.value = res.has_submitted
  Choies.value = res.question.choice
  QuestionID.value = res.question.id
})
socket.on('refresh', () => {
  //   console.log('refreshing')
  socket.emit('QuizLoad', { Roomname: route.params.Room })
})
const motivational_quotes = [
  '“We cannot solve problems with the kind of thinking we employed when we came up with them.” — Albert Einstein',
  '“Learn as if you will live forever, live like you will die tomorrow.” — Mahatma Gandhi',
  '“Stay away from those people who try to disparage your ambitions. Small minds will always do that, but great minds will give you a feeling that you can become great too.” — Mark Twain',
  '“When you change your thoughts, remember to also change your world.”—Norman Vincent Peale',
  '“It is only when we take chances, when our lives improve. The initial and the most difficult risk that we need to take is to become honest. —Walter Anderson',
  '“Success is peace of mind, which is a direct result of self-satisfaction in knowing you made the effort to become the best of which you are capable.” —John Wooden',
  '“Success is getting what you want, happiness is wanting what you get.” ―W. P. Kinsella',
  '“If you are working on something that you really care about, you don’t have to be pushed. The vision pulls you.” — Steve Jobs',
  '“You learn more from failure than from success. Don’t let it stop you. Failure builds character.” — Unknown ',
  '“The pessimist sees difficulty in every opportunity. The optimist sees opportunity in every difficulty." — Winston Churchill',
  '“Setting goals is the first step in turning the invisible into the visible.” — Tony Robbins'
]

function get_motivational_quotes() {
  return motivational_quotes[Math.floor(Math.random() * motivational_quotes.length)]
}
function submit(id: number) {
  socket.emit('AnswerSubmit', { choice: id, QuestionID: QuestionID.value })
}
socket.on('AnswerSubmited', (res) => {
  has_submitted.value = res.has_Submitted
})
</script>

<template>
  <main>
    <div v-if="!has_submitted">
      <div class="container-fluid">
        <div class="row">
          <div class="container-fluid">
            <div class="row">
              <div class="col box box-1" @click="submit(Choies[0].id)">
                <span>
                  <p class="text">{{ Choies[0].content }}</p>
                  <!-- <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-airplane-fill icon"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M6.428 1.151C6.708.591 7.213 0 8 0s1.292.592 1.572 1.151C9.861 1.73 10 2.431 10 3v3.691l5.17 2.585a1.5 1.5 0 0 1 .83 1.342V12a.5.5 0 0 1-.582.493l-5.507-.918-.375 2.253 1.318 1.318A.5.5 0 0 1 10.5 16h-5a.5.5 0 0 1-.354-.854l1.319-1.318-.376-2.253-5.507.918A.5.5 0 0 1 0 12v-1.382a1.5 1.5 0 0 1 .83-1.342L6 6.691V3c0-.568.14-1.271.428-1.849Z"
                    />
                  </svg> -->
                </span>
              </div>
              <div class="col box box-2" @click="submit(Choies[1].id)">
                <span>
                  <p class="text">{{ Choies[1].content }}</p>
                  <!-- <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-bag-fill icon"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5z"
                    />
                  </svg> -->
                </span>
              </div>
            </div>
            <div class="row">
              <div class="col box box-3" @click="submit(Choies[2].id)">
                <span>
                  <p class="text">{{ Choies[2].content }}</p>

                  <!-- <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-cart-fill icon"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
                    />
                  </svg> -->
                </span>
              </div>
              <div class="col box box-4" @click="submit(Choies[3].id)">
                <span>
                  <p class="text">{{ Choies[3].content }}</p>

                  <!-- <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-nut-fill icon"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M4.58 1a1 1 0 0 0-.868.504l-3.428 6a1 1 0 0 0 0 .992l3.428 6A1 1 0 0 0 4.58 15h6.84a1 1 0 0 0 .868-.504l3.429-6a1 1 0 0 0 0-.992l-3.429-6A1 1 0 0 0 11.42 1H4.58zm5.018 9.696a3 3 0 1 1-3-5.196 3 3 0 0 1 3 5.196z"
                    />
                  </svg> -->
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-12 d-flex align-items-center justify-content-center vh-100">
            <div>
              <div class="row d-flex align-items-center justify-content-center">
                <span class="loader"></span>
              </div>
              <div class="row pt-5">
                <p class="text-center text">{{ get_motivational_quotes() }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
main {
  background-color: #263038;
}

.box {
  height: 50vh;

  display: flex;
  justify-content: center;
  align-items: center;
}

.box-1 {
  background-color: #7e549e;
}

.box-1:hover {
  background-color: #583772;
  cursor: pointer;
}

.box-2 {
  background-color: #c2549d;
}

.box-2:hover {
  background-color: #8f3972;
  cursor: pointer;
}

.box-3 {
  background-color: #fc8370;
}

.box-3:hover {
  background-color: #bd5e4f;
  cursor: pointer;
}

.box-4 {
  background-color: #fecb3e;
}

.box-4:hover {
  background-color: #b69028;
  cursor: pointer;
}

.icon {
  height: 64px;
  width: 64px;
  color: #fff;
}

.loader {
  width: 200px;
  height: 140px;
  background: var(--main-color);
  box-sizing: border-box;
  position: relative;
  border-radius: 8px;
  perspective: 1000px;
}

.loader:before {
  content: '';
  position: absolute;
  left: 10px;
  right: 10px;
  top: 10px;
  bottom: 10px;
  border-radius: 8px;
  background: #f5f5f5 no-repeat;
  background-size: 60px 10px;
  background-image: linear-gradient(#ddd 100px, transparent 0),
    linear-gradient(#ddd 100px, transparent 0), linear-gradient(#ddd 100px, transparent 0),
    linear-gradient(#ddd 100px, transparent 0), linear-gradient(#ddd 100px, transparent 0),
    linear-gradient(#ddd 100px, transparent 0);

  background-position: 15px 30px, 15px 60px, 15px 90px, 105px 30px, 105px 60px, 105px 90px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
}

.loader:after {
  content: '';
  position: absolute;
  width: calc(50% - 10px);
  right: 10px;
  top: 10px;
  bottom: 10px;
  border-radius: 8px;
  background: #fff no-repeat;
  background-size: 60px 10px;
  background-image: linear-gradient(#ddd 100px, transparent 0),
    linear-gradient(#ddd 100px, transparent 0), linear-gradient(#ddd 100px, transparent 0);
  background-position: 50% 30px, 50% 60px, 50% 90px;
  transform: rotateY(0deg);
  transform-origin: left center;
  animation: paging 1s linear infinite;
}

@keyframes paging {
  to {
    transform: rotateY(-180deg);
  }
}

.text {
  color: #fff;
}
</style>
