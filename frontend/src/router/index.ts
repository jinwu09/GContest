import { createRouter, createWebHistory } from 'vue-router'

//Auth
import LoginView from '@/views/Auth/LoginView.vue';
const RegisterView = ()=> import('@/views/Auth/RegisterView.vue');

//Dashboard
const HomeDashboard =()=> import('@/views/Dashboard/HomeDashboard.vue');

//Creator
const CreateQuiz =()=> import('@/views/Quiz/Creator/CreateQuiz.vue');
const UpdateQuiz = ()=> import('@/views/Quiz/Creator/UpdateQuiz.vue');
const Playground =()=> import('@/views/Quiz/PlaygroundView.vue');

//Joiner
const QuizView = ()=> import('@/views/Quiz/Joiner/QuizView.vue');

//Redirectors
const PathNotFound = ()=>import('@/views/PathNotFound.vue');



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/testPlayground',
      name: 'testPlayground',
      component: Playground
    },

    //Authentication
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

    //Dashboard
    {
      path: '/dashboard/',
      name: 'dashboard',
      component: HomeDashboard
    },

    //Creator
    {
      path: '/creator/create',
      name: 'create-quiz',
      component: CreateQuiz
    },
    {
      path: '/creator/update',
      name: 'update-quiz',
      component: UpdateQuiz
    },

    //Joiners
    {
      path: "/quiz/:room_number",
      name: 'quiz-join',
      component: QuizView
    },

    //Redirections
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
