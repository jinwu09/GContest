<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
import Vue from "vue";

</script>

<template>
    <NavBar/>
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
                    <div class="btn-group">
                        <button type="button" class="btn btn-primary dropdown-toggle w-100" data-bs-toggle="dropdown" aria-expanded="false">
                            Point Dropdown
                        </button>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#">Passed</a></li>
                        <li><a class="dropdown-item" href="#">Failed</a></li>
                        <li><a class="dropdown-item" href="#">Unfinished</a></li>
                        <li><a class="dropdown-item" href="#">Finished</a></li>
                    </ul>
                    </div>
                </div>
                <div class="col-3">
                    <div class="w-100"></div>
                </div>
                <div class="col-3">
                    <div class="w-100 btn btn-danger">Cancel</div>
                </div>
                <div class="col-3">
                    <div class="w-100 btn btn-success">Save</div>
                </div>
            </div>

            <!-- second main column second row -->
            <div row="row mt-5">
                <div class="col-12">
                    <input class="rounded text-center noBorder bigTextbox w-100" placeholder="Edit Question"/>
                </div>
            </div>

            <!-- second main column third row -->
            <div class="col-12 d-flex">
                <div class="w-25 p-2 questionBox rounded m-2">
                    <label class="switch w-100 mb-3">
                        <input type="checkbox">
                        <span class="slider rounded"></span>
                    </label>    
                    <input class="noBorder questionBoxColor w-100 pb-4" placeholder="Edit Answer"/>
                </div>
                <div class=" w-25 p-2 questionBox rounded m-2">
                    <label class="switch w-100 mb-3">
                        <input type="checkbox">
                        <span class="slider rounded"></span>
                    </label>    
                    <input class="noBorder questionBoxColor w-100" placeholder="Edit Answer"/>
                </div>
                <div class="w-25 p-2 questionBox rounded m-2">
                    <label class="switch w-100 mb-3">
                        <input type="checkbox">
                        <span class="slider rounded"></span>
                    </label>    
                    <input class="noBorder questionBoxColor w-100" placeholder="Edit Answer"/>
                </div>
                <div class="w-25 p-2 questionBox rounded m-2">
                    <label class="switch w-100 mb-3">
                        <input type="checkbox">
                        <span class="slider rounded"></span>
                    </label>    
                    <input class="noBorder questionBoxColor w-100" placeholder="Edit Answer"/>
                </div>
            </div>
            
        </div>

        <!-- third main column -->
        <div class="col-1">
            
        </div>
    </div>
</template>

<style scoped>
    .topSpace{
        margin: 2% !important;
    }
    .noBorder{
        border: none !important;
        outline: none !important;
        border-style: none !important; 
        border-color: Transparent !important; 
        background-color: var(--main-color) !important;
        
    }
    .bigTextbox{
        padding: 13% !important;
        font-size: 35px !important;
        color: white !important;
    }
    .questionBox{
        background-color: var(--main-color) !important;
    }
    .questionBoxColor{
        color: white !important;
    }
    .bt1{
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
    input:checked + .slider {
        content: "Correct";
        background-color: green !important;
    }
    input:checked + .slider:before {
        -webkit-transform: translateX(26px);
        -ms-transform: translateX(26px);
        transform: translateX(26px);
    }
</style>