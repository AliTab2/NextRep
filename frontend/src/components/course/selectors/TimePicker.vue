<template>
  <div class="base-time-group">
    <label v-if="label" class="base-label-group">{{ label }}</label>
    <div class="time-inputs">
      <BaseHourPicker v-model="internalValue.hour" :inValid="isInvalid" :min="6" :max="22" />
      <span class="colon">:</span>
      <BaseMinutePicker v-model="internalValue.minute" />
    </div>
  </div>
</template>

<script>
import FormFieldMixin from '@/mixins/FormFieldMixin'
export default {
  mixins: [FormFieldMixin],
  props: {
    label: String,
  },
}
</script>

<style scoped>
.base-time-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 0.5rem;
}
.base-label-group {
  margin-bottom: 0.25rem;
  font-weight: 600;
  color: var(--color-text);
  font-size: 1.4rem;
}
.time-inputs {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}
.colon {
  color: var(--color-text);
}

@media (min-width: 1024px) {
  .base-label-group {
    font-size: 1.6rem;
  }
}
</style>
