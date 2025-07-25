<template>
  <SharedListItem
    :label="notification.userName"
    :meta="metaInfo"
    :status="{ color: 'var(--color-text)' }"
    :show-checkbox="true"
    :checkbox-value="`${notification._id}-${notification.log.log().msg}`"
    :entry-id="notification._id"
    :checkbox-model="checkboxModel"
    @update:checkboxModel="$emit('update:checkboxModel', $event)"
    :expand-on-click="true"
  >
    <template #expanded>
      <NotficationListItemExpanded :notification-log="notification.log.log().msg" />
    </template>
  </SharedListItem>
</template>

<script>
import SharedListItem from '@/components/shared/SharedListItem.vue'
import NotficationListItemExpanded from '@/components/dashboard/notification/NotficationListItemExpanded.vue'
export default {
  components: {
    SharedListItem,
    NotficationListItemExpanded,
  },
  props: {
    notification: {
      type: Object,
      required: true,
    },
    checkboxModel: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      selectedNotifications: [],
    }
  },
  computed: {
    metaInfo() {
      return `${this.creationDate} | ${this.notification.log.log().short}`
    },
    creationDate() {
      return new Date(this.notification.createdAt).toLocaleDateString('de-DE', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })
    },
  },
}
</script>
