import { createApp } from 'vue'
import App from './App.vue'

import { createWebHistory, createRouter } from 'vue-router'
import Home from '@/pages/Home.vue'
import Chat from '@/pages/Chat.vue'
import './assets/tailwind.css'
import OAuthGoogle from '@/pages/OAuthGoogle.vue'
import { createPinia } from 'pinia'
const pinia = createPinia()
const routes = [
    { path: '/', component: Home },
    { path: '/chat', component: Chat },
    { path: '/google-callback', component: OAuthGoogle }
]

const router = createRouter({
    routes,
    history: createWebHistory()
})

const app = createApp(App)
app.use(router)
app.use(pinia)
app.mount('#app')
