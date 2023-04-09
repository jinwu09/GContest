<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
import { ref } from 'vue';
// import Vue from "vue";

const points = ref(0)
const question_text = ref('')
const choice_a = ref({
    input: '',
    isCorrect : false
})

const choice_b = ref({
    input: '',
    isCorrect : false
})

const choice_c = ref({
    input: '',
    isCorrect : false
})

const choice_d = ref({
    input: '',
    isCorrect : false
})


function createQuiz(){
    console.log(question_text.value)
    console.log(choice_d.value)
}

</script>

<template>
    <NavBar />
    <div class="container-fluid d-flex">
        <!-- first main column -->
        <div class="col-1">

        </div>

        <!-- second main column -->
        <div class="col-10">
            <!-- Top Space -->
            <div class="row topSpace"></div>
            <!-- second main column first row -->
            <div class="row my-3">
                <div class="col-3">
                    <div class="btn-group w-100">
                    <select class="form-select hvr-grow-rotate" aria-label="Default select example" v-model="points">
                        <option disabled value="" class="hvr-grow-rotate" selected>Select Quiz Points</option>
                        <option >0</option>
                        <option >5</option>
                        <option >10</option>
                        <option >15</option>
                        <option >20</option>
                        </select>
                    </div>
                </div>
                <div class="col-3">
                    <div class="w-100"></div>
                </div>
                <div class="col-3">
                    <div class="w-100 btn btn-danger hvr-wobble-bottom">Cancel</div>
                </div>
                <div class="col-3">
                    <div class="w-100 btn btn-success hvr-wobble-bottom" @click="createQuiz">Create</div>
                </div>
            </div>

            <!-- second main column second row -->
            <div row="row mt-3">
                <div class="col-12">
                   
                    <textarea v-model="question_text" oninput='this.style.height = "";this.style.height = this.scrollHeight + "px"'
                        class="rounded align-center text-center noBorder bigTextbox w-100 px-3 py-5"
                        placeholder="Edit Question" ></textarea>
                </div>
            </div>

            <!-- second main column third row -->

            <div class="row">
                <div class="col-12 d-flex">
                    <div class="w-25 p-2 questionBox1 rounded m-2" action="#" method="post">
                        <label class="switch w-100 mb-3">
                            <input type="checkbox" v-model="choice_a.isCorrect">
                            <span class="slider rounded"></span>
                        </label>
                        <textarea name="text" v-model="choice_a.input" oninput='this.style.height = "";this.style.height = this.scrollHeight + "px"'
                            class="rounded text-center noBorder w-100 questionBoxColor1"
                            placeholder="Edit Answer"></textarea>
                    </div>
                    <div class=" w-25 p-2 questionBox2 rounded m-2">
                        <label class="switch w-100 mb-3">
                            <input type="checkbox" v-model="choice_b.isCorrect">
                            <span class="slider rounded"></span>
                        </label>
                        <textarea name="text" v-model="choice_b.input" oninput='this.style.height = "";this.style.height = this.scrollHeight + "px"'
                            class="rounded text-center noBorder w-100 questionBoxColor2"
                            placeholder="Edit Answer"></textarea>
                    </div>
                    <div class="w-25 p-2 questionBox3 rounded m-2">
                        <label class="switch w-100 mb-3">
                            <input type="checkbox" v-model="choice_c.isCorrect">
                            <span class="slider rounded"></span>
                        </label>
                        <textarea name="text" v-model="choice_c.input" oninput='this.style.height = "";this.style.height = this.scrollHeight + "px"'
                            class="rounded text-center noBorder w-100 questionBoxColor3"
                            placeholder="Edit Answer"></textarea>
                    </div>
                    <div class="w-25 p-2 questionBox4 rounded m-2">
                        <label class="switch w-100 mb-3">
                            <input type="checkbox" v-model="choice_d.isCorrect">
                            <span class="slider rounded"></span>
                        </label>
                        <textarea name="text" v-model="choice_d.input" oninput='this.style.height = "";this.style.height = this.scrollHeight + "px"'
                            class="rounded text-center questionBoxColor4 noBorder w-100"
                            placeholder="Edit Answer"></textarea>
                    </div>
                </div>

            </div>

        </div>

        <!-- third main column -->
        <div class="col-1">

        </div>
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
    color: white !important;
}

.bigTextbox {
    font-size: 30px !important;
    color: white !important;
    /* background-color: #dfdcdc !important; */
    border: 2px solid black;
}

.questionBox1 {
    font-size: 20px !important;
    background-color: #7E549E !important;
    color: white !important;
}

.questionBox2 {
    font-size: 20px !important;
    background-color: #C2549D !important;
    color: white !important;
}

.questionBox3 {
    font-size: 20px !important;
    background-color: #FC8370 !important;
    color: white !important;
}

.questionBox4 {
    font-size: 20px !important;
    background-color: #FECB3E !important;
    color: white !important;
}

.questionBoxColor1 {
    background-color: #7E549E !important;
}

.questionBoxColor2 {
    background-color: #C2549D !important;
}

.questionBoxColor3 {
    background-color: #FC8370 !important;
}

.questionBoxColor4 {
    background-color: #FECB3E !important;
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
    -webkit-transition: .4s;
    transition: .4s;
}

.slider:before {
    position: absolute;
    color: white;
    height: 26px;
    width: 100px;
    left: 80px;
    bottom: 4px;
    background-color: None;
    -webkit-transition: .4s;
    transition: .4s;
}

input:checked+.slider {
    content: "Correct";
    background-color: green !important;
}

input:checked+.slider:before {
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
}</style>