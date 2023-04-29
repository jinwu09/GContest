<script setup lang="ts">
    interface User{
        id: number,
        username: string
    }

    const props = defineProps<User>();

    
</script>

<template>

    <div class="d-flex align-items-center justify-content-center box">
        <h5 class="text-center text">{{props.username}}</h5>
    </div>


</template>

<style scoped>
    @import url('https://fonts.googleapis.com/css2?family=Gloria+Hallelujah&display=swap');
    .box   {
        height: 80px;
        border-radius: 25px;
        background-color: #ED7014;
        padding: 20px;
    }

    .text{
        color: #fff;
        font-weight: 700;
        font-family: 'Gloria Hallelujah', cursive !important;
    }
</style>