<template>
  <section class="course-sport">
    <BaseOptions label="Sportart" :options="courses" v-model="selectedSport" :inValid="isInvalid" />
  </section>
</template>

<script>
import { coursesList } from '@/utils/base.js'
export default {
  props: {
    sport: String,
  },
  inject: ['errorInputs'],
  data() {
    return {
      selectedSport: this.sport, // initial aus Prop setzen
      courses: coursesList.map((course) => ({ ...course })),
      isInvalid: false,
    }
  },
  watch: {
    'errorInputs.value': {
      handler(inputs) {
        inputs.includes('sport') ? (this.isInvalid = true) : (this.isInvalid = false)
      },
      deep: true,
    },
    sport(newVal) {
      // wenn die Prop extern aktualisiert wird
      this.selectedSport = newVal
    },
    selectedSport(newVal) {
      // wenn intern geändert wird -> an Parent weitergeben
      this.$emit('update-sport', newVal)
    },
  },
}
</script>
