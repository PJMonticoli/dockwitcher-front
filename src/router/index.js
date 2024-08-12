import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DashboardView from '@/views/DashboardView.vue'
import IncommingsView from '@/views/IncommingsView.vue'
import OutgoingsView from '@/views/OutgoingsView.vue'
import TrucksView from '@/views/TrucksView.vue'
import DriversView from '@/views/DriversView.vue'
import PlanningView from '@/views/PlanningView.vue'
import NewDriversView from '@/views/NewDriversView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/planning',
      children: [
        {
          path: 'dashboard',
          component: PlanningView
        },
        {
          path: 'incommings',
          component: IncommingsView
        },
        {
          path: 'outgoings',
          component: OutgoingsView
        }
      ]
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView
    },

    {
      path: '/trucks',
      name: 'trucks',
      component: TrucksView
    },
    {
      path: '/drivers',
      name: 'drivers',
      component: DriversView
    },
    {
      path: '/newdriver',
      name: 'newdriver',
      component: NewDriversView
    }
  ]
})

export default router
