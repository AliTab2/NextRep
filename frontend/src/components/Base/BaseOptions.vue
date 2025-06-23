<template>
  <div class="base-options">
    <label v-if="label" :for="selectId" class="base-label">{{ label }}</label>
    <select
      :id="selectId"
      class="base-select"
      :class="statusClass"
      :value="modelValue"
      @change="handleChange"
      @focus="isFocused = true"
      @blur="handleBlur()"
      :disabled="disabled"
      required
    >
      <option disabled value="">{{ placeholder || 'Bitte wählen' }}</option>
      <option v-for="option in options" :key="option.value" :value="option.value">
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const emit = defineEmits(['update:modelValue', 'optionSelected'])

function handleChange(event) {
  const selectedValue = event.target.value
  emit('update:modelValue', selectedValue)
  emit('optionSelected', selectedValue)
}

const props = defineProps({
  modelValue: [String, Number],
  options: {
    type: Array,
    required: true,
    // Format: [{ label: 'Montag', value: 'monday' }]
  },

  label: String,
  placeholder: String,
  disabled: Boolean,
  id: String,
  inValid: {
    type: Boolean,
    default: false,
  },
})

const selectId = computed(() => props.id || `select-${Math.random().toString(36).slice(2, 9)}`)

function handleBlur() {
  isFocused.value = false
}

const isFocused = ref(false)

const isValid = computed(() => {
  return !!props.modelValue // leer = ungültig
})

const shouldShowError = computed(() => {
  // Nur Fehler anzeigen, wenn vom Parent als Fehler markiert UND der Input noch leer ist
  return props.inValid && !isValid.value
})

const statusClass = computed(() => {
  if (shouldShowError.value) {
    return 'base-select--error'
  }
  if (isFocused.value || isValid.value) {
    return 'base-select--focus'
  }
  return 'base-select--default'
})
</script>

<style scoped>
.base-options {
  display: flex;
  flex-direction: column;
  margin-bottom: var(--space-md);
}

.base-label {
  margin-bottom: var(--space-xs);
  font-weight: 600;
  font-size: 1.4rem;
  color: var(--color-text);
}

@media (min-width: 768px) {
  .base-label {
    font-size: 1.4rem;
  }
}

@media (min-width: 1024px) {
  .base-label {
    font-size: 1.6rem;
  }
}

.base-select {
  padding: 1rem 0.8rem;
  font-size: 1.6rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  appearance: none;
  width: 100%;
  outline: 0;
  background-color: white;
  transition: border-color 0.2s ease;
}

@media (min-width: 768px) {
  .base-select {
    font-size: 1.6rem;
    padding: 1rem 0.8rem;
  }
}

@media (min-width: 1024px) {
  .base-select {
    font-size: 1.6rem;
    padding: 1rem 0.8rem;
  }
}

.base-select--focus {
  border-color: #64b5f6;
}

.base-select--valid {
  border-color: #64b5f6;
}

.base-select--error {
  border-color: #e53935;
}

.base-select--default {
  border-color: #999;
}
</style>
