<template>
  <div class="admin-dashboard">
    <OptionCard
      v-for="option in options"
      :key="option.label"
      :icon="option.icon"
      :label="option.label"
      @click="option.action"
      :superadmin-only="option.superadminOnly"
    />
  </div>
</template>

<script>
import { useSmartNavigation } from '@/composables/useSmartNavigation.js'
import { usePermission } from '@/composables/usePermission.js'
import OptionCard from '@/components/shared/OptionCard.vue'
export default {
  components: {
    OptionCard,
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
          label: 'Konten',
          action: this.navigate.bind(this, { mode: 'push', to: { name: 'AdminAccounts' } }),
          superadminOnly: !this.hasPermission('view:registered-admins'),
        },
        {
          icon: 'fa-regular fa-calendar-days',
          label: 'Kurstermine',
          action: this.navigate.bind(this, { mode: 'push', to: { name: 'AdminEvents' } }),
        },
        {
          icon: 'fa-solid fa-person-running',
          label: 'Sportarten',
          action: this.navigate.bind(this, { mode: 'push', to: { name: 'ComingSoon' } }),
        },
        {
          icon: 'fa-solid fa-receipt',
          label: 'Abrechnungen',
          action: this.navigate.bind(this, { mode: 'push', to: { name: 'ComingSoon' } }),
        },
      ],
    }
  },
}
</script>

<style scoped>
.admin-dashboard {
  padding: 4rem;
  display: flex;
  justify-content: center;
  gap: 2rem;
  width: 100%;
  flex-wrap: wrap;
}
</style>
