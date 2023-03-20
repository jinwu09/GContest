<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
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
                    <div class="w-100 btn btn-success">Point Dropdown</div>
                </div>
                <div class="col-3">
                    <div class="w-100"></div>
                </div>
                <div class="col-3">
                    <div class="w-100 btn btn-danger">Cancel</div>
                </div>
                <div class="col-3">
                    <div class="w-100 btn btn-secondary">Save</div>
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
                    <div class="btn btn-danger w-100 bt1 mb-3">Wrong</div>
                    <input class="noBorder questionBoxColor w-100 pb-4" placeholder="Edit Answer"/>
                </div>
                <div class=" w-25 p-2 questionBox rounded m-2">
                    <div class="btn btn-danger w-100 bt1 mb-3">Wrong</div>
                    <input class="noBorder questionBoxColor w-100" placeholder="Edit Answer"/>
                </div>
                <div class="w-25 p-2 questionBox rounded m-2">
                    <div class="btn btn-danger w-100 bt1 mb-3">Wrong</div>
                    <input class="noBorder questionBoxColor w-100" placeholder="Edit Answer"/>
                </div>
                <div class="w-25 p-2 questionBox rounded m-2">
                    <div class="btn btn-danger w-100 bt1 mb-3">Wrong</div>
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
</style>