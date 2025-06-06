import { useRouter, useRoute } from 'vue-router'

export function useSmartNavigation() {
  const router = useRouter()
  const route = useRoute()

  function navigate({ mode = 'push', to = null, fallback = '/' }) {
    if (mode === 'back') {
      const from = route.meta?.from
      if (from && from !== route.fullPath) {
        router.replace(from)
      } else {
        router.replace(fallback)
      }
    } else if (mode === 'replace' && to) {
      router.replace(to)
    } else if (mode === 'push' && to) {
      router.push(to)
    } else {
      console.warn('navigate: Ungültige Parameter', { mode, to })
    }
  }

  return { navigate }
}
