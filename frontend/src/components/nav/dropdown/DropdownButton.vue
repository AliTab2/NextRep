<template>
  <base-button variant="dropdown-user" @click="$emit('click')" v-if="visible">
    <font-awesome-icon v-if="icon" class="dropdown-icon" :icon="icon" />
    <slot>{{ label }}</slot>
  </base-button>
</template>

<script setup>
defineProps({
  label: String,
  icon: [String, Array],
  visible: { type: Boolean, default: true },
})
defineEmits(['click'])
</script>

<style scoped>
.dropdown-icon {
  margin-right: 1rem;
}
</style>
