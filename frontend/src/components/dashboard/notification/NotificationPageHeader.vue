<template>
  <PageHeader :heading="heading">
    <template #actions>
      <base-button variant="delete" @click="$emit('confirm-notification')" :disabled="!canSend">
        <font-awesome-icon class="btn-icon" icon="fa-solid fa-paper-plane"></font-awesome-icon>
        Senden
      </base-button>
    </template>
  </PageHeader>
</template>

<script>
import PageHeader from '@/components/dashboard/ui/PageHeader.vue'
import { usePermission } from '@/composables/usePermission.js'

export default {
  components: {
    PageHeader,
  },
  props: {
    selectedNotificationsCount: {
      type: Number,
      required: true,
    },
  },
  setup() {
    const { hasPermission } = usePermission()
    return { hasPermission }
  },
  computed: {
    canSend() {
      return Boolean(this.selectedNotificationsCount)
    },
    heading() {
      if (this.hasPermission('view:all-history')) return 'Mitteilungen'
      return 'Meine Mitteilungen'
    },
  },
}
</script>

<style scoped>
.btn-icon {
  margin-right: 1rem;
}
</style>
