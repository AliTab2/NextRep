<template>
  <BaseOptions label="Trainer" :options="trainers" v-model="selectedTrainer" :inValid="isInvalid" />
</template>

<script>
import { mapActions } from 'pinia'
import useUserStore from '@/stores/userStore.js'

export default {
  props: {
    trainer: String,
  },
  inject: ['errorInputs'],
  data() {
    return {
      selectedTrainer: this.trainer,
      isInvalid: false,
      users: [],
    }
  },
  async created() {
    const allUsers = await this.getUsers_store()
    this.users = allUsers.data
  },
  methods: {
    ...mapActions(useUserStore, ['getUsers_store']),
  },
  computed: {
    trainers() {
      return this.users
        .filter((u) => u.roles.includes('trainer'))
        .map((trainer) => ({ label: trainer.name, value: trainer._id }))
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
    selectedTrainer(trainerId) {
      const trainer = this.users.find((u) => u._id.toString() === trainerId.toString())
      this.$emit('update-trainer', trainerId, trainer.name)
    },
  },
}
</script>
