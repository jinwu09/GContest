<script setup lang="ts">
import { useRoute } from 'vue-router';


const route = useRoute()
</script>

<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-1"></div>
            <div class="col-10">
                <div class="row">
                    <ul class="nav nav-underline mt-2">
                        <li class="nav-item">
                            <router-link :class="[route.name == 'recent-joined' ? 'nav-link active text' : 'nav-link text']" :to="{ name: 'recent-joined' }">Joined <span> <svg
                                        xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                        class="bi bi-hourglass-split" viewBox="0 0 16 16">
                                        <path
                                            d="M2.5 15a.5.5 0 1 1 0-1h1v-1a4.5 4.5 0 0 1 2.557-4.06c.29-.139.443-.377.443-.59v-.7c0-.213-.154-.451-.443-.59A4.5 4.5 0 0 1 3.5 3V2h-1a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1h-1v1a4.5 4.5 0 0 1-2.557 4.06c-.29.139-.443.377-.443.59v.7c0 .213.154.451.443.59A4.5 4.5 0 0 1 12.5 13v1h1a.5.5 0 0 1 0 1h-11zm2-13v1c0 .537.12 1.045.337 1.5h6.326c.216-.455.337-.963.337-1.5V2h-7zm3 6.35c0 .701-.478 1.236-1.011 1.492A3.5 3.5 0 0 0 4.5 13s.866-1.299 3-1.48V8.35zm1 0v3.17c2.134.181 3 1.48 3 1.48a3.5 3.5 0 0 0-1.989-3.158C8.978 9.586 8.5 9.052 8.5 8.351z" />
                                    </svg></span></router-link>
                        </li>
                        <li class="nav-item">
                            <router-link :class="[route.name == 'recent-created' ? 'nav-link active text' : 'nav-link text']" :to="{ name: 'recent-created' }">Created <span><svg
                                        xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                        class="bi bi-pen-fill" viewBox="0 0 16 16">
                                        <path
                                            d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001z" />
                                    </svg></span></router-link>
                        </li>
                    </ul>
                </div>
                <div class="row">

                </div>

            </div>
            <div class="col-1"></div>
        </div>
    </div>
</template>

<style scoped>
.nav-link{
    color: var(--main-color);
}

.text{
    font-size: 1.2rem;
}

</style>