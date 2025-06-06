<template>
  <div class="history__container">
    <div class="history__title-container">
      <h1 class="history__title">{{ historyTitle }} ({{ currentFiltered.length }})</h1>
      <HistoryListFilter @filter-entries="filterEntries" />
    </div>

    <!-- <ul class="history__list" v-if="currentFiltered.length">
      <HistoryListItem v-for="entry in currentFiltered" :key="entry._id" :entry="entry" />
    </ul> -->

    <div v-if="currentFiltered.length">
      <transition-group name="fade-slide" tag="ul" class="history__list" appear>
        <HistoryListItem v-for="entry in currentFiltered" :key="entry._id" :entry="entry" />
      </transition-group>
    </div>
    <p v-else class="history__empty-text">Keine Verlaufseinträge gefunden.</p>
  </div>
</template>

<script>
import HistoryListItem from '@/components/History/HistoryListItem.vue'
import { useHistoryStore } from '@/stores/historyStore'
import HistoryListFilter from '@/components/History/HistoryListFilter.vue'
import { filterHistoryEntries } from '@/utils/history.js'
import { usePermission } from '@/composables/usePermission.js'
import useUserStore from '@/stores/userStore.js'

export default {
  components: {
    HistoryListItem,
    HistoryListFilter,
  },
  props: {
    userId: {
      type: String,
      default: null,
    },
    userName: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      allEntries: [],
      allFiltered: [],
      userEntries: [],
      userFiltered: [],
      userRoles: [],
    }
  },
  setup() {
    const { hasPermission } = usePermission()
    const currentUser = useUserStore().user

    return { hasPermission, currentUser }
  },
  async created() {
    const historyStore = useHistoryStore()

    // default -> get all history
    if (this.hasPermission('view:all-history')) {
      const result = await historyStore.fetchAllHistory()
      this.allEntries = result.data
      this.allFiltered = result.data
    }
    // but if choosed to preview for one user -> based on userId prop
    if (this.userId && this.userName) {
      const result = await historyStore.fetchUserHistory(this.userId)
      this.userEntries = result.data
      this.userFiltered = result.data
      return
    }
    // own history -> no userId and not superadmin
    if (!this.userId && !this.userName && !this.hasPermission('view:all-history')) {
      const result = await historyStore.fetchUserHistory()
      this.userEntries = result.data
      this.userFiltered = result.data
    }
  },
  computed: {
    currentFiltered() {
      if (
        (this.userId && this.userName) ||
        (!this.userId && !this.userName && !this.hasPermission('view:all-history'))
      )
        return this.userFiltered.length > 0 ? this.userFiltered : this.userEntries
      return this.allFiltered.length > 0 ? this.allFiltered : this.allEntries
    },

    historyTitle() {
      if (this.userId && this.userName) return `Verlauf von ${this.userName}`
      if (!this.userId && this.hasPermission('view:all-history')) return 'Verlauf'
      return 'Mein Verlauf'
    },
  },
  methods: {
    filterEntries(searchTerm) {
      const source = this.userId
        ? this.userEntries
        : this.hasPermission('view:all-history')
          ? this.allEntries
          : this.userEntries

      const filtered = !searchTerm?.trim() ? source : filterHistoryEntries(source, searchTerm)

      if (this.userId || !this.hasPermission('view:all-history')) {
        this.userFiltered = filtered
      } else {
        this.allFiltered = filtered
      }
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
  /* border-radius: 1rem; */
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

/* Basisstil bleibt erhalten */
.history__list {
  list-style: none;
  width: 100%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

/* Übergang für Ein-/Ausblenden */
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
