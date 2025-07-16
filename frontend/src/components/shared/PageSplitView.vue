<template>
  <div class="base-split-view">
    <div class="base-split-view__content">
      <div class="base-split-view__left" v-show="showForm">
        <div
          class="base-split-view__section-wrapper"
          :style="{ width: !screenIsLarge ? '90%' : leftWidth }"
        >
          <slot name="left" :screen-is-large="screenIsLarge" />
        </div>
      </div>

      <div class="base-split-view__right" v-show="showCard">
        <div
          class="base-split-view__section-wrapper"
          :style="{ width: !screenIsLarge ? '90%' : rightWidth }"
        >
          <slot name="right" :screen-is-large="screenIsLarge" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isEditing: {
      type: Boolean,
      default: false,
    },
    leftWidth: {
      type: String,
      default: '50%',
    },
    rightWidth: {
      type: String,
      default: '50%',
    },
  },
  data() {
    return {
      screenIsLarge: window.innerWidth >= 1000,
      cardVisible: true,
      formVisible: false,
    }
  },
  created() {
    window.addEventListener('resize', this.checkScreenSize)
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.checkScreenSize)
  },
  methods: {
    checkScreenSize() {
      this.screenIsLarge = window.innerWidth >= 1000
      if (this.screenIsLarge) this.cardVisible = true
    },
    handleSwitch() {
      this.cardVisible = false
      this.formVisible = true
    },
    backToCard() {
      this.cardVisible = true
      this.formVisible = false
    },
  },
  computed: {
    showForm() {
      if (this.screenIsLarge) return true
      if (!this.isEditing) return true
      return this.formVisible
    },
    showCard() {
      if (this.screenIsLarge) return this.cardVisible
      return this.isEditing && !this.formVisible
    },
    showCardButtons() {
      return !this.showForm && this.showCard
    },
    showCancelButton() {
      return !this.screenIsLarge && this.isEditing
    },
  },
}
</script>

<style scoped>
.base-split-view {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 100vh;
}

.base-split-view__content {
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: stretch; /* streckt die Seiten */
  justify-content: center;
}

.base-split-view__right,
.base-split-view__left {
  width: 100%;
  /* height: 100%; */
}

.base-split-view__right {
  background-color: white;
}

.base-split-view__section-wrapper {
  width: 90%;
  margin: 2rem auto;
}

@media (min-width: 576px) {
  .base-split-view__section-wrapper {
    width: 70%;
  }
}

@media (min-width: 768px) {
  .base-split-view__section-wrapper {
    width: 60%;
    margin-top: 4rem;
  }
}

@media (min-width: 1024px) {
  .base-split-view__left,
  .base-split-view__right {
    width: 50%;
  }

  .base-split-view__right {
    background-color: #ddd;
  }

  .base-split-view__section-wrapper {
    width: 60%;
    margin: 4rem auto;
  }
}
</style>
