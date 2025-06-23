<template>
  <header class="app-header">
    <div class="app-header__container">
      <div class="app-header__brand">
        <h1 class="app-header__title" @click="navigate({ mode: 'push', to: { name: 'Home' } })">
          NextRep
        </h1>
        <p class="app-header__subtitle">CleverFit-Kurse</p>
      </div>

      <CalendarNav
        v-if="showCalNav"
        class="app-header__calendar-nav"
        @update="updateMonthAndYear"
      />

      <p class="app-header__date">{{ monthAndYear }}</p>

      <div class="user-menu" @click="toggleDropdown">
        <font-awesome-icon icon="fa-solid fa-circle-user" class="user-icon" />
        <div v-if="showDropdown" class="user-menu__dropdown">
          <base-button
            v-for="(item, index) in navActions"
            :key="index"
            :variant="item.variant || 'default'"
            v-show="!item.condition || item.condition()"
            @click="item.action ? item.action : navigate({ mode: 'push', to: item.to })"
          >
            {{ item.label }}
          </base-button>
          <base-button variant="dropdown" @click="exportDay" v-if="$route.name === 'Calendar'"
            >Exportieren</base-button
          >
          <base-button
            variant="dropdown"
            v-if="this.$route.name !== 'Auth' && this.isLoggedIn"
            @click="logout"
            >Abmelden</base-button
          >
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import CalendarNav from '@/components/Calendar/CalendarNav.vue'
import { usePermission } from '@/composables/usePermission.js'
import { useSmartNavigation } from '@/composables/useSmartNavigation.js'
import useUserStore from '@/stores/userStore.js'
import useCourseStore from '@/stores/courseStore.js'
import { mapState, mapActions } from 'pinia'

export default {
  components: {
    CalendarNav,
  },
  setup() {
    const { hasPermission } = usePermission()
    const { navigate } = useSmartNavigation()

    return {
      hasPermission,
      navigate,
    }
  },
  data() {
    return {
      monthAndYear: null,
      isAdmin: false,
      showDropdown: false,
      navActions: [
        {
          label: 'Neuer Kurs',
          to: { name: 'AdminCourseAdd' },
          condition: () =>
            this.hasPermission('add:course') &&
            this.$route.name !== 'AdminCourseAdd' &&
            this.$route.name !== 'AdminCourseEdit',
        },
        {
          label: 'Einstellungen',
          to: { name: 'AdminDashboard' },
          variant: 'dropdown',
          condition: () => this.hasPermission('access:settings'),
        },
        {
          label: 'Homepage',
          to: { name: 'Home' },
          variant: 'dropdown',
          condition: () => this.$route.name !== 'Home',
        },
        {
          label: 'Kalender',
          to: { name: 'Calendar' },
          variant: 'dropdown',
          condition: () => this.$route.name !== 'Calendar',
        },
        {
          label: 'Anmelden',
          to: { name: 'Auth' },
          variant: 'dropdown',
          condition: () => !this.isLoggedIn && this.$route.name !== 'Auth',
        },
      ],
    }
  },
  mounted() {
    document.addEventListener('click', this.handleClickOutside)
  },
  beforeUnmount() {
    document.removeEventListener('click', this.handleClickOutside)
  },
  methods: {
    ...mapActions(useUserStore, ['logout_store']),
    handleClickOutside(event) {
      const menu = this.$el.querySelector('.user-menu')
      if (menu && !menu.contains(event.target)) {
        this.showDropdown = false
      }
    },
    logout() {
      this.logout_store()
      this.navigate({ mode: 'push', to: { name: 'Calendar' } })
    },
    updateMonthAndYear(date) {
      this.monthAndYear = date
    },
    toggleDropdown() {
      this.showDropdown = !this.showDropdown
    },
    exportDay() {
      const shouldExport = confirm('Klicke einfach auf einen Tag!')
      if (!shouldExport) return
      const courseStore = useCourseStore()
      courseStore.isExporting = true
    },
  },
  computed: {
    showCalNav() {
      return (this.isCalendarPage || this.isCoursePage) && this.$route.name !== 'EditCourse'
    },
    isCalendarPage() {
      return this.$route.name === 'Calendar'
    },
    isCoursePage() {
      return ['AddCourse', 'EditCourse'].includes(this.$route.name)
    },
    ...mapState(useUserStore, ['isLoggedIn']),
  },
}
</script>

<style scoped>
.app-header {
  background-color: var(--color-bg);
  width: 100%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid var(--color-text);
}

.app-header__container {
  height: 7rem;
  padding: 0 var(--space-md);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--space-sm);
}

.app-header__brand {
  width: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.app-header__title {
  font-size: 2.5rem;
  letter-spacing: -0.01em;
  color: var(--color-text);
  display: flex;
  align-items: center;
  margin-bottom: 0;
  cursor: pointer;
}

.app-header__subtitle {
  font-size: 1.4rem;
  font-weight: bold;
  color: #db1200;
}

.app-header__calendar-nav {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: var(--space-sm);
}

.app-header__date {
  font-size: 1.3rem;
  color: var(--color-text);
  display: flex;
  align-items: center;
  margin-left: auto;
  margin-bottom: 0;
}

.user-icon {
  font-size: 2.5rem;
}

.user-menu {
  position: relative;
  cursor: pointer;
}

.user-menu__dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  background-color: var(--color-text);
  border: 1px solid var(--color-text);
  border-radius: 0.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 0.5rem;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  min-width: 14rem;
  gap: 1rem;
}

/* Media Queries */
@media (min-width: 576px) {
  .app-header__date {
    font-size: 1.2rem;
  }
}

@media (min-width: 768px) {
  .app-header__date {
    font-size: 1.4rem;
  }
  .user-menu__dropdown {
    min-width: 16rem;
  }
}

@media (min-width: 1024px) {
  .app-header__date {
    font-size: 1.6rem;
  }
}

@media (min-width: 1280px) {
  .app-header__title,
  .user-icon {
    font-size: 2.8rem;
  }
}
</style>
