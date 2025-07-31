<template>
  <p class="app-header__date">{{ monthAndYear }}</p>
</template>

<script>
export default {
  props: {
    monthAndYear: {
      type: [String, null],
      required: true,
    },
  },
}
</script>

<style scoped>
.app-header__date {
  font-size: 1.4rem;
  color: var(--color-text);
}

/* Media Queries */
@media (min-width: 576px) {
  .app-header__date {
    font-size: 1.6rem;
  }
}
@media (min-width: 768px) {
  .app-header__date {
    font-size: 1.8rem;
  }
}
</style>
