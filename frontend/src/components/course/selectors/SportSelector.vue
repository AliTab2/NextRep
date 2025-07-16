<template>
  <BaseOptions label="Sportart" :options="courses" v-model="internalValue" :in-valid="isInvalid" />
</template>

<script>
import FormFieldMixin from '@/mixins/FormFieldMixin'
import { coursesList } from '@/utils/base.js'

export default {
  mixins: [FormFieldMixin],
  data() {
    return {
      courses: coursesList.map((c) => ({ ...c })),
    }
  },
}
</script>
