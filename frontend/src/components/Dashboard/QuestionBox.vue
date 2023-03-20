<script setup lang="ts">
interface Question {
    question_number?: Number,
    question_content?: String,
    choice_a?: String,
    choice_b?: String,
    choice_c?: String,
    choice_d?: String,
};

const props = defineProps<Question>();

</script>

<template>
    <div class="container-fluid border border-dark">
        <div class="row">
            <div class="container-fluid ">
                <div class="row question-background">
                    <div class="d-flex justify-content-between p-4">
                        <div>
                            <p class="h5 text-center text">Question Number {{ props.question_number }}</p>
                        </div>
                        <div class="d-flex justify-content-between">
                            <div class="px-3"><span class="text-center icon"><svg xmlns="http://www.w3.org/2000/svg"
                                        width="20" height="20" fill="white" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                                        <path
                                            d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                                    </svg></span></div>
                            <div><span class="text-center icon"><svg xmlns="http://www.w3.org/2000/svg" width="20"
                                        height="20" fill="white" class="bi bi-trash-fill" viewBox="0 0 16 16">
                                        <path
                                            d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                                    </svg></span></div>
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
                            <p class="text-center">A. <u>{{ props.choice_a }}</u></p>
                        </div>
                        <div class="col-md-6">
                            <p class="text-center">B. <u>{{ props.choice_b }}</u></p>
                        </div>
                    </div>

                </div>

            </div>
            <div class="row">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-6">
                            <p class="text-center">C. <u>{{ props.choice_c }}</u></p>
                        </div>
                        <div class="col-md-6">
                            <p class="text-center">D. <u>{{ props.choice_d }}</u></p>
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
}</style>

