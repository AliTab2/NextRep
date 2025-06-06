<template>
  <div class="base-time-group">
    <label v-if="label" class="base-label-group">{{ label }}</label>
    <div class="time-inputs">
      <BaseTimeHour v-model="internalTime.hour" :in-valid="inValid" :min="6" :max="22" />
      <span v-if="showColon" class="colon">:</span>
      <BaseTimeMinute v-model="internalTime.minute" />
    </div>
  </div>
</template>

<script setup>
import { reactive, watch } from 'vue'
import BaseTimeHour from './BaseTimeHour.vue'
import BaseTimeMinute from './BaseTimeMinute.vue'

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({ hour: '', minute: '' }),
  },
  label: String,
  inValid: Boolean,
  showColon: {
    type: Boolean,
    default: true,
  },
})

const emit = defineEmits(['update:modelValue'])

const internalTime = reactive({ ...props.modelValue })

watch(
  () => props.modelValue,
  (newVal) => {
    Object.assign(internalTime, newVal)
  },
)

watch(
  internalTime,
  (newVal) => {
    emit('update:modelValue', { ...newVal })
  },
  { deep: true },
)
</script>

<style scoped>
.base-time-group {
  display: flex;
  flex-direction: column;
  margin-bottom: var(--space-sm);
}

.base-label-group {
  margin-bottom: var(--space-xs);
  font-weight: 600;
  font-size: clamp(1rem, 2.5vw, var(--font-size-2xl));
  color: var(--color-text);
}

.time-inputs {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
}

.colon {
  font-size: clamp(1.2rem, 2vw, var(--font-size-lg));
  color: var(--color-text);
}

@media (min-width: 768px) {
  .base-label-group {
    font-size: 1.4rem;
  }
}

@media (min-width: 1024px) {
  .base-label-group {
    font-size: 1.6rem;
  }
}
</style>
