<script setup lang="ts">
import QuestionBox from '@/components/Dashboard/QuestionBox.vue';
import NavBar from '@/components/NavBar.vue'
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';


const questions :any = [
  // {
  //   question_id: 1,
  //   points: 3,
  //   question_content: "What is Albert?",
  //   choice_a: "Igop",
  //   choice_b: "Pogi",
  //   choice_c: "Gwapogi",
  //   choice_d: "None of the above"
  // },
  // {
  //   question_id: 2,
  //   points: 3,

  //   question_content: "What is Hancelet?",
  //   choice_a: "Igop",
  //   choice_b: "Pogi",
  //   choice_c: "Gwapogi",
  //   choice_d: "None of the above"
  // },
  // {
  //   question_id: 3,
  //   points: 10,

  //   question_content: "What is Dabid?",
  //   choice_a: "Igop",
  //   choice_b: "Pogi",
  //   choice_c: "Gwapogi",
  //   choice_d: "None of the above"
  // },
];



const status = ref('');

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
                    <input type="text" class="form-control" autocomplete="off">
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Room Number</label>
                    <input type="text" class="form-control" autocomplete="off">
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Room Status</label>
                    <select class="form-select" aria-label=".form-select-lg example" v-model="status">
                      <option selected>Public</option>
                      <option>Private</option>
                    </select>
                  </div>

                  <div class="mb-3">
                    <label class="form-label">Room Password</label>
                    <input type="password" class="form-control" autocomplete="off" :disabled="status == 'Private'">
                  </div>

                  <div class="mb-3">
                    <div class="container-fluid">
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
                <QuestionBox :points='value.points' :question_content="value.question_content" :choice_a="value.choice_a"
                  :choice_b="value.choice_b" :choice_c="value.choice_c" :choice_d="value.choice_d" />
              </div>

              <div class="row py-3">
                <div class="container-fluid add-new-background p-3">
                  <p class="h5 text-center">Add New Question</p>
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

.button-delete {
  background: #BB4545;
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
