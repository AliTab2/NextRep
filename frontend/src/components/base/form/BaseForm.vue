<template>
  <div class="base-form">
    <h2 class="base-form__title">{{ title }}</h2>
    <form class="base-form__content">
      <slot></slot>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
  },
}
</script>

<style scoped>
.base-form {
  width: 100%;
  max-width: 100%;
  padding: 1rem;
  margin: 0 auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  background-color: var(--color-bg);
  padding: 3rem;
  border-radius: 1rem;
}

.base-form__title {
  text-align: center;
}

.base-form__title {
  font-size: 2rem;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 1rem;
}

@media (min-width: 768px) {
  .base-form__title {
    font-size: 2.4rem;
  }
}

@media (min-width: 1024px) {
  .base-form__title {
    font-size: 3rem;
  }
}

.base-form__content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
