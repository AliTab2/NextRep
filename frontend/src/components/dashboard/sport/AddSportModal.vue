<template>
  <BaseModal :visible="shouldShowModal" @close="$emit('close-sport')" @confirm="confirmSport">
    <template #title>
      <h2>Sportart hinzufügen</h2>
    </template>
    <BaseInput
      :text-color="internalValue.color"
      placeholder="Einfach rein tippen!"
      label="Sport"
      v-model.trim="internalValue.sport"
      :in-valid="invalidSport"
    />
    <BaseInput label="Farbe" v-model.trim="internalValue.color" />
    <BaseInput
      label="Farbe auswählen"
      placeholder="Farbe"
      type="color"
      v-model="internalValue.color"
    />
  </BaseModal>
</template>

<script>
import ModalMixin from '@/mixins/ModalMixin'
export default {
  mixins: [ModalMixin],
  data() {
    return {
      invalidSport: false,
    }
  },
  computed: {
    isValidColor() {
      return /^#[0-9A-Fa-f]{6}$/.test(this.internalValue.color)
    },
    sportIsEmpty() {
      return this.internalValue.sport === ''
    },
  },
  methods: {
    confirmSport() {
      if (!this.isValidColor) {
        this.internalValue.color = '#000000'
      }
      if (this.sportIsEmpty) {
        this.invalidSport = true
        return
      }
      this.$emit('confirm-sport')
    },
  },
  watch: {
    'internalValue.sport'(val) {
      if (val === '') {
        this.invalidSport = true
      }
    },
  },
}
</script>

<style scoped>
.message-list {
  padding-left: 2rem;
}
.message-item {
  padding: 1rem;
}
</style>
