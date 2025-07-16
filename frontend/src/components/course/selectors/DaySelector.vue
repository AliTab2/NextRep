<template>
  <BaseOptions label="Wochentag" :options="days" v-model="internalValue" :in-valid="isInvalid" />
</template>

<script>
import { weekDays } from '@/utils/base.js'
import FormFieldMixin from '@/mixins/FormFieldMixin'
export default {
  mixins: [FormFieldMixin],
  data() {
    return {
      days: weekDays.map((day) => ({ ...day })),
    }
  },
}
</script>
