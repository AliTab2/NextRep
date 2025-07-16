<template>
  <div class="expanded-item">
    <font-awesome-icon class="expanded-icon" icon="fa-solid fa-turn-up" flip="horizontal" />
    <p class="expanded-text">{{ notificationLog }}</p>
  </div>
</template>

<script>
export default {
  props: {
    notificationLog: {
      type: String,
      required: true,
    },
  },
}
</script>

<style scoped>
.expanded-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}
.expanded-icon {
  color: var(--color-primary);
}
.expanded-text {
  color: var(--color-primary);
}
</style>
