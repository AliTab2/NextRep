<template>
  <div class="admin-dashboard">
    <div class="dashboard-greeting">
      <BaseMessage
        v-if="showGreeting"
        status="warning"
        @click="showGreeting = false"
        :auto-close="false"
        >Wilkommen zurück, {{ user.name }}
        <font-awesome-icon icon="fa-solid fa-face-grin-stars" />
      </BaseMessage>
    </div>
    <div class="dashboard-cards">
      <OptionCard
        v-for="option in options"
        :key="option.label"
        :icon="option.icon"
        :label="option.label"
        @click="option.action"
        :superadmin-only="option.superadminOnly"
      />
    </div>
  </div>
</template>

<script>
import { useSmartNavigation } from '@/composables/useSmartNavigation.js'
import { usePermission } from '@/composables/usePermission.js'
import OptionCard from '@/components/shared/OptionCard.vue'
import useUserStore from '@/stores/userStore'
import { mapState } from 'pinia'

export default {
  components: {
    OptionCard,
  },
  setup() {
    const { navigate } = useSmartNavigation()
    const { hasPermission } = usePermission()
    return { navigate, hasPermission }
  },
  computed: {
    ...mapState(useUserStore, ['user']),
  },
  data() {
    return {
      showGreeting: true,
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
          action: this.navigate.bind(this, { mode: 'push', to: { name: 'Sport' } }),
        },
        {
          icon: 'fa-solid fa-receipt',
          label: 'Abrechnungen',
          action: this.navigate.bind(this, { mode: 'push', to: { name: 'Billing' } }),
        },
      ],
    }
  },
}
</script>

<style scoped>
.admin-dashboard {
  padding: 4rem;
}

.dashboard-greeting {
  margin-bottom: 4rem;
}

.dashboard-cards {
  display: flex;
  justify-content: center;
  gap: 2rem;
  width: 100%;
  flex-wrap: wrap;
}
</style>
