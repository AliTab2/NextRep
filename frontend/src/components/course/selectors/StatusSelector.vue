<template>
  <BaseOptions
    label="Status"
    :options="statusOptions"
    v-model="internalValue"
    :inValid="isInvalid"
  />
</template>

<script>
import { statusList } from '@/utils/base.js'
import FormFieldMixin from '@/mixins/FormFieldMixin'

export default {
  mixins: [FormFieldMixin],
  data() {
    return {
      statusOptions: statusList.map((stat) => ({ ...stat })),
    }
  },
}
</script>
