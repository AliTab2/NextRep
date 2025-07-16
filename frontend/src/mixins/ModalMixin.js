export default {
  props: {
    showModal: Boolean,
    modelValue: [String, Object, Number],
  },
  data() {
    return {
      shouldShowModal: this.showModal,
    }
  },
  watch: {
    showModal(val) {
      this.shouldShowModal = val
    },
  },
  computed: {
    internalValue: {
      get() {
        return this.modelValue
      },
      set(val) {
        this.$emit('update:modelValue', val)
      },
    },
  },
}
