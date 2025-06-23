<template>
  <div class="admin-dashboard">
    <DashboardOptionCard
      v-for="option in options"
      :key="option.label"
      :icon="option.icon"
      :label="option.label"
      @click="option.action"
    />
  </div>
</template>

<script>
import { useSmartNavigation } from '@/composables/useSmartNavigation.js'
import { usePermission } from '@/composables/usePermission.js'
import DashboardOptionCard from '@/components/Dashboard/DashboardOptionCard.vue'
export default {
  components: {
    DashboardOptionCard,
  },
  setup() {
    const { navigate } = useSmartNavigation()
    const { hasPermission } = usePermission()
    return { navigate, hasPermission }
  },
  data() {
    return {
      options: [
        {
          icon: 'fa-solid fa-paper-plane',
          label: 'Mitteilungen',
          action: this.navigate.bind(this, { mode: 'push', to: { name: 'AdminNotifications' } }),
        },
        {
          icon: 'fa-solid fa-clock-rotate-left',
          label: 'Verlauf',
          action: this.navigate.bind(this, { mode: 'push', to: { name: 'AdminHistory' } }),
        },
        {
          icon: 'fa-solid fa-users',
          label: this.hasPermission('view:registered-admins') ? 'Konten' : 'Konto',
          action: this.navigate.bind(this, { mode: 'push', to: { name: 'AdminAccounts' } }),
        },
        {
          icon: 'fa-regular fa-calendar-days',
          label: 'Kurstermine',
          action: this.navigate.bind(this, { mode: 'push', to: { name: 'AdminEvents' } }),
        },
      ],
    }
  },
}
</script>

<style scoped>
.admin-dashboard {
  padding: var(--space-xl);
  display: flex;
  justify-content: center;
  gap: 2rem;
  width: 100%;
  flex-wrap: wrap;
}
</style>
