import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useProfileStore = defineStore('Profile', {
  state: () => {
    return {
      username: 'albertus'
    }
  },
  actions: {
    setUsernameValue(val: any) {
      this.username = val
    },
    removeTokenValue() {
      this.username = ''
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
