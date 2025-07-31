<template>
  <PageContainer :is-loading="isLoading">
    <template #header>
      <NotificationPageHeader
        :selected-notifications-count="selectedNotificationsCount"
        @confirm-notification="confirmNotification"
      />
      <BaseMessage v-if="historyMessage.msg" :status="historyMessage.status" :key="Date.now()">
        {{ historyMessage.msg }}
      </BaseMessage>
    </template>
    <template #main>
      <DataSection :not-found="notFound" not-found-item="Mitteilungen">
        <template #list-item>
          <NotificationListItem
            v-for="entry in notifications"
            :key="entry._id"
            :notification="entry"
            :checkbox-model="selectedNotifications"
            @update:checkboxModel="selectedNotifications = $event"
          />
        </template>
      </DataSection>
      <NotificationModal
        :show-modal="showNotificationModal"
        v-model="selectedGroupe"
        @close-notification="showNotificationModal = false"
        @send-notification="send"
        :notifications="modalNotifications"
      />
    </template>
  </PageContainer>
</template>

<script>
import useHistoryStore from '@/stores/historyStore'
import { usePermission } from '@/composables/usePermission.js'
import { mapActions, mapState } from 'pinia'
import CourseLogMessage from '@/models/CourseLogMessage'

import PageContainer from '@/components/dashboard/ui/PageContainer.vue'
import NotificationPageHeader from '@/components/dashboard/notification/NotificationPageHeader.vue'
import DataSection from '@/components/dashboard/ui/DataSection.vue'
import NotificationListItem from '@/components/dashboard/notification/NotificationListItem.vue'
import NotificationModal from '@/components/dashboard/notification/NotificationModal.vue'
import useMessageStore from '@/stores/messageStore'

export default {
  components: {
    PageContainer,
    NotificationPageHeader,
    DataSection,
    NotificationListItem,
    NotificationModal,
  },
  mounted() {
    this.clearMessage('history')
  },
  beforeUnmount() {
    this.clearMessage('history')
  },
  data() {
    return {
      notifications: [],
      isLoading: true,
      error: false,
      selectedNotifications: [],
      showNotificationModal: false,
      selectedGroupe: 'main',
      statusMessage: '',
      statusType: '',
    }
  },
  setup() {
    const { hasPermission } = usePermission()
    return { hasPermission }
  },
  async created() {
    await this.loadNotifications()

    const filteredEntries = this.history.filter((e) => {
      return e.action !== 'login' && e.sent !== true
    })

    this.notifications = filteredEntries.map((entry) => ({
      _id: entry._id,
      createdAt: entry.createdAt,
      userName: entry.userId.name,
      action: entry.action,
      log: new CourseLogMessage(entry.course, entry.action),
    }))
  },
  methods: {
    ...mapActions(useHistoryStore, ['fetchAllHistory', 'fetchUserHistory', 'sendNotification']),
    ...mapActions(useMessageStore, ['clearMessage']),
    confirmNotification() {
      this.showNotificationModal = true
    },
    async send() {
      this.showNotificationModal = false
      const result = await this.sendNotification({
        group: this.selectedGroupe,
        notifications: this.readyToSend,
      })
      if (!result.error) await this.loadNotifications()
    },
    async loadNotifications() {
      this.isLoading = true
      if (this.hasPermission('view:all-history')) {
        this.error = (await this.fetchAllHistory()).error
      } else {
        this.error = (await this.fetchUserHistory()).error
      }
      this.isLoading = false
    },
  },
  computed: {
    ...mapState(useHistoryStore, ['history']),
    ...mapState(useMessageStore, { historyMessage: 'history' }),
    selectedNotificationsCount() {
      return this.selectedNotifications.length
    },
    notFound() {
      return Boolean(this.notifications.length) === false || this.error
    },
    readyToSend() {
      return this.selectedNotifications.map((selected) => {
        const indexOfSeperator = selected.indexOf('-')
        const selectedId = selected.slice(0, indexOfSeperator)
        const message = selected.slice(indexOfSeperator + 1)
        return { _id: selectedId, message }
      })
    },
    modalNotifications() {
      return this.readyToSend.map((obj) => obj.message)
    },
  },
}
</script>

<style scoped>
.notifications__container {
  padding: 2rem;
}
.notifications__list {
  list-style: none;
  width: 100%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
@media (min-width: 768px) {
  .notifications__container {
    padding: 4rem;
  }
}
</style>
