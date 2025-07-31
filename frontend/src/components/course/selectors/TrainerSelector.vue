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
import { mapActions, mapState } from 'pinia'
import useUserStore from '@/stores/userStore.js'
import FormFieldMixin from '@/mixins/FormFieldMixin'
import CheckboxGroup from '@/components/shared/CheckboxGroup.vue'

export default {
  mixins: [FormFieldMixin],
  components: {
    CheckboxGroup,
  },
  async created() {
    const res = await this.getAllUsers()
    if (res.error) return
  },
  methods: {
    ...mapActions(useUserStore, ['getAllUsers']),
  },
  computed: {
    ...mapState(useUserStore, ['users']),
    trainers() {
      return this.users
        .filter((u) => u.roles.includes('trainer'))
        .map((trainer) => ({ label: trainer.name, value: trainer._id }))
    },
  },
}
</script>
