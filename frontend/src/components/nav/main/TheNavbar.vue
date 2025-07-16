<template>
  <header class="app-header">
    <div class="app-header__container">
      <NavBrand />
      <WeekNavigator v-if="showCalNav" @update="updateMonthAndYear" />
      <NavDate :month-and-year="monthAndYear" />
      <UserSection
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
    updateMonthAndYear(date) {
      this.monthAndYear = date
    },
    exportDay() {
      this.showExportModal = false
      const courseStore = useCourseStore()
      courseStore.isExporting = true
      courseStore.exportNote = this.exportNote
    },
    cancelExport() {
      this.showExportModal = false
      const courseStore = useCourseStore()
      courseStore.isExporting = false
    },
    changeCalendarView() {
      localStorage.setItem('calendar-view', this.calendarView)
      this.showViewModal = false
      useCourseStore().calendarView = this.calendarView
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
  background-color: var(--color-bg);
  width: 100%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid var(--color-text);
}
.app-header__container {
  height: 7rem;
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
}

@media (min-width: 1280px) {
  .app-header__title,
  .user-icon {
    font-size: 2.8rem;
  }
}
</style>
