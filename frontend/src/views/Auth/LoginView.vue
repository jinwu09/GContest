<script setup lang="ts">
    import { useRouter } from 'vue-router';

    const router = useRouter();

    function navToRegister(){
        router.push({name:'register'})
    }
</script>

<template>
    <div class="container-fluid">
        <div class="row site">
            <div class="col filler">
                
            </div>
            <div class="col-lg-8 col-md-12 white-background ">
                <div class="d-flex align-items-center justify-content-center vh-100 m-4">
                    <div class="row">
                        <div class="row">
                        <h1 class="title text-center">Quiger</h1>
                    </div>
                    <form>
                        <div class="row">
                            <div class="col-md-12">
                                <input class="form-control form-control-lg" type="email" placeholder="Email" aria-label=".form-control-lg example" autocomplete="off" required>

                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-md-12">
                                <input class="form-control form-control-lg" type="password" placeholder="Password" aria-label=".form-control-lg example" autocomplete="off" required>

                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="d-grid mx-auto">
                                <button class="btn btn-primary btn-lg" type="submit">LOGIN</button>
                            </div>
                        </div>
                        <div class="row mt-3">
                            <p class="text-center">Dont have an account? <u @click="navToRegister">REGISTER</u></p>
                        </div>
                    </form>
                    </div>
                    
                        

                    
                </div>
                
            </div>
        </div>
    </div>
</template>

<style scoped>
    @import url(@/assets/login-register-forms.css);
    
</style>