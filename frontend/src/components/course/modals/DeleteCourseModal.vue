<template>
  <BaseModal
    :visible="shouldShowModal"
    @close="$emit('close-delete')"
    @confirm="$emit('confirm-delete')"
  >
    <template #title>
      <h2>Kurs löschen</h2>
    </template>
    <p class="modal-label">{{ modalLabel }}</p>
    <ChangeSelector v-if="courseIsRecurring" label="Art des Löschens" v-model="internalValue" />
  </BaseModal>
</template>

<script>
import ChangeSelector from '@/components/course/selectors/ChangeSelector.vue'
import ModalMixin from '@/mixins/ModalMixin'
import useUserStore from '@/stores/userStore'
import { mapState } from 'pinia'
export default {
  mixins: [ModalMixin],
  props: {
    recurrencePattern: {
      type: String,
      required: true,
    },
  },
  components: {
    ChangeSelector,
  },
  computed: {
    ...mapState(useUserStore, ['user']),
    modalLabel() {
      return `${this.user.name}, möchtest du den Kurstermin wirklich löschen?`
    },
    courseIsRecurring() {
      return this.recurrencePattern.includes('weekly')
    },
  },
}
</script>

<style scoped>
.modal-label {
  margin-bottom: 1rem;
}
</style>
