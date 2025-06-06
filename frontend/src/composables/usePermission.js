import { computed } from 'vue'
import useUserStore from '@/stores/userStore'
import { ROLE_PERMISSIONS } from '@/utils/permissions.js'

export function usePermission() {
  const userStore = useUserStore()

  const roles = computed(() => userStore.user.roles || [])

  function hasPermission(permission) {
    return roles.value.some((role) => {
      const allowed = ROLE_PERMISSIONS[role]
      return allowed?.includes(permission)
    })
  }

  return { hasPermission }
}
