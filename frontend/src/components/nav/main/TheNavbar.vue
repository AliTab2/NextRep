<template>
  <header class="app-header">
    <div class="app-header__container">
      <NavBrand />
      <WeekNavigator v-if="showCalNav" @update="updateMonthAndYear" />
      <NavDate v-if="isCalendarPage" :month-and-year="monthAndYear" />
      <UserSection
        class="user-section"
        @open-export-modal="showExportModal = true"
        @open-view-modal="showViewModal = true"
      />
    </div>

    <ExportDayModal
      :show-modal="showExportModal"
      v-model="exportNote"
      @close-export="cancelExport"
      @confirm-export="exportDay"
    />
    <CalendarViewModal
      :show-modal="showViewModal"
      v-model="calendarView"
      @close-view="showViewModal = false"
      @confirm-view="changeCalendarView"
    />
  </header>
</template>

<script>
import NavBrand from '@/components/nav/main/NavBrand.vue'
import WeekNavigator from '@/components/nav/main/WeekNavigator.vue'
import NavDate from '@/components/nav/main/NavDate.vue'
import UserSection from '@/components/nav/dropdown/UserSection.vue'
import ExportDayModal from '@/components/nav/modals/ExportDayModal.vue'
import CalendarViewModal from '@/components/nav/modals/CalendarViewModal.vue'

import { usePermission } from '@/composables/usePermission.js'
import { useSmartNavigation } from '@/composables/useSmartNavigation.js'
import { mapActions } from 'pinia'
import useUserStore from '@/stores/userStore.js'
import useCourseStore from '@/stores/courseStore'

export default {
  components: {
    NavBrand,
    WeekNavigator,
    NavDate,
    UserSection,
    ExportDayModal,
    CalendarViewModal,
  },
  setup() {
    const { hasPermission } = usePermission()
    const { navigate } = useSmartNavigation()
    return { hasPermission, navigate }
  },
  data() {
    return {
      monthAndYear: null,
      isAdmin: false,
      showDropdown: false,
      showExportModal: false,
      showViewModal: false,
      calendarView: 'full',
      exportNote: null,
    }
  },
  mounted() {
    const currentView = localStorage.getItem('calendar-view')
    localStorage.setItem('calendar-view', currentView || this.calendarView)
  },
  methods: {
    ...mapActions(useUserStore, ['logout']),
    ...mapActions(useCourseStore, ['updateStateValue']),
    updateMonthAndYear(date) {
      this.monthAndYear = date
    },
    exportDay() {
      this.showExportModal = false
      this.updateStateValue('isExporting', true)
      this.updateStateValue('exportNote', this.exportNote)
    },
    cancelExport() {
      this.showExportModal = false
      this.updateStateValue('isExporting', false)
    },
    changeCalendarView() {
      localStorage.setItem('calendar-view', this.calendarView)
      this.showViewModal = false
      this.updateStateValue('calendarView', this.calendarView)
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
  },
}
</script>

<style scoped>
.app-header {
  width: 100%;
  background-color: var(--color-bg);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  user-select: none;
}
.app-header__container {
  height: 7rem;
  padding: 0 1rem;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  /* flex-wrap: wrap; */
  gap: 1rem;
}
.user-section {
  margin-left: auto;
}
@media (min-width: 576px) {
  .app-header__container {
    gap: 2rem;
  }
}
@media (min-width: 768px) {
  .app-header__container {
    gap: 3rem;
  }
}
@media (min-width: 1280px) {
  .app-header__title,
  .user-icon {
    font-size: 2.8rem;
  }
}
</style>
