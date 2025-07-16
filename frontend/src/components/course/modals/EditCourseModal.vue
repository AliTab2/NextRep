<template>
  <BaseModal
    :visible="shouldShowModal"
    @close="$emit('close-edit')"
    @confirm="$emit('confirm-edit')"
  >
    <template #title>
      <h2>Wöchentlichen Kurstermin bearbeiten</h2>
    </template>
    <ChangeSelector v-model="internalValue" />
  </BaseModal>
</template>

<script>
import ModalMixin from '@/mixins/ModalMixin'
import ChangeSelector from '@/components/course/selectors/ChangeSelector.vue'
export default {
  mixins: [ModalMixin],
  components: {
    ChangeSelector,
  },
}
</script>
