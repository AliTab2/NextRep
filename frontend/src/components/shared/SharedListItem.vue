<template>
  <li class="list-item">
    <div class="list-item__main" :style="borderStyle" @click="toggleExpanded">
      <div class="list-item__texts">
        <p class="list-item__name">{{ label }}</p>
        <p class="list-item__meta" v-if="meta">{{ meta }}</p>
      </div>

      <div class="list-item__status">
        <template v-if="showCheckbox">
          <BaseCheckbox
            :option="{ label: checkboxLabel, value: checkboxValue }"
            :model-value="checkboxModel"
            @update:modelValue="$emit('update:checkboxModel', $event)"
          />
        </template>
        <template v-else-if="statusIcon">
          <font-awesome-icon :icon="statusIcon" size="lg" :style="statusColor" />
        </template>
        <template v-else-if="statusText">
          <p :style="statusColor">{{ statusText }}</p>
        </template>
      </div>
    </div>
    <transition name="fade">
      <div v-if="isExpanded && expandOnClick" class="list-item__expanded">
        <slot name="expanded" />
      </div>
    </transition>
  </li>
</template>

<script>
export default {
  props: {
    label: String,
    meta: String,
    status: {
      type: Object,
      required: false,
    },
    showCheckbox: {
      type: Boolean,
      default: false,
    },
    checkboxLabel: {
      type: String,
      default: '',
    },
    checkboxValue: {
      type: [String, Number, Object],
      required: false,
      default: 'value',
    },
    checkboxModel: {
      type: Array,
      default: () => [],
    },
    expandOnClick: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isExpanded: false,
    }
  },
  computed: {
    borderStyle() {
      return { borderLeft: `5px solid ${this.status?.color}` }
    },
    statusColor() {
      return { color: this.status?.color }
    },
    statusText() {
      return this.status?.text
    },
    statusIcon() {
      return this.status?.icon
    },
  },
  methods: {
    toggleExpanded() {
      this.isExpanded = !this.isExpanded
    },
  },
}
</script>

<style>
.list-item__main {
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

.list-item__main:hover {
  background-color: #f5f5f5;
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

.list-item {
  display: flex;
  flex-direction: column;
}

.list-item__expanded {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem;
  margin-left: auto;
  background-color: var(--color-bg);
  border-left: 1px solid var(--color-text);
  width: 98%;
  font-size: 1.4rem;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}
</style>
