<template>
  <BaseOptions label="Art der Änderung" :options="options" v-model="selectedChange" />
</template>

<script>
export default {
  props: {
    change: String,
  },
  inject: ['errorInputs'],
  data() {
    return {
      selectedChange: this.change,
      options: [
        { label: 'Nur dieser Termin', value: 'once' },
        { label: 'Dieser und alle weiteren Termine', value: 'all' },
      ],
      isInvalid: false,
    }
  },
  watch: {
    'errorInputs.value': {
      handler(inputs) {
        inputs.includes('changes') ? (this.isInvalid = true) : (this.isInvalid = false)
      },
      deep: true,
    },
    change(newVal) {
      // wenn die Prop extern aktualisiert wird
      this.selectedChange = newVal
    },
    selectedChange(newVal) {
      // wenn intern geändert wird -> an Parent weitergeben
      this.$emit('update-change', newVal)
    },
  },
}
</script>
