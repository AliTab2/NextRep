<template>
  <BaseModal
    :visible="shouldShowModal"
    @close="$emit('close-delete')"
    @confirm="$emit('confirm-delete')"
  >
    <template #title>
      <h2>Sportart löschen</h2>
    </template>
    <p class="modal-label">{{ modalLabel }}</p>
  </BaseModal>
</template>

<script>
import ModalMixin from '@/mixins/ModalMixin'
import useUserStore from '@/stores/userStore'
import { mapState } from 'pinia'
export default {
  mixins: [ModalMixin],
  props: {
    sport: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapState(useUserStore, ['user']),
    modalLabel() {
      return `${this.user.name}, möchtest du die Sportart ${this.sport.sport} wirklich löschen?`
    },
  },
}
</script>

<style scoped>
.modal-label {
  margin-bottom: 1rem;
}
</style>
