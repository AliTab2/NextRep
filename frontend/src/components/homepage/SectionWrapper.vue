<template>
  <div class="section-view" :style="computedStyle" :id="id">
    <slot name="content" />
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  backgroundColor: {
    type: String,
    default: null,
  },
  backgroundImage: {
    type: String,
    default: null,
  },
  id: {
    type: String,
    default: null,
  },
})

const computedStyle = computed(() => {
  const styles = {
    backgroundColor: props.backgroundColor ?? 'transparent',
    backgroundImage: props.backgroundImage ? `url(${props.backgroundImage})` : undefined,
    backgroundSize: props.backgroundImage ? 'cover' : undefined,
    backgroundPosition: props.backgroundImage ? 'center' : undefined,
  }
  return styles
})
</script>

<style scoped>
.section-view {
  width: 100%;
  padding: 4rem 2rem;
}

@media (min-width: 576px) {
  .section-view {
    padding: 6rem 4rem;
  }
}

@media (min-width: 768px) {
  .section-view {
    padding: 8rem 6rem;
  }
}

@media (min-width: 1024px) {
  .section-view {
    padding: 10rem 8rem;
  }
}
</style>
