<script setup lang="ts">
import router from '@/router'
import { useAuthStore } from '@/store/AuthStore'
import axios from 'axios'
import Swal from 'sweetalert2'

const emit = defineEmits(['delete', 'update'])

interface Question {
  question_id: number
  points?: Number
  question_content?: String
  choice_a?: String
  choice_a_isCorrect: boolean
  choice_b?: String
  choice_b_isCorrect: boolean

  choice_c?: String
  choice_c_isCorrect: boolean

  choice_d?: String
  choice_d_isCorrect: boolean
}

const props = defineProps<Question>()
const store = useAuthStore()

function deleteQuestion() {
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#BB4545',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      console.log('confirmed')
      axios
        .delete('/question/' + props.question_id, {
          headers: {
            Authorization: 'Bearer ' + store.token
          }
        })
        .then((res) => {
          Swal.fire({
            icon: 'success',
            title: res.data.payload
          })

          emit('delete')
        })
        .catch((err) => {
          Swal.fire({
            icon: 'error',
            title: 'There has been an error, please try again later'
          })
        })
    }
  })
}

function updateQuestion() {
  emit('update', { id: props.question_id })
}
</script>

<template>
  <div class="container-fluid border border-dark">
    <div class="row">
      <div class="container-fluid">
        <div class="row question-background">
          <div class="d-flex justify-content-between p-4">
            <div>
              <p class="h5 text-center text">{{ props.points }} point question</p>
            </div>
            <div class="d-flex justify-content-between">
              <div class="px-3">
                <span class="text-center icon" @click="updateQuestion"><svg xmlns="http://www.w3.org/2000/svg" width="20"
                    height="20" fill="white" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                    <path
                      d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                  </svg></span>
              </div>
              <div>
                <span class="text-center icon" @click="deleteQuestion"><svg xmlns="http://www.w3.org/2000/svg" width="20"
                    height="20" fill="white" class="bi bi-trash-fill" viewBox="0 0 16 16">
                    <path
                      d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                  </svg></span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row pt-3">
        <div class="container-fluid p-4">
          <div>
            {{ props.question_content }}
          </div>
        </div>
      </div>
      <div class="row">
        <div class="container-fluid">
          <div>
            <hr />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-6">
              <p :class="[props.choice_a_isCorrect ? 'text-center green' : 'text-center red']">
                A. <u>{{ props.choice_a }}</u>
              </p>
            </div>
            <div class="col-md-6">
              <p :class="[props.choice_b_isCorrect ? 'text-center green' : 'text-center red']">
                B. <u>{{ props.choice_b }}</u>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-6">
              <p :class="[props.choice_c_isCorrect ? 'text-center green' : 'text-center red']">
                C. <u>{{ props.choice_c }}</u>
              </p>
            </div>
            <div class="col-md-6">
              <p :class="[props.choice_d_isCorrect ? 'text-center green' : 'text-center red']">
                D. <u>{{ props.choice_d }}</u>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.question-background {
  background-color: var(--main-color);
}

.text {
  color: #fff;
}

.icon {
  cursor: pointer;
}

.green {
  color: green;
}

.red {
  color: red;
}
</style>
