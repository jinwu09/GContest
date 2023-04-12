<script setup lang="ts">
import QuestionBox from '@/components/Dashboard/QuestionBox.vue';
import NavBar from '@/components/NavBar.vue'
import { useAuthStore } from '@/store/AuthStore';
import axios from 'axios';
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute()
const router = useRouter();
const store = useAuthStore()

const title = ref('')
const room_passcode = ref('')
const description = ref('')
const status = ref('');
const password = ref('')
const quiz_id = ref('')

const questions: any  = ref([])


onMounted(()=>{
  axios.all([
    axios.get('/quiz/' + route.params.quiz_id,{
      headers: {
        Authorization: 'Bearer '+store.token
      }
    }),
    axios.get('/question/all/' + route.params.quiz_id,{
      headers: {
        Authorization: 'Bearer '+store.token
      }
    }),
  ]).then(axios.spread((quiz_res, question_res)=>{
    quiz_id.value = quiz_res.data.data.id
    title.value = quiz_res.data.data.title
    room_passcode.value = quiz_res.data.data.name
    description.value = quiz_res.data.data.description
    status.value = quiz_res.data.data.status

    questions.value = question_res.data.data
  }))
})


function addNewQuestion(){
  router.push({
    name: 'blank-question',
    params:{
      quiz_id: quiz_id.value
    }
  })
}





</script>

<template>
  <NavBar />
  <div class="mt-2">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-1">

        </div>
        <div class="col-md-10">
          <div class="row">
            <div class="col-md-4 ">
              <div class="row p-3 border rounded-3 border-dark">
                <div class="col-md-12">
                  <div class="mb-3">
                    <label class="form-label">Title</label>
                    <input type="text" v-model="title" class="form-control" autocomplete="off">
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Room Number</label>
                    <input type="text" v-model="room_passcode" class="form-control" autocomplete="off">
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Room Status</label>
                    <select class="form-select" aria-label=".form-select-lg example" v-model="status">
                      <option selected value="public">Public</option>
                      <option value="private">Private</option>
                    </select>
                  </div>

                  <div class="mb-3">
                    <label class="form-label">Room Password</label>
                    <input type="password" v-model="password" class="form-control" autocomplete="off" :disabled="status == 'Private'">
                  </div>

                  <div class="mb-3">

                    <div class="row gx-2">
                      <div class="col">
                        <div class="d-grid gap-2">
                          <button class="btn button-update" type="button">Update Quiz</button>
                        </div>
                      </div>
                      <div class="col">
                        <div class="d-grid gap-2">
                          <button class="btn button-delete" type="button">Delete Quiz</button>
                        </div>
                      </div>
                    </div>
                    <div class="row mt-2">
                      <div class="d-grid gap-2">
                        <button class="btn button-lobby" type="button">Go to Lobby</button>
                      </div>
                    </div>


                  </div>
                </div>

              </div>
            </div>
            <div class="col-md-1">

            </div>
            <div class="col-md-7">
              <!-- Questions here -->
              <div :class="index == 0 ? ('row') : ('row pt-3')" v-for="(value, index) in questions"
                :key="value.question_id">
                <QuestionBox :points='value.score' :question_content="value.content" :choice_a="value.choices[0].content"
                  :choice_b="value.choices[1].content" :choice_c="value.choices[2].content" :choice_d="value.choices[3].content" />
              </div>

              <div class="row py-3">
                <div class="container-fluid add-new-background p-3" @click="addNewQuestion">
                  <p class="h5 text-center" >Add New Question</p>
                </div>

              </div>

            </div>


          </div>
        </div>
        <div class="col-md-1">

        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.add-new-background {
  background: var(--main-color);
  color: #fff;
}

.add-new-background:hover {
  background: var(--hover-color);
  cursor: pointer;
}

.button-update {
  background: #5D6A59;
  color: #fff;
}

.button-update:hover {
  background: #2c3629;
  color: #fff;
}

.button-delete {
  background: #BB4545;
  color: #fff;
}

.button-delete:hover {
  background: #8a2f2f;
  color: #fff;
}

.button-lobby {
  background: var(--main-color);
  color: #fff;
}

.button-lobby:hover {
  background: var(--hover-color);
  color: #fff;
}

.quiz {
  background: #f0f0f0;
}

.form-control,
.form-select {
  border: 1px solid black
}
</style>
