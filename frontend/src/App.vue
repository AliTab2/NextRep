<template>
  <div class="app-container">
    <NavBar />
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>
<!-- 
<template>
  <div class="app-container">
    <NavBar />
    <router-view />
  </div>
</template> -->

<script>
import NavBar from '@/components/Nav/NavBar.vue'
import useUserStore from '@/stores/userStore.js'
import { mapActions, mapState } from 'pinia'
import { useSmartNavigation } from '@/composables/useSmartNavigation.js'

export default {
  components: {
    NavBar,
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
      this.navigate({ mode: 'push', to: { name: 'Admin' } })
    }
  },
}
</script>

<style>
.app-container {
  display: flex;
  flex-direction: column;
  flex: 1; /* Füge das hinzu */
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
