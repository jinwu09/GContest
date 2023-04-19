<script setup lang="ts">
import NavBar from '@/components/NavBar.vue';
import { onMounted } from 'vue';


onMounted(()=>{

})



</script>

<template>
<NavBar/>
<div class="container-fluid ">
    <div class="d-flex align-items-center justify-content-center box">
        <div class="row w-100">
            <div class="col-md-12">
                <div class="row d-flex justify-content-between">
                        <div class="col-2 q-button">
                            Previous
                        </div>
                        <div class="col-2 q-button">
                            Next
                        </div>
                </div>
                <div class="row question-area mt-2" id="qa">
                    <h3 class="h3" id="text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque imperdiet felis nec convallis dictum. Nam dapibus, sapien a porta ultrices, ante nunc consectetur nulla, nec pretium sapien risus a dui. Aenean sit amet ex sit amet ante posuere tempor. Etiam condimentum, lacus eu porta aliquet, leo nulla efficitur nulla, a aliquet lacus ante sed quam. Integer at ultrices erat. Fusce finibus pellentesque ultricies. Ut scelerisque vestibulum vulputate.</h3>
                </div>
                <div class="row d-flex justify-content-between mt-2">
                    <div class="col-md-6 a-button" id="a">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque imperdiet felis nec convallis dictum. Nam dapibus, sapien a porta ultrices, ante nunc consectetur nulla, nec pretium sapien risus a dui. Aenean sit amet ex sit amet ante posuere tempor. Etiam condimentum, lacus eu porta aliquet, leo nulla efficitur nulla, a aliquet lacus ante sed quam. Integer at ultrices erat. Fusce finibus pellentesque ultricies. Ut scelerisque vestibulum vulputate.</div>
                    <div class="col-md-6 a-button" id="b"> Albert</div>
                    <div class="col-md-6 a-button" id="c">Albert</div>
                    <div class="col-md-6 a-button" id="d"> Albert</div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<style scoped>
    .box{
        height: 90vh;
    }

    .question-area{
        background-color: #D9D9D9;
        min-height: 30vh;
        padding: 20px;
        word-wrap: break-word;
    }

    /* #text{
        font-size: var(--font-size);
    } */

    .q-button, .a-button{
        text-align: center;
        background-color: #D9D9D9;
        min-height: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .a-button{
        min-height: 90px;
        word-wrap: break-word;
        padding: 16px;
    }

    #a{
        color: #fff;
        background-color: #7E549E;
    }
    #b{
        color: #fff;
        background-color: #C2549D;
    }
    #c{
        color: #fff;
        background-color: #FC8370;

    }
    #d{
        color: #fff;
        background-color: #FECB3E;

    }

</style>