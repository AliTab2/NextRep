<template>
  <div class="page-header">
    <div class="page-header__left">
      <slot name="heading">
        <h1 class="heading">{{ heading }}</h1>
      </slot>
    </div>
    <div class="page-header__center">
      <slot name="middle"></slot>
    </div>
    <div class="page-header__right">
      <slot name="actions"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    heading: {
      type: String,
      required: true,
    },
  },
}
</script>

<style scoped>
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 2rem;
}
.page-header__left {
  flex: 1;
}
.page-header__center {
  flex: 1;
  text-align: center;
}
.page-header__right {
  flex-shrink: 0;
  display: flex;
  gap: 1rem;
}

.heading {
  font-size: 1.6rem;
  color: var(--color-text);
}

@media (min-width: 576px) {
  .heading {
    font-size: 1.8rem;
  }
}
@media (min-width: 768px) {
  .heading {
    font-size: 2rem;
  }
}
</style>
