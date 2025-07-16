<template>
  <PageHeader :heading="heading">
    <template #actions>
      <base-button variant="light" @click="goToAddUserPage">
        <font-awesome-icon class="btn-icon" icon="fa-solid fa-plus"></font-awesome-icon>
        Konto
      </base-button>
    </template>
  </PageHeader>
</template>

<script>
import PageHeader from '@/components/dashboard/ui/PageHeader.vue'
import { useSmartNavigation } from '@/composables/useSmartNavigation'
import { usePermission } from '@/composables/usePermission'

export default {
  components: {
    PageHeader,
  },
  setup() {
    const { navigate } = useSmartNavigation()
    const { hasPermission } = usePermission()
    return { navigate, hasPermission }
  },
  methods: {
    goToAddUserPage() {
      this.navigate({ mode: 'push', to: { name: 'AdminUserAdd' } })
    },
  },
  computed: {
    heading() {
      if (this.hasPermission('view:registered-admins')) return `Konten`
      return 'Mein Konto'
    },
  },
}
</script>

<style scoped>
.btn-icon {
  margin-right: 1rem;
}
</style>
