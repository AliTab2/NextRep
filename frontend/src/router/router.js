import { createWebHistory, createRouter } from 'vue-router'
import useUserStore from '@/stores/userStore'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Calendar',
      component: () => import('@/pages/main/CalendarPage.vue'),
    },
    {
      path: '/home',
      name: 'Home',
      component: () => import('@/pages/main/HomePage.vue'),
    },
    {
      path: '/auth/login',
      name: 'Auth',
      component: () => import('@/pages/auth/LoginPage.vue'),
    },
    {
      path: '/legal-notice',
      name: 'LegalNotice',
      component: () => import('@/pages/legal/LegalNoticePage.vue'),
    },
    {
      path: '/privacy-policy',
      name: 'PrivacyPolicy',
      component: () => import('@/pages/legal/PrivacyPolicyPage.vue'),
    },
    {
      path: '/admin',
      // meta: { allowedRoles: ['superadmin', 'admin'] },
      children: [
        {
          path: 'dashboard',
          name: 'AdminDashboard',
          meta: { allowedRoles: ['superadmin', 'admin'] },
          component: () => import('@/pages/admin/AdminDashboardPage.vue'),
        },
        {
          path: 'courses/add',
          name: 'AdminCourseAdd',
          meta: { allowedRoles: ['superadmin', 'admin'] },
          component: () => import('@/pages/admin/CourseManagementPage.vue'),
        },
        {
          path: 'courses/edit/:id',
          name: 'AdminCourseEdit',
          component: () => import('@/pages/admin/CourseManagementPage.vue'),
        },
        {
          path: 'users/add',
          name: 'AdminUserAdd',
          meta: { allowedRoles: ['superadmin'] },
          component: () => import('@/pages/admin/UserManagementPage.vue'),
        },
        {
          path: 'users/edit/:id',
          name: 'AdminUserEdit',
          meta: { allowedRoles: ['superadmin'] },
          component: () => import('@/pages/admin/UserManagementPage.vue'),
        },
        {
          path: 'events',
          name: 'AdminEvents',
          meta: { allowedRoles: ['superadmin', 'admin'] },
          component: () => import('@/pages/admin/CourseEventsPage.vue'),
        },
        {
          path: 'notifications',
          name: 'AdminNotifications',
          meta: { allowedRoles: ['superadmin', 'admin'] },
          component: () => import('@/pages/admin/NotificationsPage.vue'),
        },
        {
          path: 'history',
          name: 'AdminHistory',
          meta: { allowedRoles: ['superadmin', 'admin'] },
          component: () => import('@/pages/admin/HistoryPage.vue'),
        },
        {
          path: 'accounts',
          name: 'AdminAccounts',
          meta: { allowedRoles: ['superadmin', 'admin'] },
          component: () => import('@/pages/admin/AccountsPage.vue'),
        },
      ],
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
