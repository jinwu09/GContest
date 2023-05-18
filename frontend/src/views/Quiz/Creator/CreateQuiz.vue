<script setup lang="ts">
import QuestionBox from '@/components/Dashboard/QuestionBox.vue'
import NavBar from '@/components/NavBar.vue'
import { useAuthStore } from '@/store/AuthStore'
import axios from 'axios'
import Swal from 'sweetalert2'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const store = useAuthStore()

const router = useRouter()

const title = ref('')
const room_passcode = ref('')
const description = ref('')
const status = ref('')
const password = ref('')
const image_path = ref('')

function createQuiz() {
  axios
    .post(
      '/quiz/',
      {
        title: title.value,
        room: room_passcode.value,
        description: description.value,
        status: status.value,
        password: password.value,
        image_path: image_path.value
      },
      {
        headers: {
          Authorization: 'Bearer ' + store.token
        }
      }
    )
    .then((res) => {
      Swal.fire({
        icon: 'success',
        title: res.data.message
      })

      router.push({
        name: 'update-quiz',
        params: {
          quiz_id: res.data.payload.quiz_id
        }
      })
    })
    .catch((err) => {
      console.log(err)
    })
}
</script>

<template>
  <NavBar />
  <div class="mt-2">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-1"></div>
        <div class="col-md-10">
          <div class="row">
            <div class="col-md-12">
              <div class="row p-3 border rounded-3 border-dark">
                <div class="col-md-12">
                  <form @submit.prevent="createQuiz">
                    <div class="mb-3">
                      <h1>Create your Quiz:</h1>
                    </div>
                    <div class="mb-3">
                      <label class="form-label"
                        >Title <span class="text-muted">(The main idea of your quiz)</span></label
                      >
                      <input
                        type="text"
                        v-model="title"
                        class="form-control"
                        autocomplete="off"
                        required
                      />
                    </div>
                    <div class="mb-3">
                      <label class="form-label"
                        >Room Number
                        <span class="text-muted"
                          >(Unique code to be easily distinguishable from other quiz)</span
                        ></label
                      >
                      <input
                        type="text"
                        v-model="room_passcode"
                        class="form-control"
                        autocomplete="off"
                        required
                      />
                    </div>
                    <div class="mb-3">
                      <label class="form-label"
                        >Description
                        <span class="text-muted"
                          >(A short and brief description of your quiz)</span
                        ></label
                      >
                      <textarea
                        type="text"
                        v-model="description"
                        class="form-control"
                        autocomplete="off"
                        required
                      ></textarea>
                    </div>
                    <div class="mb-3">
                      <label class="form-label"
                        >Image
                        <span class="text-muted"
                          >(Copy an image address from the internet)</span
                        ></label
                      >
                      <input
                        type="text"
                        v-model="image_path"
                        class="form-control"
                        autocomplete="off"
                        required
                      />
                    </div>
                    <div class="mb-3">
                      <label class="form-label"
                        >Room Status
                        <span class="text-muted"
                          >(Public means every user of this application can join your quiz)</span
                        ></label
                      >
                      <select
                        class="form-select"
                        aria-label=".form-select-lg example"
                        v-model="status"
                        required
                      >
                        <option value="PUBLIC">Public</option>
                        <option value="PRIVATE">Private</option>
                      </select>
                    </div>

                    <div class="mb-3">
                      <label class="form-label"
                        >Room Password
                        <span class="text-muted"
                          >(So that only users authorized by you can join your quiz)</span
                        ></label
                      >
                      <input
                        type="password"
                        v-model="password"
                        class="form-control"
                        autocomplete="off"
                        :disabled="status == 'PUBLIC' || status == ''"
                        :required="status == 'PRIVATE'"
                      />
                    </div>

                    <div class="mb-3">
                      <div class="container-fluid">
                        <div class="row gx-2">
                          <div class="col">
                            <div class="d-grid gap-2">
                              <button class="btn button-update" type="submit">Create Quiz</button>
                            </div>
                          </div>
                          <div class="col">
                            <div class="d-grid gap-2">
                              <button
                                class="btn button-delete"
                                type="button"
                                @click="router.push({ name: 'dashboard' })"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-1"></div>
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
  background: #5d6a59;
  color: #fff;
}

.button-delete {
  background: #bb4545;
  color: #fff;
}

.quiz {
  background: #f0f0f0;
}

.form-control,
.form-select {
  border: 1px solid black;
}
</style>
