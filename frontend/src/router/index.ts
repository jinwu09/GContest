import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/Auth/LoginView.vue'
import RegisterView from '@/views/Auth/RegisterView.vue'
import HomeDashboard from '@/views/Dashboard/HomeDashboard.vue'
import CreateQuiz from '@/views/Dashboard/CreateQuiz.vue'
import PathNotFound from '@/views/PathNotFound.vue'
import Playground from '@/views/Quiz/PlaygroundView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/testPlayground',
      name: 'testPlayground',
      component: Playground
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/dashboard/',
      name: 'dashboard',
      component: HomeDashboard
    },
    {
      path: '/dashboard/create',
      name: 'create-quiz',
      component: CreateQuiz
    },
    {
      path: '/',
      redirect: 'login'
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: PathNotFound
    }
  ]
})

export default router
