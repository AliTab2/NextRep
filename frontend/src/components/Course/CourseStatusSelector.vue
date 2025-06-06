<template>
  <BaseOptions
    label="Status"
    :options="statusOptions"
    v-model="selectedStatus"
    :inValid="isInvalid"
  />
</template>

<script>
import { statusList } from '@/utils/base.js'
export default {
  props: {
    status: String,
  },
  inject: ['errorInputs'],
  data() {
    return {
      selectedStatus: this.status,
      statusOptions: statusList.map((stat) => ({ ...stat })),
      isInvalid: false,
    }
  },
  watch: {
    'errorInputs.value': {
      handler(inputs) {
        inputs.includes('status') ? (this.isInvalid = true) : (this.isInvalid = false)
      },
      deep: true,
    },
    status(newVal) {
      this.selectedStatus = newVal
    },
    selectedStatus(newVal) {
      this.$emit('update-status', newVal)
    },
  },
}
</script>
