<template>
  <NotFound v-if="notFound" :item="notFoundItem" />
  <ul v-else class="data-list">
    <slot name="list-item"></slot>
  </ul>
</template>

<script>
import NotFound from '@/components/shared/NotFound.vue'

export default {
  components: {
    NotFound,
  },
  props: {
    notFound: {
      type: Boolean,
      required: true,
    },
    notFoundItem: {
      type: String,
      required: true,
    },
  },
}
</script>

<style scoped>
.data-list {
  list-style: none;
  width: 100%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
</style>
