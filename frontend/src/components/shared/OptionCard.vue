<template>
  <div class="dashboard-option" v-if="!superadminOnly" @click="$emit('click')">
    <div class="dashboard-option__icon">
      <font-awesome-icon :icon="icon" />
    </div>
    <div class="dashboard-option__text">
      <p>{{ label }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    icon: String,
    label: String,
    superadminOnly: Boolean,
  },
}
</script>

<style>
.dashboard-option {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: calc((100% / 2) - 2rem);
  aspect-ratio: 1/1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
}

.dashboard-option__icon {
  width: 100%;
  height: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: #db1200;
}
.dashboard-option__text {
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  font-size: 1.3rem;
  color: #000;
  font-weight: bold;
}
.dashboard-option:hover {
  background-color: rgba(250, 250, 250);
  cursor: pointer;
}

@media (min-width: 400px) {
  .dashboard-option__icon {
    font-size: 4rem;
  }
  .dashboard-option__text {
    font-size: 1.6rem;
  }
}
@media (min-width: 500px) {
  .dashboard-option__icon {
    font-size: 5rem;
  }
  .dashboard-option__text {
    font-size: 1.8rem;
  }
}
@media (min-width: 576px) {
  .dashboard-option {
    width: calc((100% / 3) - 2rem);
  }
}
@media (min-width: 768px) {
  .dashboard-option {
    width: calc((100% / 4) - 2rem);
  }
  .dashboard-option__text {
    font-size: 1.8rem;
  }
}
@media (min-width: 1024px) {
  .dashboard-option {
    width: calc((100% / 6) - 2rem);
  }
  .dashboard-option__icon {
    font-size: 5rem;
  }
  .dashboard-option__text {
    font-size: 1.8rem;
  }
}
@media (min-width: 1280px) {
  .dashboard-option__icon {
    font-size: 6rem;
  }
  .dashboard-option__text {
    font-size: 2.2rem;
  }
}
</style>
