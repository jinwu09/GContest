<script setup lang="ts">
import { onMounted } from 'vue';


onMounted(() => {
    document.body.style.overflow = "";
    document.body.style.paddingRight = "";
})
</script>

<template>
    <nav class="navbar bg-body-tertiary sticky-top bar-design">
        <div class="container-fluid">
            <span class="mb-0 h1 title">
                <span style="--i:1">Q</span>
                <span style="--i:2">u</span>
                <span style="--i:3">i</span>
                <span style="--i:4">g</span>
                <span style="--i:5">e</span>
                <span style="--i:6">r</span>
            </span>
            <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar"
                aria-controls="offcanvasNavbar">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                <div class="offcanvas-header">
                    <h5 class="offcanvas-title title h1 m-2" id="offcanvasNavbarLabel">
                        <span style="--i:1">Q</span>
                        <span style="--i:2">u</span>
                        <span style="--i:3">i</span>
                        <span style="--i:4">g</span>
                        <span style="--i:5">e</span>
                        <span style="--i:6">r</span>
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div class="offcanvas-body">
                    <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
                        <li class="nav-item">
                            <router-link class="nav-link m-2 p-3" aria-current="page" :to="{ name: 'dashboard' }"><span
                                    class="pe-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor"
                                        class="bi bi-house-door-fill" viewBox="0 0 16 16">
                                        <path
                                            d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5Z" />
                                    </svg>
                                </span> Home</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link m-2 p-3" aria-current="page" :to="{ name: 'create-quiz' }">
                                <span class="pe-4"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"
                                        fill="currentColor" class="bi bi-plus-square-fill" viewBox="0 0 16 16">
                                        <path
                                            d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0z" />
                                    </svg>
                                </span> Create a Test</router-link>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link m-2 p-3" aria-current="page" href="#"><span class="pe-4"><svg
                                        xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor"
                                        class="bi bi-tags-fill" viewBox="0 0 16 16">
                                        <path
                                            d="M2 2a1 1 0 0 1 1-1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 2 6.586V2zm3.5 4a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
                                        <path
                                            d="M1.293 7.793A1 1 0 0 1 1 7.086V2a1 1 0 0 0-1 1v4.586a1 1 0 0 0 .293.707l7 7a1 1 0 0 0 1.414 0l.043-.043-7.457-7.457z" />
                                    </svg></span>My Tests</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link m-2 p-3" aria-current="page" href="#"><span class="pe-4"><svg
                                        xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor"
                                        class="bi bi-clock-fill" viewBox="0 0 16 16">
                                        <path
                                            d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z" />
                                    </svg></span>Recent Activity</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link m-2 p-3" aria-current="page" href="#">
                                <span class="pe-4"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"
                                        fill="currentColor" class="bi bi-gear-fill" viewBox="0 0 16 16">
                                        <path
                                            d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z" />
                                    </svg></span>Settings</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link m-2 p-3" aria-current="page" href="#"><span class="pe-4"><svg
                                        xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor"
                                        class="bi bi-door-open-fill" viewBox="0 0 16 16">
                                        <path
                                            d="M1.5 15a.5.5 0 0 0 0 1h13a.5.5 0 0 0 0-1H13V2.5A1.5 1.5 0 0 0 11.5 1H11V.5a.5.5 0 0 0-.57-.495l-7 1A.5.5 0 0 0 3 1.5V15H1.5zM11 2h.5a.5.5 0 0 1 .5.5V15h-1V2zm-2.5 8c-.276 0-.5-.448-.5-1s.224-1 .5-1 .5.448.5 1-.224 1-.5 1z" />
                                    </svg></span> Log Out</a>
                        </li>

                    </ul>
                </div>
            </div>
        </div>
    </nav>
</template>
<style scoped>
.title {
    font-family: var(--title-font);
    color: var(--main-color);

}

.title span {
    animation: waviy 1s infinite;
    animation-delay: calc(.1s * var(--i));
    position: relative;
    display: inline-block;
}

.bar-design {
    background-color: #f0f0f0 !important;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

.nav-link {
    color: var(--main-color);
}



.nav-item:hover>.nav-link:hover {
    background: var(--main-color);
    color: #f0f0f0;

    -webkit-transform: scale(1.1) rotate(4deg);
    transform: scale(1.1) rotate(4deg);
    /* transition: all 1s ease; */
}</style>