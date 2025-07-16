<template>
  <label class="base-checkbox">
    <input
      type="checkbox"
      :value="option.value"
      :checked="modelValue.includes(option.value)"
      @change="toggleOption(option.value)"
      @click.stop=""
    />
    <span>{{ option.label }}</span>
  </label>
</template>

<script setup>
const emit = defineEmits(['update:modelValue'])

const props = defineProps({
  modelValue: {
    type: Array,
    required: true,
  },
  option: {
    type: Object,
    required: true,
  },
})

function toggleOption() {
  const newValue = [...props.modelValue]
  const index = newValue.indexOf(props.option.value)
  if (index > -1) {
    newValue.splice(index, 1)
  } else {
    newValue.push(props.option.value)
  }
  emit('update:modelValue', newValue)
}
</script>

<style scoped>
.base-checkbox {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.6rem;
  cursor: pointer;
}
.base-checkbox input {
  cursor: pointer;
}
</style>
