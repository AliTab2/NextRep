<template>
  <BaseOptions label="Release" :options="releases" v-model="internalValue" :inValid="isInvalid" />
</template>

<script>
import FormFieldMixin from '@/mixins/FormFieldMixin'
import { generateRange } from '@/utils/calendar'

export default {
  mixins: [FormFieldMixin],
  data() {
    return {
      releases: generateRange(70, 160),
    }
  },
}
</script>
