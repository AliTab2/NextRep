<template>
  <BaseModal
    :visible="shouldShowModal"
    @close="$emit('close-view')"
    @confirm="$emit('confirm-view')"
  >
    <template #title>
      <h2>Kalenderansicht anpassen</h2>
    </template>
    <ChangeSelector
      label="Art der Ansicht"
      :options="calendarViewOptions"
      v-model="internalValue"
    />
  </BaseModal>
</template>

<script>
import ChangeSelector from '@/components/course/selectors/ChangeSelector.vue'
import ModalMixin from '@/mixins/ModalMixin'
export default {
  mixins: [ModalMixin],
  components: {
    ChangeSelector,
  },
  data() {
    return {
      calendarViewOptions: [
        { label: 'Woche', value: 'full' },
        { label: 'Kompakt Mo - Mi', value: 'compact-mo-we' },
        { label: 'Kompakt Do - So', value: 'compact-th-su' },
        {
          label: 'Automatisch',
          value: [1, 2, 3].includes(new Date().getDay()) ? 'compact-mo-we' : 'compact-th-su',
        },
      ],
    }
  },
}
</script>
