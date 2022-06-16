import { createRouter, createWebHistory } from 'vue-router';
import EmployeesList from '@/views/EmployeesList'

const routes = [
  {
    path: '/',
    name: 'home',
    component: EmployeesList
  },
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
