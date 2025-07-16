export default {
  props: {
    modelValue: [String, Object, Number],
    invalidInputs: Object,
    fieldName: String,
  },
  computed: {
    isInvalid() {
      return this.invalidInputs?.value?.includes(this.fieldName)
    },
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
