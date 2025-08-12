<template>
  <div class="base-time-minute">
    <label v-if="label" class="base-label">{{ label }}</label>
    <input
      type="number"
      class="time-field"
      :class="statusClass"
      :min="min"
      :max="max"
      :value="modelValue"
      @input="updateValue($event.target.value)"
      @focus="isFocused = true"
      @blur="isFocused = false"
      placeholder="MM"
      step="5"
    />
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  modelValue: [Number, String],
  label: String,
  inValid: Boolean,
  min: {
    type: Number,
    default: 0,
  },
  max: {
    type: Number,
    default: 59,
  },
})

const emit = defineEmits(['update:modelValue'])

const isFocused = ref(false)
const hasInput = computed(
  () =>
    props.modelValue !== '' &&
    props.modelValue !== null &&
    !isNaN(props.modelValue) &&
    props.modelValue !== 0,
)

const shouldShowError = computed(() => props.inValid && !hasInput.value)

const statusClass = computed(() => {
  if (shouldShowError.value) return 'time-field--error'
  if (isFocused.value || hasInput.value) return 'time-field--focus'
  return 'time-field--default'
})

function updateValue(val) {
  emit('update:modelValue', val && val > -1 ? Number(val) : 0)
}
</script>

<style scoped>
@import '@/assets/styles/BaseTimeStyles.css';
</style>
