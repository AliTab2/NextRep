<template>
  <PageHeader :heading="heading">
    <template #actions>
      <base-button variant="light" @click="goToAddCoursePage">
        <font-awesome-icon class="btn-icon" icon="fa-solid fa-calendar-plus"></font-awesome-icon>
        Kurstermin
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
    goToAddCoursePage() {
      this.navigate({ mode: 'push', to: { name: 'AdminCourseAdd' } })
    },
  },
  computed: {
    heading() {
      if (this.hasPermission('view:registered-courses')) return `Kurstermine`
      return `Meine Kurstermine`
    },
  },
}
</script>

<style scoped>
.btn-icon {
  margin-right: 1rem;
}
</style>
