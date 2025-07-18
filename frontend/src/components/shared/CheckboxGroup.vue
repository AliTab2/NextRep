<template>
  <div class="base-checkbox-group">
    <label v-if="label" class="base-label">{{ label }}</label>
    <div
      class="checkbox-container"
      :class="statusClass"
      tabindex="0"
      @focus="hasFocus = true"
      @blur="hasFocus = false"
      @click.stop="showOptions"
    >
      <p class="placeholder-values" v-if="shouldShowSelectedValues">{{ showSelectedValues }}</p>
      <p class="placeholder-default" v-else>{{ placeholderLabel }}</p>
      <transition name="collapse">
        <div class="checkbox-list" v-show="isOpen" @click.stop="">
          <label v-for="option in options" :key="option.value" class="checkbox-item">
            <input
              type="checkbox"
              :value="option.value"
              :checked="checkedValues.includes(option.value)"
              @change="toggleOption(option.value)"
            />
            <span>{{ option.label }}</span>
          </label>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const emit = defineEmits(['update:modelValue'])

const props = defineProps({
  modelValue: {
    type: Array,
    required: true,
  },
  options: {
    type: Array,
    required: true,
  },
  label: String,
  placeholderLabel: String,
  inValid: {
    type: Boolean,
    default: false,
  },
})

const isOpen = ref(false)
const hasFocus = ref(false)

function toggleOption(value) {
  const newValue = checkedValues.value
  const index = newValue.indexOf(value)

  if (index > -1) {
    newValue.splice(index, 1)
  } else {
    newValue.push(value)
  }

  emit('update:modelValue', newValue)
}

function showOptions() {
  isOpen.value = !isOpen.value
}

const selectedValues = computed(() => {
  if (!props.modelValue.length) return []
  // two forms: [ { 0: id } ] OR [ { _id: ... } ]
  const normalizedArray = props.modelValue.map((obj) => ({
    _id: obj._id ?? obj,
  }))
  return normalizedArray.map((normalizedTrainer) => {
    const trainer = props.options.find(
      (t) => t.value.toString() === normalizedTrainer._id.toString(),
    )
    return trainer
  })
})

const showSelectedValues = computed(() => {
  return selectedValues.value
    .filter(Boolean)
    .map((obj) => obj.label)
    .join(', ')
})

const shouldShowSelectedValues = computed(() => {
  return selectedValues.value.length > 0
})

const checkedValues = computed(() => {
  return selectedValues.value.map((obj) => obj.value)
})

const statusClass = computed(() => {
  if (hasFocus.value || props.modelValue.length > 0) {
    return 'base-field--focus'
  } else if (props.inValid) {
    return 'base-field--error'
  } else {
    return 'base-field--default'
  }
})
</script>

<style scoped>
.base-checkbox-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
}

.base-label {
  margin-bottom: 0.25rem;
  font-weight: 600;
  font-size: 1.4rem;
  color: var(--color-text);
  cursor: pointer;
}

.checkbox-list {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.checkbox-container {
  padding: 0.8rem;
  font-size: 1.6rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  appearance: none;
  width: 100%;
  outline: 0;
  background-color: white;
  transition: border-color 0.2s ease;
}

.base-field--focus {
  border-color: #64b5f6;
}

.base-field--valid {
  border-color: #64b5f6;
}

.base-field--error {
  border-color: #e53935;
}

.base-field--default {
  border-color: #999;
}

.placeholder-default {
  font-size: 1.6rem;
  color: gray;
  cursor: pointer;
}
.placeholder-values {
  font-size: 1.6rem;
  cursor: pointer;
}

.checkbox-item {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-size: 1.6rem;
  color: var(--color-text);
}
.checkbox-item:hover {
  /* background-color: var(--color-secondary); */
  background-color: #f5f5f5;
}

@media (min-width: 768px) {
  .checkbox-item {
    font-size: 1.6rem;
  }
}

@media (min-width: 1024px) {
  .base-label {
    font-size: 1.6rem;
  }
  .checkbox-item {
    font-size: 1.6rem;
  }
}

/* Collapse-Animation */
.collapse-enter-active,
.collapse-leave-active {
  transition:
    max-height 0.3s ease,
    opacity 0.3s ease;
  overflow: hidden;
}

.collapse-enter-from,
.collapse-leave-to {
  max-height: 0;
  opacity: 0;
}

.collapse-enter-to,
.collapse-leave-from {
  max-height: 500px;
  opacity: 1;
}
</style>
