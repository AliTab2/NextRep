<template>
  <div class="notfound-wrapper">
    <font-awesome-icon class="notfound-icon" icon="fa-solid fa-person-running" />
    <p class="notfound-text">Keine {{ item }} gefunden!</p>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: String,
      required: true,
    },
  },
}
</script>

<style scoped>
.notfound-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  margin-top: 6rem;
}
.notfound-icon {
  color: var(--color-primary);
  font-size: 6rem;
}
.notfound-text {
  color: var(--color-text);
  font-size: 1.4rem;
}
</style>
