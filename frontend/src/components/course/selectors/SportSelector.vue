<template>
  <BaseOptions
    label="Sportart"
    :options="sportsArray"
    v-model="internalValue"
    :in-valid="isInvalid"
  />
</template>

<script>
import FormFieldMixin from '@/mixins/FormFieldMixin'
import useSportStore from '@/stores/sportStore'
import { mapActions, mapState } from 'pinia'

export default {
  mixins: [FormFieldMixin],
  async created() {
    const result = await this.getAllSports()
    if (result.error) return
  },
  methods: {
    ...mapActions(useSportStore, ['getAllSports']),
  },
  computed: {
    ...mapState(useSportStore, ['sports']),
    sportsArray() {
      return this.sports.map((s) => {
        return { label: s.sport, value: s.sport }
      })
    },
  },
}
</script>
