<template>
  <div :class="['loader-wrapper', loaderWrapperClass]">
    <span :class="['loader', loaderClass]"></span>
  </div>
</template>

<script>
export default {
  props: ['size'],
  computed: {
    loaderClass() {
      return this.size ? `loader--${this.size}` : ''
    },
    loaderWrapperClass() {
      return this.size ? `loader-wrapper--${this.size}` : ''
    },
  },
}
</script>

<style scoped>
.loader-wrapper {
  width: 100%;
  height: 6rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.loader {
  width: 3rem;
  height: 3rem;
  border: 3px solid #fff;
  border-bottom-color: var(--color-accent);
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@media (min-width: 768px) {
  .loader-wrapper {
    height: 7rem;
  }
  .loader {
    width: 3.5rem;
    height: 3.5rem;
  }
}

@media (min-width: 1024px) {
  .loader-wrapper {
    height: 8rem;
  }
  .loader {
    width: 4rem;
    height: 4rem;
  }
}

.loader-wrapper--small {
  height: fit-content;
}

.loader--small {
  width: 2.5rem;
  height: 2.5rem;
}
</style>
