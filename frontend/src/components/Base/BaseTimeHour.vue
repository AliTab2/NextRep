<template>
  <div class="base-time-hour">
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
      placeholder="HH"
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
    default: 23,
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
  emit('update:modelValue', val ? Number(val) : '')
}
</script>

<style scoped>
@import '@/assets/styles/BaseTimeStyles.css';
</style>
