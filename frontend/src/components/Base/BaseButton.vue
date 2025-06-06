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
import BaseLoader from './BaseLoader.vue'

defineProps({
  type: {
    type: String,
    default: 'button',
  },
  variant: {
    type: String,
    default: 'default',
    validator: (val) => ['default', 'save', 'delete', 'dropdown'].includes(val),
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
  display: inline-flex;
  align-items: center;
  justify-content: center;

  font-size: 1.4rem;
  font-weight: 600;
  padding: 0.8rem 1rem;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    transform 0.1s ease;
  text-align: center;
}

.base-button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
  pointer-events: none;
}

/* @media (min-width: 576px) {
  .base-button {
    font-size: 1.2rem;
  }
} */

@media (min-width: 768px) {
  .base-button {
    /* font-size: 1.2rem; */
    padding: 0.8rem 1.4rem;
  }
}

@media (min-width: 1024px) {
  .base-button {
    font-size: 1.4rem;
    padding: 0.8rem 1.6rem;
  }
}

.base-button:hover {
  transform: scale(1.02);
}

.base-button--default {
  background-color: var(--color-primary);
  color: white;
}

.base-button--default:hover {
  background-color: var(--color-primary-hover);
}

.base-button--dropdown {
  background-color: var(--color-text);
  justify-content: flex-start;
}
.base-button--dropdown:hover {
  background-color: gray;
  transform: scale(1);
}
/* .base-button--save {
  background-color: var(--color-save);
  color: white;
} */

/* .base-button--save:hover {
  background-color: var(--color-save-hover);
} */

.base-button--delete {
  background-color: red;
}
.base-button--delete:hover {
  opacity: 0.9;
}
</style>
