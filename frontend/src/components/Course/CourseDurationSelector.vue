<template>
  <BaseTimeMinute
    label="Dauer (Minuten)"
    :inValid="isInvalid"
    v-model="localDuration.minute"
    :min="30"
    :max="60"
  />
</template>

<script>
export default {
  props: {
    duration: [String, Number],
  },
  inject: ['errorInputs'],
  data() {
    return {
      localDuration: {
        minute: this.duration ?? 0,
      },
      isInvalid: false,
    }
  },
  watch: {
    'errorInputs.value': {
      handler(inputs) {
        inputs.includes('duration') ? (this.isInvalid = true) : (this.isInvalid = false)
      },
      deep: true,
    },
    duration(newVal) {
      this.localDuration.minute = newVal
    },
    'localDuration.minute'(newVal) {
      this.$emit('update-duration', Number(newVal))
    },
  },
}
</script>
