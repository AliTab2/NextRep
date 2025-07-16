<template>
  <BaseModal
    :visible="shouldShowModal"
    @close="$emit('close-notification')"
    @confirm="$emit('send-notification')"
  >
    <template #title>
      <h2>Mitteilung senden</h2>
    </template>
    <BaseOptions label="WhatsApp Gruppe" :options="groups" v-model="internalValue" />
    <ul class="message-list">
      <li class="message-item" v-for="(message, i) in notifications" :key="i">
        {{ message }}
      </li>
    </ul>
  </BaseModal>
</template>

<script>
import ModalMixin from '@/mixins/ModalMixin'
import { whatsAppGroups } from '@/utils/base'
export default {
  mixins: [ModalMixin],
  props: {
    notifications: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      groups: whatsAppGroups,
    }
  },
}
</script>

<style scoped>
.message-list {
  padding-left: 2rem;
}
.message-item {
  padding: 1rem;
}
</style>
