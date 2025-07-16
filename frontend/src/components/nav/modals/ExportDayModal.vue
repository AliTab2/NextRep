<template>
  <BaseModal
    :visible="shouldShowModal"
    @close="$emit('close-export')"
    @confirm="$emit('confirm-export')"
  >
    <template #title>
      <h2>Flyer generieren</h2>
    </template>
    <BaseInput :label="modalLabel" placeholder="Optional" v-model="internalValue" />
    <h3>Klicke nach dem Bestätigen einfach auf einen Tag!</h3>
  </BaseModal>
</template>

<script>
import useUserStore from '@/stores/userStore'
import { mapState } from 'pinia'
import ModalMixin from '@/mixins/ModalMixin'
export default {
  mixins: [ModalMixin],
  computed: {
    ...mapState(useUserStore, ['user']),
    modalLabel() {
      return `${this.user.name}, möchtest du was dazu notieren?`
    },
  },
}
</script>
