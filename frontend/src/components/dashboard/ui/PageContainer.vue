<template>
  <div class="page-container">
    <slot name="header"></slot>
    <BaseLoader v-if="isLoading" />
    <div v-else>
      <slot name="main"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isLoading: {
      type: Boolean,
      required: true,
    },
  },
}
</script>

<style scoped>
.page-container {
  padding: 2rem;
}
.data-list {
  list-style: none;
  width: 100%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
@media (min-width: 768px) {
  .page-container {
    padding: 4rem;
  }
}
</style>
