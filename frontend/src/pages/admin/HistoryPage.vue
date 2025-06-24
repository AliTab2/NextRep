<template>
  <div class="history__container">
    <BaseLoader v-if="isLoading" />

    <div v-else>
      <div class="history__title-container">
        <h1 class="history__title">{{ historyLabel }} ({{ history.length }})</h1>
      </div>

      <div v-if="history.length">
        <transition-group name="fade-slide" tag="ul" class="history__list" appear>
          <BaseListItem
            v-for="entry in history"
            :key="entry._id"
            :label="entry.userName"
            :status="{ color: '#666', text: entry.message }"
            :meta="`${new Date(entry.createdAt).toLocaleDateString('de-DE')} - ${new Date(entry.createdAt).getHours()}:${new Date(entry.createdAt).getMinutes()}`"
          />
        </transition-group>
      </div>
      <p v-else class="history__empty-text">Keine Verlaufseinträge gefunden.</p>
    </div>
  </div>
</template>

<script>
import { useHistoryStore } from '@/stores/historyStore'
import { usePermission } from '@/composables/usePermission.js'

export default {
  data() {
    return {
      history: [],
      isLoading: true,
    }
  },
  setup() {
    const { hasPermission } = usePermission()

    return { hasPermission }
  },
  async created() {
    const historyStore = useHistoryStore()

    if (this.userId && this.userName) {
      const result = await historyStore.fetchUserHistory(this.userId)
      this.history = result.data
      this.isLoading = false
      return
    }

    // own history
    if (!this.hasPermission('view:all-history')) {
      const result = await historyStore.fetchUserHistory()
      this.history = result.data
      this.isLoading = false
      return
    }

    // all history
    if (this.hasPermission('view:all-history')) {
      const result = await historyStore.fetchAllHistory()
      this.history = result.data
      this.isLoading = false
      return
    }
  },
  computed: {
    userName() {
      return this.$route.query.userName
    },
    userId() {
      return this.$route.query.userId
    },
    historyLabel() {
      if (this.userName && this.userId) return `Verlauf von ${this.userName}`
      if (this.hasPermission('view:all-history')) return 'Verlauf'
      return 'Mein Verlauf'
    },
  },
}
</script>

<style scoped>
.history__container {
  padding: 2rem;
}

.history__list {
  list-style: none;
  width: 100%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

@media (min-width: 768px) {
  .history__container {
    padding: 4rem;
  }
}

.history__title-container {
  width: 100%;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.history__title {
  font-size: 1.6rem;
  color: var(--color-text);
  width: 30%;
}

.history__empty-text {
  font-size: 1.3rem;
}

@media (min-width: 576px) {
  .history__title {
    font-size: 1.8rem;
  }
}
@media (min-width: 768px) {
  .history__title {
    font-size: 2rem;
  }
}

.history__list {
  list-style: none;
  width: 100%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.4s ease;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

.fade-slide-enter-to,
.fade-slide-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
