<template>
  <div class="app-header__brand">
    <h1 class="app-header__title" @click="navigate({ mode: 'push', to: { name: 'Calendar' } })">
      NextRep
    </h1>
    <p class="app-header__subtitle">CleverFit-Kurse</p>
  </div>
</template>

<script setup>
import { useSmartNavigation } from '@/composables/useSmartNavigation'
const { navigate } = useSmartNavigation()
</script>

<style scoped>
.app-header__brand {
  width: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  line-height: normal;
}
.app-header__title {
  font-size: 2.5rem;
  letter-spacing: -0.01em;
  color: var(--color-text);
  display: flex;
  align-items: center;
  margin-bottom: 0;
  cursor: pointer;
}
.app-header__subtitle {
  font-size: 1.4rem;
  font-weight: bold;
  color: var(--color-primary);
}
</style>
