<template>
  <SharedListItem
    :label="user.name"
    :status="{
      icon: statusIcon,
      color: statusColor,
    }"
    :meta="roles"
    @click="goToEditUserPage"
  />
</template>

<script>
import { useSmartNavigation } from '@/composables/useSmartNavigation.js'
import SharedListItem from '@/components/shared/SharedListItem.vue'

export default {
  components: {
    SharedListItem,
  },
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  setup() {
    const { navigate } = useSmartNavigation()
    return { navigate }
  },
  methods: {
    goToEditUserPage() {
      this.navigate({
        mode: 'push',
        to: { name: 'AdminUserEdit', params: { userId: this.user._id } },
      })
    },
  },
  computed: {
    roles() {
      return this.user.roles.join(', ')
    },
    isBlocked() {
      return this.user.isBlocked
    },
    statusIcon() {
      if (this.isBlocked) return 'fa-solid fa-user-lock'
      return 'fa-solid fa-user-check'
    },
    statusColor() {
      if (this.isBlocked) return 'var(--color-primary)'
      return 'var(--color-text)'
    },
  },
}
</script>
