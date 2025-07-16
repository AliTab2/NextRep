<template>
  <CheckboxGroup
    v-model="internalValue"
    :options="trainers"
    label="Trainer"
    :in-valid="isInvalid"
    placeholder-label="Bitte wählen"
  />
</template>

<script>
import { mapActions } from 'pinia'
import useUserStore from '@/stores/userStore.js'
import FormFieldMixin from '@/mixins/FormFieldMixin'
import CheckboxGroup from '@/components/shared/CheckboxGroup.vue'

export default {
  mixins: [FormFieldMixin],
  components: {
    CheckboxGroup,
  },
  data() {
    return {
      users: [],
    }
  },
  async created() {
    const allUsers = await this.getAllUsers()
    this.users = allUsers.data
  },
  methods: {
    ...mapActions(useUserStore, ['getAllUsers']),
  },
  computed: {
    trainers() {
      return this.users
        .filter((u) => u.roles.includes('trainer'))
        .map((trainer) => ({ label: trainer.name, value: trainer._id }))
    },
  },
}
</script>
