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
  font-size: 1.3rem;
  color: var(--color-text);
  display: flex;
  align-items: center;
  margin-left: auto;
  margin-bottom: 0;
}

/* Media Queries */
@media (min-width: 576px) {
  .app-header__date {
    font-size: 1.2rem;
  }
}
@media (min-width: 768px) {
  .app-header__date {
    font-size: 1.4rem;
  }
}
@media (min-width: 1024px) {
  .app-header__date {
    font-size: 1.6rem;
  }
}
</style>
