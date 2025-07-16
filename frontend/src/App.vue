<template>
  <div class="app-container">
    <TheNavbar />
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script>
import TheNavbar from '@/components/nav/main/TheNavbar.vue'
import useUserStore from '@/stores/userStore.js'
import { mapActions, mapState } from 'pinia'
import { useSmartNavigation } from '@/composables/useSmartNavigation.js'

export default {
  components: {
    TheNavbar,
  },
  setup() {
    const { navigate } = useSmartNavigation()
    return { navigate }
  },
  methods: {
    ...mapActions(useUserStore, ['restoreSession']),
  },
  computed: {
    ...mapState(useUserStore, ['isLoggedIn']),
  },
  async mounted() {
    await this.restoreSession()
    if (this.isLoggedIn) {
      this.navigate({ mode: 'push', to: { name: 'Calendar' } })
    }
  },
}
</script>

<style>
.app-container {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 100vh;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
