<template>
  <BaseTimeGroup label="Uhrzeit" :inValid="isInvalid" v-model="localTime" />
</template>

<script>
export default {
  props: {
    hour: Number,
    minutes: Number,
  },
  inject: ['errorInputs'],
  data() {
    return {
      localTime: {
        hour: this.hour ?? 0,
        minute: this.minutes ?? 0,
      },
      isInvalid: false,
    }
  },
  watch: {
    'errorInputs.value': {
      handler(inputs) {
        inputs.includes('hour') ? (this.isInvalid = true) : (this.isInvalid = false)
      },
      deep: true,
    },
    hour(newVal) {
      this.localTime.hour = newVal
    },
    minutes(newVal) {
      this.localTime.minute = newVal
    },
    'localTime.hour'(newVal) {
      this.$emit('update-hour', Number(newVal))
    },
    'localTime.minute'(newVal) {
      this.$emit('update-minute', Number(newVal))
    },
  },
}
</script>
