import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', {

    state: () => {
        
        return{
        token: null,
        isAuthenticated: false
    }},
    actions: {
        setTokenValue(val: any) {
            this.token = val
            this.isAuthenticated = true
        },
        removeTokenValue() {
            this.token = null
            this.isAuthenticated = false
        }
    },
    persist: true

    // const token = ref(

    // );

    // function getAuthToken() {
    //     return token.value
    // }

    // function setTokenValue(val: any){
    //     token.value.token = val
    //     token.value.isAuthenticated = true
    // }

    // function removeTokenValue(){
    //     token.value.token = null
    //     token.value.isAuthenticated = false
    // }

    // return {token, getAuthToken, setTokenValue, removeTokenValue}

})