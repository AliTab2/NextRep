<template>
  <button
    :class="['base-button', `base-button--${variant}`]"
    @click="$emit('click')"
    :type="type"
    :disabled="disabled || isLoading"
  >
    <template v-if="isLoading">
      <BaseLoader size="small" />
    </template>
    <template v-else>
      <slot />
    </template>
  </button>
</template>

<script setup>
defineProps({
  type: {
    type: String,
    default: 'button',
  },
  variant: {
    type: String,
    default: 'light',
    validator: (val) => ['light', 'dark', 'delete', 'dropdown-edit', 'dropdown-user'].includes(val),
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['click'])
</script>

<style scoped>
.base-button {
  display: flex;
  justify-content: center;
  font-size: 1.4rem;
  padding: 0.8rem 1rem;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    transform 0.1s ease;
}
.base-button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
  pointer-events: none;
}
.base-button:hover {
  transform: scale(1.02);
  opacity: 0.9;
}
@media (min-width: 768px) {
  .base-button {
    padding: 1rem 1.4rem;
  }
}
@media (min-width: 1024px) {
  .base-button {
    padding: 1.2rem 1.6rem;
  }
}
.base-button--dark {
  background-color: var(--color-text);
  color: #fff;
}
.base-button--light {
  background-color: whitesmoke;
  color: var(--color-text);
}
.base-button--delete {
  background-color: #db1200;
  color: #fff;
}
.base-button--dropdown-edit {
  background-color: white;
  color: var(--color-text);
  justify-content: flex-start;
}
.base-button--dropdown-edit:hover {
  background-color: whitesmoke;
}
.base-button--dropdown-user {
  background-color: var(--color-text);
  color: #fff;
  justify-content: flex-start;
}
.base-button--dropdown-user:hover {
  transform: scale(1);
  background-color: #666;
  opacity: 1;
}
</style>
