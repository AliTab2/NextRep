<template>
  <BaseOptions :label="label" :options="options" v-model="internalValue" />
</template>

<script>
import FormFieldMixin from '@/mixins/FormFieldMixin'
export default {
  mixins: [FormFieldMixin],
  props: {
    options: {
      type: Array,
      required: false,
      default: () => [
        { label: 'Nur diesen Termin', value: 'once' },
        { label: 'Alle Termine', value: 'all' },
      ],
    },
    label: {
      type: String,
      required: false,
      default: () => 'Art der Änderung',
    },
  },
}
</script>
