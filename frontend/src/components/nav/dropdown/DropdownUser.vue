<template>
  <div class="user-menu__dropdown">
    <DropdownButton
      label="Kurstermin"
      @click="navigate({ mode: 'push', to: { name: 'AdminCourseAdd' } })"
      :visible="showAddCourseButton"
      icon="fa-solid fa-calendar-plus"
    />
    <DropdownButton
      label="Einstellungen"
      @click="navigate({ mode: 'push', to: { name: 'AdminDashboard' } })"
      :visible="hasPermission('access:settings')"
      icon="fa-solid fa-gear"
    />
    <DropdownButton
      label="Homepage"
      @click="navigate({ mode: 'push', to: { name: 'Home' } })"
      :visible="!isHomePage"
      icon="fa-solid fa-circle-notch"
    />
    <DropdownButton
      label="Kalender"
      @click="navigate({ mode: 'push', to: { name: 'Calendar' } })"
      :visible="!isCalendarPage"
      icon="fa-regular fa-calendar-days"
    />
    <DropdownButton
      label="Anmelden"
      @click="navigate({ mode: 'push', to: { name: 'Auth' } })"
      :visible="showLoginButton"
      icon="fa-solid fa-arrow-right-to-bracket"
    />
    <DropdownButton
      label="Exportieren"
      :visible="isCalendarPage && isLoggedIn"
      @click="$emit('open-export-modal')"
      icon="fa-solid fa-arrow-up-from-bracket"
    />
    <DropdownButton
      label="Ansicht"
      :visible="isCalendarPage"
      @click="$emit('open-view-modal')"
      icon="fa-solid fa-expand"
    />
    <DropdownButton
      label="Abmelden"
      :visible="showLogoutButton"
      @click="logoutUser"
      icon="fa-solid fa-arrow-right-from-bracket"
    />
  </div>
</template>

<script>
import DropdownButton from '@/components/nav/dropdown/DropdownButton.vue'
import { usePermission } from '@/composables/usePermission.js'
import { useSmartNavigation } from '@/composables/useSmartNavigation.js'
import useUserStore from '@/stores/userStore'
import { mapState, mapActions } from 'pinia'

export default {
  components: {
    DropdownButton,
  },
  setup() {
    const { hasPermission } = usePermission()
    const { navigate } = useSmartNavigation()

    return {
      hasPermission,
      navigate,
    }
  },
  methods: {
    ...mapActions(useUserStore, ['logout']),
    logoutUser() {
      this.logout()
      this.navigate({ mode: 'push', to: { name: 'Calendar' } })
    },
  },
  computed: {
    ...mapState(useUserStore, ['isLoggedIn']),
    isCalendarPage() {
      return this.$route.name.includes('Calendar')
    },
    isHomePage() {
      return this.$route.name.includes('Home')
    },
    isAuthPage() {
      return this.$route.name.includes('Auth')
    },
    showAddCourseButton() {
      return (
        this.hasPermission('add:course') &&
        this.$route.name !== 'AdminCourseAdd' &&
        this.$route.name !== 'AdminCourseEdit' &&
        this.isCalendarPage
      )
    },
    showLoginButton() {
      return !this.isLoggedIn && !this.isAuthPage
    },
    showLogoutButton() {
      return this.isLoggedIn && !this.isAuthPage
    },
  },
}
</script>

<style scoped>
.user-menu__dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  background-color: var(--color-text);
  border-radius: 0.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 0.5rem;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  min-width: 15rem;
  gap: 1rem;
}

.overview-icon {
  margin-right: 1rem;
}

@media (min-width: 768px) {
  .user-menu__dropdown {
    min-width: 16rem;
  }
}
</style>
