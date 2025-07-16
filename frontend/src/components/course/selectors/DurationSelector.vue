<template>
  <BaseMinutePicker
    label="Dauer (Minuten)"
    :inValid="isInvalid"
    v-model="internalValue"
    :min="30"
    :max="60"
  />
</template>

<script>
import FormFieldMixin from '@/mixins/FormFieldMixin'
export default {
  mixins: [FormFieldMixin],
}
</script>
