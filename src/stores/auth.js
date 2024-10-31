// stores/counter.js
import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
    state: () => {
        return {
            token: '',
            user: {}
        }
    },
    getters: {
        isAuthenticated: (state) => {
            // is JWT valid?
            // is JWT expired?
            // return true
        }
    },
    // could also be defined as
    // state: () => ({ count: 0 })
    actions: {
        async googleLogin(code) {
            let { data } = await axios.get(`${process.env.VUE_APP_SERVER}/v1/auth/google-callback?code=${code}`)
            this.token = data.token
            // console.log(this.token)
            let response = await axios.get(`${process.env.VUE_APP_SERVER}/v1/auth/me`, {
                headers: {
                    authorization: `Bearer ${this.token}`
                }
            })
            this.user = response.data
        },
        async login(email, password) {
            try {
                const response = await axios.post(`${process.env.VUE_APP_SERVER}/v1/auth/login`, {
                    email: email,
                    password: password
                });

                const { data } = await axios.get(`${process.env.VUE_APP_SERVER}/v1/auth/me`, {
                    headers: {
                        authorization: `Bearer ${response.data.token}`
                    }
                });
                this.token = response.data.token
                this.user = data
            } catch (error) {
                console.log(error)
                alert('Login failed');
            }
        },
        async logout() {
            this.token = ""
            this.user = {}
        }
    },
})