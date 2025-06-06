<template>
  <BaseOptions
    label="Wiederholung"
    :options="options"
    v-model="selectedOption"
    :inValid="isInvalid"
  />
</template>

<script>
export default {
  props: {
    recurring: Boolean, // true oder false vom Parent
  },
  inject: ['errorInputs'],
  data() {
    return {
      selectedOption: '',
      options: [
        { label: 'Wiederkehrend', value: 'recurring' },
        { label: 'Einmalig', value: 'once' },
      ],
      isInvalid: false,
    }
  },
  watch: {
    'errorInputs.value': {
      handler(inputs) {
        inputs.includes('recurring') ? (this.isInvalid = true) : (this.isInvalid = false)
      },
      deep: true,
    },
    recurring(newVal) {
      this.selectedOption = newVal ? 'recurring' : 'once'
    },
    selectedOption(newVal) {
      this.$emit('update-recurring', newVal)
    },
  },
  mounted() {
    if (this.$route.name === 'AddCourse') this.selectedOption = ''
    else {
      if (this.recurring) {
        this.selectedOption = 'recurring'
      } else {
        this.selectedOption = 'once'
      }
    }
  },
}
</script>
