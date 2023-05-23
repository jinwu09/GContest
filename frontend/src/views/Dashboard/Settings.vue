<script setup lang="ts">
import NavBar from '@/components/NavBar.vue';
import { onMounted, ref } from 'vue';
import axios from 'axios';
import { useAuthStore } from '@/store/AuthStore'
import { SwalDesign } from '@/assets/CustomSwal';
import { useRouter } from 'vue-router';

const store = useAuthStore()
const router = useRouter()

const first_name: any = ref()
const first_name_new: any = ref()
const last_name: any = ref()
const last_name_new: any = ref()
const school: any = ref()
const school_new: any = ref()
const email: any = ref()
const email_new: any = ref()

const password: any = ref()
const confirm_password: any = ref()

const is_input_success: any = ref(false)

onMounted(() => {
    axios
        .get('/user/me', {
            headers: {
                Authorization: 'Bearer ' + store.token
            }
        })
        .then((res: any) => {
            first_name.value = res.data.payload.first_name
            last_name.value = res.data.payload.last_name
            email.value = res.data.payload.email
            school.value = res.data.payload.school
        })
        .catch((err) => {
            console.log(err)
        })
})

function saveInput(e: any) {
    axios
        .put('/user/me/update', {
            first_name: first_name_new.value,
            last_name: last_name_new.value,
            email: email_new.value,
            school: school_new.value,
        }, {
            headers: {
                Authorization: 'Bearer ' + store.token
            }
        })
        .then((res: any) => {
            is_input_success.value = true

            switch (e) {
                case 'fname':
                    if (is_input_success.value) {
                        first_name.value = first_name_new.value
                        first_name_new.value = null
                        is_input_success.value = false
                    }
                    break;
                case 'lname':
                    if (is_input_success.value) {
                        last_name.value = last_name_new.value
                        last_name_new.value = null
                        is_input_success.value = false
                    }
                    break;
                case 'email':
                    if (is_input_success.value) {
                        email.value = email_new.value
                        email_new.value = null
                        is_input_success.value = false
                    }
                    break;
                case 'school':
                    if (is_input_success.value) {
                        school.value = school_new.value
                        school_new.value = null
                        is_input_success.value = false
                    }
                    break;

                default:
                    break;
            }


            SwalDesign.fire({
                icon: 'success',
                title: res.data.payload.message
            })


        })
        .catch((err) => {
            console.log(err)
            is_input_success.value = false

        })
}

function initialization(e: any) {

    switch (e) {
        case 'fname':
            first_name_new.value = first_name.value
            break;
        case 'lname':
            last_name_new.value = last_name.value
            break;
        case 'email':
            email_new.value = email.value
            break;
        case 'school':
            school_new.value = school.value
            break;

        default:
            break;
    }
    // first_name_new.value = first_name.value
}

function cancelInput() {
    first_name_new.value = null
    last_name_new.value = null
    email_new.value = null
    school_new.value = null
    password.value = null
    confirm_password.value = null
}

function updatePassword() {
    axios.put('/user/me/password', {
        password: password.value,
        confirm_password: confirm_password.value
    }, {
        headers: {
            Authorization: 'Bearer ' + store.token
        }
    }).then((res) => {
        SwalDesign.fire({
            icon: 'success',
            title: 'Updated!',
            text: res.data.payload.message
        })

        password.value = null
        confirm_password.value = null
    }).catch((err) => {
        // console.log(err)
        SwalDesign.fire({
            icon: 'error',
            title: 'Oopss..',
            text: err.response.data.payload.message
        })
    })

}

function deleteUser() {
    SwalDesign.fire({
        title: 'Are you sure you want to delete your account?',
        icon: 'warning',
        timer: 0,
        position: 'center',
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            axios
                .delete('/user/me/deactivate', {
                    headers: {
                        Authorization: 'Bearer ' + store.token
                    }
                })
                .then((res) => {
                    SwalDesign.fire({
                        icon: 'success',
                        title: res.data.payload.message
                    })

                    store.removeTokenValue()
                    router.push({ name: 'LandingPage' })
                })
                .catch((err) => {
                    SwalDesign.fire({
                        icon: 'question',
                        title: err.response.data.payload.message
                    })
                })
        }
    })
}

function logOut() {
    axios
        .post('/auth/logout', null, {
            headers: {
                Authorization: 'Bearer ' + store.token
            }
        })
        .then((res) => {

            store.removeTokenValue()
            router.push({ name: 'LandingPage' })

            SwalDesign.fire({
                icon: 'success',
                title: res.data.payload
            })

        })
        .catch((err) => {
            SwalDesign.fire({
                icon: 'error',
                title: err.response.data.payload.message
            })
            store.removeTokenValue()
            router.push({ name: 'login' })
        })
}

</script>

<template>
    <NavBar />
    <div class="mt-1">
        <div class="container-fluid">
            <div class="row">
                <div class="col-lg-4">

                </div>
                <div class="col-lg-4">
                    <h3 class="text-center mt-2">Settings</h3>

                    <div class="box">
                        <div class="row">
                            <div class="row">
                                <p>Profile</p>
                            </div>
                            <div class="row ">
                                <div>
                                    <div class="list" data-bs-toggle="modal" data-bs-target="#fname"
                                        @click="initialization('fname')">
                                        <p><b>First Name</b></p>
                                        <p>{{ first_name }}</p>
                                        <p class="icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                                                <path
                                                    d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                                            </svg></p>
                                    </div>
                                    <div class="list" data-bs-toggle="modal" data-bs-target="#lname"
                                        @click="initialization('lname')">
                                        <p><b>Last Name</b></p>
                                        <p>{{ last_name }}</p>
                                        <p class="icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                                                <path
                                                    d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                                            </svg></p>
                                    </div>
                                    <!-- <div class="list" data-bs-toggle="modal" data-bs-target="#school" @click="initialization('school')">
                                        <p><b>School</b></p>
                                        <p>{{ school ? school : 'Unset' }}</p>
                                        <p class="icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                                                <path
                                                    d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                                            </svg></p>
                                    </div> -->
                                    <div class="list" data-bs-toggle="modal" data-bs-target="#email"
                                        @click="initialization('email')">
                                        <p><b>Email</b></p>
                                        <p>{{ email }}</p>
                                        <p class="icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                                                <path
                                                    d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                                            </svg></p>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>

                    <div class="box mt-3">
                        <div class="row">
                            <div class="row">
                                <p>Account Settings</p>
                            </div>
                            <div class="row ">
                                <div>
                                    <div class="list" data-bs-toggle="modal" data-bs-target="#pass">
                                        <p><b>Change Password</b></p>
                                        <p class="icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                                                <path
                                                    d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                                            </svg></p>
                                    </div>
                                    <div class="list" @click="deleteUser">
                                        <p><b>Delete Account</b></p>
                                        <p class="icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                                                <path
                                                    d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                                            </svg></p>
                                    </div>
                                    <div class="list" @click="logOut">
                                        <p><b>Log Out</b></p>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>

                </div>
                <div class="col-lg-4">

                </div>
            </div>
        </div>
    </div>



    <!-- First Name Modal -->
    <div class="modal fade" id="fname" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-body">
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">First Name</label>
                        <input v-model="first_name_new" type="text" class="form-control form-control-lg"
                            id="exampleFormControlInput1" placeholder="Enter your First Name">
                    </div>
                    <div class="d-grid gap-2 d-flex justify-content-end">
                        <button class="btn btn-cancel" type="button" data-bs-dismiss="modal"
                            @click="cancelInput">Cancel</button>
                        <button class="btn btn-save me-md-2" type="button" @click="saveInput('fname')"
                            data-bs-dismiss="modal">Save</button>

                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Last Name Modal -->
    <div class="modal fade" id="lname" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-body">
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Last Name</label>
                        <input v-model="last_name_new" type="text" class="form-control form-control-lg"
                            id="exampleFormControlInput1" placeholder="Enter your Last Name">
                    </div>
                    <div class="d-grid gap-2 d-flex justify-content-end">
                        <button class="btn btn-cancel" type="button" data-bs-dismiss="modal"
                            @click="cancelInput">Cancel</button>
                        <button class="btn btn-save me-md-2" type="button" data-bs-dismiss="modal"
                            @click="saveInput('lname')">Save</button>

                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Email Modal -->
    <div class="modal fade" id="email" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-body">
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Email</label>
                        <input v-model="email_new" type="email" class="form-control form-control-lg"
                            id="exampleFormControlInput1" placeholder="Enter your Email">
                    </div>
                    <div class="d-grid gap-2 d-flex justify-content-end">
                        <button class="btn btn-cancel" type="button" data-bs-dismiss="modal"
                            @click="cancelInput">Cancel</button>
                        <button class="btn btn-save me-md-2" type="button" data-bs-dismiss="modal"
                            @click="saveInput('email')">Save</button>

                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- School Modal
    <div class="modal fade" id="school" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-body">
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">School</label>
                        <input v-model="school_new" type="text" class="form-control form-control-lg"
                            id="exampleFormControlInput1" placeholder="Enter your S">
                    </div>
                    <div class="d-grid gap-2 d-flex justify-content-end">
                        <button class="btn btn-cancel" type="button" data-bs-dismiss="modal"
                            @click="cancelInput">Cancel</button>
                        <button class="btn btn-save me-md-2" type="button" data-bs-dismiss="modal" @click="saveInput('school')">Save</button>

                    </div>
                </div>
            </div>
        </div>
    </div> -->

    <!-- Password -->
    <div class="modal fade" id="pass" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-body">
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Password</label>
                        <input v-model="password" type="password" class="form-control form-control-lg"
                            id="exampleFormControlInput1">
                    </div>
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Confirm Password</label>
                        <input v-model="confirm_password" type="password" class="form-control form-control-lg"
                            id="exampleFormControlInput1">
                    </div>
                    <div class="d-grid gap-2 d-flex justify-content-end">
                        <button class="btn btn-cancel" type="button" data-bs-dismiss="modal"
                            @click="cancelInput">Cancel</button>
                        <button class="btn btn-save me-md-2" type="button" data-bs-dismiss="modal"
                            @click="updatePassword">Save</button>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.modal-content {
    background-color: var(--main-color);
    color: white;
}

.btn-save {
    color: var(--main-color);
    background-color: whitesmoke;
}

.btn-save:hover {
    background-color: var(--hover-color);
    color: white;
}

.btn-cancel {
    background-color: unset;
    color: white;
}

.box {
    background-color: whitesmoke;
    color: var(--main-color);
    padding: 20px;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
}

.list {
    padding: 10px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    position: relative;
    cursor: pointer;
    overflow: hidden;

    line-height: 2px;
}

.icon {
    visibility: hidden;
    position: absolute;
    right: 0px;
}

.list:hover .icon {
    cursor: pointer;
    color: var(--hover-color);
    visibility: visible;
}
</style>