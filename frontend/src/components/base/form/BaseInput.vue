<template>
  <div class="base-input">
    <label v-if="label" :for="inputId" class="base-label">{{ label }}</label>
    <div class="base-input__wrapper">
      <input
        :id="inputId"
        :type="type"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        @focus="isFocused = true"
        @blur="handleBlur()"
        :placeholder="placeholder"
        :class="['base-field', statusClass, `base-field--${variant}`]"
        :disabled="disabled"
        :maxlength="length"
        ref="inputRef"
      />
      <slot name="append" />
    </div>
  </div>
</template>

<script setup>
import { computed, ref, defineExpose } from 'vue'

const props = defineProps({
  modelValue: [String, Number],
  label: String,
  placeholder: String,
  type: {
    type: String,
    default: 'text',
  },
  variant: String,
  id: String,
  disabled: Boolean,
  inValid: {
    type: Boolean,
    default: false,
  },
  length: { type: String, required: false },
})

const inputRef = ref(null)
defineExpose({ focus: () => inputRef.value?.focus() })

const inputId = computed(() => props.id || `input-${Math.random().toString(36).substr(2, 9)}`)

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
    return 'base-field--error'
  }
  if (isFocused.value || isValid.value) {
    return 'base-field--focus'
  }
  return 'base-field--default'
})
</script>

<style scoped>
.base-input__wrapper {
  display: flex;
  align-items: center;
  gap: 1rem;
  .base-field {
    flex: 1;
  }
}
.base-input {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
}
.base-label {
  margin-bottom: 0.25rem;
  font-weight: 600;
  font-size: 1.4rem;
  color: var(--color-text);
}
@media (min-width: 1024px) {
  .base-label {
    font-size: 1.6rem;
  }
}
.base-field {
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
.base-field--auth {
  text-align: center;
  margin: 0;
  padding: 0;
  width: 3.5rem;
  aspect-ratio: 1;
  font-size: 1.6rem;
}
@media (min-width: 768px) {
  .base-field--auth {
    font-size: 2.4rem;
    width: 5rem;
  }
}
@media (min-width: 1024px) {
  .base-field--auth {
    font-size: 3rem;
    width: 6rem;
  }
}

.base-field--focus,
.base-field--valid {
  border-color: var(--color-border-valid);
}
.base-field--error {
  border-color: var(--color-border-error);
}
.base-field--default {
  border-color: var(--color-border-default);
}
</style>
