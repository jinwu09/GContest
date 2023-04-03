<script setup lang="ts">
    interface User{
        id: number,
        username: string
    }

    const props = defineProps<User>();

    function randomColor(){ // defaults to one color - avoid divide by zero
        return "hsl(" + (Math.floor(Math.random() * 10) * (360 / 10) % 360) + ",100%,50%)";
    }

</script>

<template>

    <div class="d-flex align-items-center justify-content-center box" :style="{backgroundColor: randomColor()}">
        <h5 class="text-center text">{{props.username}}</h5>
    </div>


</template>

<style scoped>

    .box   {
        height: 80px;
        border-radius: 25px;
    }

    .text{
        color: #fff;
        font-weight: 700;
    }
</style>