<template>
  <BaseOptions label="Trainer" :options="trainers" v-model="selectedTrainer" :inValid="isInvalid" />
</template>

<script>
import { mapState } from 'pinia'
import useUserStore from '@/stores/userStore'

export default {
  props: {
    trainer: String,
  },
  inject: ['errorInputs'],
  data() {
    return {
      selectedTrainer: this.trainer,
      isInvalid: false,
    }
  },
  computed: {
    ...mapState(useUserStore, ['users']),
    trainers() {
      return this.users
        .filter((u) => u.roles.includes('trainer'))
        .map((trainer) => ({ label: trainer.name, value: trainer.name }))
    },
  },
  watch: {
    'errorInputs.value': {
      handler(inputs) {
        this.isInvalid = inputs.includes('trainer')
      },
      deep: true,
    },
    trainer(newVal) {
      this.selectedTrainer = newVal
    },
    selectedTrainer(newVal) {
      this.$emit('update-trainer', newVal)
    },
  },
}
</script>
