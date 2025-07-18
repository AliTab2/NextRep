<template>
  <PageContainer :is-loading="isLoading">
    <template #header>
      <PageHeader :heading="heading" />
    </template>
    <template #main>
      <DataSection :not-found="notFound" not-found-item="Einträge">
        <template #list-item>
          <HistoryListItem v-for="entry in entries" :key="entry._id" :entry="entry" />
        </template>
      </DataSection>
    </template>
  </PageContainer>
</template>

<script>
import { useHistoryStore } from '@/stores/historyStore'
import { usePermission } from '@/composables/usePermission.js'
import { mapState, mapActions } from 'pinia'
import CourseLogMessage from '@/models/CourseLogMessage'
import PageContainer from '@/components/dashboard/ui/PageContainer.vue'
import PageHeader from '@/components/dashboard/ui/PageHeader.vue'
import DataSection from '@/components/dashboard/ui/DataSection.vue'
import HistoryListItem from '@/components/dashboard/history/HistoryListItem.vue'

export default {
  components: {
    PageContainer,
    PageHeader,
    DataSection,
    HistoryListItem,
  },
  data() {
    return {
      entries: [],
      isLoading: true,
      error: false,
    }
  },
  setup() {
    const { hasPermission } = usePermission()
    return { hasPermission }
  },
  async created() {
    if (this.hasPermission('view:all-history')) {
      this.error = (await this.fetchAllHistory()).error
    } else {
      this.error = (await this.fetchUserHistory()).error
    }

    console.log(this.history)

    this.entries = this.history.map((entry) => ({
      _id: entry._id,
      createdAt: entry.createdAt,
      userName: entry.userId.name,
      action: entry.action,
      log: entry.course ? new CourseLogMessage(entry.course, entry.action) : '',
    }))

    this.isLoading = false
  },
  methods: {
    ...mapActions(useHistoryStore, ['fetchAllHistory', 'fetchUserHistory']),
  },
  computed: {
    ...mapState(useHistoryStore, ['history']),
    heading() {
      if (this.hasPermission('view:all-history')) return 'Verlauf'
      return 'Mein Verlauf'
    },
    notFound() {
      return Boolean(this.entries.length) === false || this.error
    },
  },
}
</script>
