// stores/counter.js
import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
    state: () => {
        return { token: '', user: {} }
    },
    // could also be defined as
    // state: () => ({ count: 0 })
    actions: {
        async googleLogin(code) {
            let { data } = await axios.get(`${process.env.VUE_APP_SERVER}/auth/google-callback?code=${code}`)
            this.token = data.token
            // console.log(this.token)
            let response = await axios.get(`${process.env.VUE_APP_SERVER}/auth/me`, {
                headers: {
                    authorization: `Bearer ${this.token}`
                }
            })
            this.user = response.data
        },
    },
})