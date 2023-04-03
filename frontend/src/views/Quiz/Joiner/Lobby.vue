<script setup lang="ts">
import NavBar from '@/components/NavBar.vue';
import LobbyJoiner from '@/components/Joiner/LobbyJoiner.vue'

const joiners : any = [
    // {   
    //     'id': 0,
    //     'username': 'Albert'
    // },
    // {
    //     'id': 1,
    //     'username': 'Oten'
    // },
]

</script>

<template>
    <NavBar/>
    <div class="mt-2">
        <div class="container-fluid">
            <div class="row">
                <div class="col-lg-1"></div>
                <div class="col-lg-10">
                    <div class="row">
                        <h1>In Lobby:</h1>
                    </div>
                    <div class="row">
                        <div v-for="user in joiners" :key="user.id" class="col-md-3 pt-2">
                                <LobbyJoiner :id="user.id" :username="user.username"/>
                        </div>
                    </div>
                </div>
                <div class="col-lg-1"></div>
                
            </div>
        </div>
    </div>
</template>

<style scoped>
    

</style>