<template>
  <div
    class="base-widget"
    :class="{
      'base-widget--preview': mode === 'preview',
      'base-widget--compact': mode === 'calendar',
    }"
    :style="{ backgroundColor: background }"
  >
    <FontAwesomeIcon v-if="icon" :icon="['fa-solid', icon]" class="base-widget__icon" />
    <span class="base-widget__label">{{ label }}</span>
  </div>
</template>

<script setup>
defineProps({
  label: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    default: '', // z.B. "dumbbell"
  },
  background: {
    type: String,
    default: '#ccc',
  },
  size: {
    type: String,
    required: false,
  },
  mode: {
    type: String,
    default: 'calendar',
  },
})
</script>

<style scoped>
.base-widget {
  display: inline-flex;
  align-items: center;
  border-radius: 9999px;
  font-weight: 600;
  color: white;
  gap: 0.6rem;
  /* word-wrap: break-word; */
}

.base-widget--compact {
  font-size: 0.7rem;
  padding: 0rem 0.5rem;
}

.base-widget--preview {
  font-size: 1.4rem;
  padding: 0.4rem 1rem;
}

.base-widget__icon {
  font-size: 1.2rem;
  color: white;
}

base-widget__label {
  line-height: 1;
  white-space: normal;
  overflow-wrap: break-word;
  word-break: keep-all;
}

@media (min-width: 576px) {
  .base-widget--compact {
    font-size: 0.8rem;
    padding: var(--space-xs) var(--space-sm);
  }
}

@media (min-width: 768px) {
  .base-widget--compact {
    font-size: 1rem;
    padding: var(--space-sm) var(--space-md);
  }

  .base-widget__icon {
    font-size: 1.2rem;
  }
}

@media (min-width: 1024px) {
  .base-widget--compact {
    font-size: 1.2rem;
    padding: 0.5rem 1rem;
  }

  .base-widget__icon {
    font-size: 1.4rem;
  }
}
</style>
