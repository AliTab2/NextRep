<template>
  <BaseOptions
    label="Wiederholung"
    :options="options"
    v-model="internalValue"
    :inValid="isInvalid"
  />
</template>

<script>
import FormFieldMixin from '@/mixins/FormFieldMixin'
export default {
  mixins: [FormFieldMixin],
  data() {
    return {
      options: [
        { label: 'Wöchentlich', value: 'weekly' },
        { label: 'Einmalig', value: 'once' },
      ],
    }
  },
}
</script>
