<template>
  <BaseOptions label="Wochentag" :options="days" v-model="selectedDay" :inValid="isInvalid" />
</template>

<script>
import { weekDays } from '@/utils/base.js'
export default {
  props: {
    day: [Number, String],
  },
  inject: ['errorInputs'],
  data() {
    return {
      selectedDay: this.day,
      days: weekDays.map((day) => ({ ...day })),
      isInvalid: false,
    }
  },
  watch: {
    'errorInputs.value': {
      handler(inputs) {
        inputs.includes('weekDay') ? (this.isInvalid = true) : (this.isInvalid = false)
      },
      deep: true,
    },
    day(newVal) {
      this.selectedDay = newVal
    },
    selectedDay(newVal) {
      const selected = this.days.find((day) => day.value === Number(newVal))
      const label = selected ? selected.label : ''
      this.$emit('update-day', Number(newVal), label)
    },
  },
}
</script>
