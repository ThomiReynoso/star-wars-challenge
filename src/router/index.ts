import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/people',
    name: 'people',
    component: () => import('@/views/PeopleView.vue'),
  },
  {
    path: '/planets',
    name: 'planets',
    component: () => import('@/views/PlanetsView.vue'),
  },
  {
    path: '/people/:id',
    name: 'person-detail',
    component: () => import('@/views/PersonDetailView.vue'),
  },
  {
    path: '/planets/:id',
    name: 'planet-detail',
    component: () => import('@/views/PlanetDetailView.vue'),
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/AboutView.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
