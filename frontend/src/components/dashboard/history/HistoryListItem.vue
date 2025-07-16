<template>
  <SharedListItem
    :label="entry.userName"
    :status="{ color: statusColor, text: statusText }"
    :meta="fullDate"
    :expand-on-click="!isLoginAction"
  >
    <template #expanded>
      <NotficationListItemExpanded :notification-log="entry.log.log().full" />
    </template>
  </SharedListItem>
</template>

<script>
import SharedListItem from '@/components/shared/SharedListItem.vue'
import NotficationListItemExpanded from '@/components/dashboard/notification/NotficationListItemExpanded.vue'
import { calcStartTime } from '@/utils/calendar'
export default {
  components: {
    SharedListItem,
    NotficationListItemExpanded,
  },
  props: {
    entry: {
      type: Object,
      required: true,
    },
  },
  computed: {
    fullDate() {
      return `${this.creationDate} - ${this.time}`
    },
    creationDate() {
      return new Date(this.entry.createdAt).toLocaleDateString('de-DE', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })
    },
    time() {
      return calcStartTime(this.minute, this.hour)
    },
    hour() {
      return new Date(this.entry.createdAt).getHours()
    },
    minute() {
      return new Date(this.entry.createdAt).getMinutes()
    },
    isLoginAction() {
      return this.entry.action === 'login'
    },
    statusColor() {
      return '#666'
    },
    statusText() {
      return !this.isLoginAction ? this.entry.log.log().short : 'Login'
    },
  },
}
</script>
