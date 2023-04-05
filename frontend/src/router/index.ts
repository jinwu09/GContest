import { createRouter, createWebHistory } from 'vue-router'

//Landing Page
const LandingPage =()=> import('@/views/Auth/LandingPage.vue');

//Auth
import LoginView from '@/views/Auth/LoginView.vue'
const RegisterView = () => import('@/views/Auth/RegisterView.vue')

//Dashboard
const HomeDashboard = () => import('@/views/Dashboard/HomeDashboard.vue')

//Creator
const CreateQuiz = () => import('@/views/Quiz/Creator/CreateQuiz.vue')
const EditQuiz = () => import('@/views/Quiz/Creator/EditQuiz.vue')
const UpdateQuiz = () => import('@/views/Quiz/Creator/UpdateQuiz.vue')
const Playground = () => import('@/views/Quiz/PlaygroundView.vue')

//Joiner
const LobbyView = ()=> import('@/views/Quiz/Joiner/LobbyView.vue');
const QuizView = ()=> import('@/views/Quiz/Joiner/QuizView.vue');
const Lobby = ()=>import('@/views/Quiz/Joiner/Lobby.vue');

//Redirectors
const PathNotFound = () => import('@/views/PathNotFound.vue')

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
      path: '/LandingPage',
      name: 'LandingPage',
      component: LandingPage
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
      path: '/creator/:id/edit',
      name: 'edit-quiz',
      component: EditQuiz
    },
    {
      path: '/creator/update',
      name: 'update-quiz',
      component: UpdateQuiz
    },

    //Joiners
    {
      path: '/join/quiz/:room_number/start',
      name: 'quiz-join',
      component: QuizView
    },
    {
      path: "/join/quiz/:room_number/lobby",
      name: 'quiz-lobby',
      component: Lobby
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
