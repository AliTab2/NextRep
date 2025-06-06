import { createMemoryHistory, createRouter } from 'vue-router'
import useUserStore from '@/stores/userStore'

const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    { path: '/', name: 'Home', component: () => import('@/views/HomePage.vue') },
    { path: '/calendar', name: 'Calendar', component: () => import('@/views/CalendarPage.vue') },
    {
      path: '/course/add',
      name: 'AddCourse',
      component: () => import('@/views/CoursePage.vue'),
      meta: { allowedRoles: ['superadmin', 'admin'] },
    },
    {
      path: '/course/edit/:id',
      name: 'EditCourse',
      component: () => import('@/views/CoursePage.vue'),
    },
    {
      path: '/user',
      name: 'Admin',
      component: () => import('@/views/AdminPage.vue'),
      meta: { allowedRoles: ['superadmin', 'admin'] },
    },
    {
      path: '/user/add',
      name: 'AddUser',
      component: () => import('@/views/UserPage.vue'),
      meta: { allowedRoles: ['superadmin'] },
    },
    {
      path: '/user/edit/:id',
      name: 'EditUser',
      component: () => import('@/views/UserPage.vue'),
      meta: { allowedRoles: ['superadmin', 'admin'] },
    },
    { path: '/auth/login', name: 'Auth', component: () => import('@/views/AuthPage.vue') },
    {
      path: '/legal-notice',
      name: 'LegalNotice',
      component: () => import('@/views/LegalNotice.vue'),
    },
    {
      path: '/privacy-policy',
      name: 'PrivacyPolicy',
      component: () => import('@/views/PrivacyPolicy.vue'),
    },
  ],
  scrollBehavior() {
    return { top: 0, behavior: 'smooth' }
  },
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()

  const allowedRoles = to.meta.allowedRoles
  const user = userStore.user

  if (from.path !== to.path) {
    to.meta.from = from.path
  }

  // 🆕 Redirect-Handling
  if (to.path === '/' && to.query.redirect) {
    return next({ path: `/${to.query.redirect}` })
  }

  // blocked users first
  if (user.isBlocked && to.name !== 'Auth') {
    userStore.logout_store()
    return next({ name: 'Auth', query: { reason: 'blocked' } })
  }

  // route has no limitations
  if (!allowedRoles) {
    return next()
  }

  // roles check
  const hasAccess = user.roles.some((role) => allowedRoles.includes(role))

  if (hasAccess) {
    return next()
  } else {
    return next({ name: 'Auth', query: { reason: 'unauthorized' } })
  }
})

export default router
