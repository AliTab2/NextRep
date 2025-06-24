<template>
  <li class="list-item" @click="$emit('click')" :style="borderStyle">
    <div class="list-item__texts">
      <p class="list-item__name">{{ label }}</p>
      <p class="list-item__meta" v-if="meta">{{ meta }}</p>
    </div>

    <div class="list-item__status">
      <template v-if="statusIcon">
        <font-awesome-icon :icon="statusIcon" size="lg" :style="statusColor" />
      </template>
      <template v-else-if="statusText">
        <p :style="statusColor">{{ statusText }}</p>
      </template>
    </div>
  </li>
</template>

<script>
export default {
  props: {
    label: String,
    meta: String,
    status: {
      type: Object,
      required: true,
    },
  },
  computed: {
    borderStyle() {
      return { borderLeft: `5px solid ${this.status.color}` }
    },
    statusColor() {
      return { color: this.status.color }
    },
    statusText() {
      return this.status.text
    },
    statusIcon() {
      return this.status.icon
    },
  },
}
</script>

<style>
.list-item {
  border-bottom: 1px solid #ddd;
  padding: 1rem 2rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex-wrap: nowrap;
  font-size: 1.2rem;
  gap: 1rem;
}

.list-item:hover {
  background-color: var(--color-secondary);
  cursor: pointer;
}

.list-item__texts {
  display: flex;
  flex-direction: column;
  flex: 1 1 70%;
}

.list-item__name {
  font-weight: bold;
  font-size: 1.4rem;
  margin-bottom: 0.3rem;
}

.list-item__meta {
  font-size: 1.2rem;
  color: #666;
}

.list-item__status {
  font-size: 1.3rem;
  font-weight: 500;
  flex: 1 1 1;
  text-align: right;
}

@media (min-width: 576px) {
  .list-item__name {
    font-size: 1.6rem;
  }
  .list-item__meta,
  .list-item__status {
    font-size: 1.4rem;
  }
}
</style>
