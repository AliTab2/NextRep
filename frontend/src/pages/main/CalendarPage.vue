<template>
  <div class="calendar-page">
    <CalendarLayout :part-of-week="firstPartOfWeek" v-if="showFirstPartOfWeek" />
    <CalendarLayout :part-of-week="lastPartOfWeek" v-if="showLastPartOfWeek" />
  </div>
</template>

<script>
import CalendarLayout from '@/components/calendar/CalendarLayout.vue'
import { getCoursesNDaysRange, groupCoursesByDay } from '@/utils/calendar'
import useCourseStore from '@/stores/courseStore.js'
import { mapActions, mapState } from 'pinia'
import { weekDays } from '@/utils/base'
import useMessageStore from '@/stores/messageStore'
import useSportStore from '@/stores/sportStore'

export default {
  components: {
    CalendarLayout,
  },
  data() {
    return {
      currentCalendarView: localStorage.getItem('calendar-view') || 'full',
    }
  },
  async created() {
    this.updateStateValue('calendarView', this.currentCalendarView)
    this.updateStateValue('isLoadingCourses', true)
    await this.getAllCourses()
    await this.getAllSports()
    this.updateStateValue('isLoadingCourses', false)
  },
  beforeUnmount() {
    this.clearMessage('course')
  },
  methods: {
    ...mapActions(useCourseStore, ['getAllCourses', 'updateStateValue']),
    ...mapActions(useMessageStore, ['clearMessage']),
    ...mapActions(useSportStore, ['getAllSports']),
  },
  computed: {
    ...mapState(useCourseStore, ['courses', 'weekRange', 'isExporting', 'calendarView']),
    isCompactViewMoTilWe() {
      return this.calendarView === 'compact-mo-we'
    },
    isCompactViewThTilSu() {
      return this.calendarView === 'compact-th-su'
    },
    isFullView() {
      return this.calendarView === 'full'
    },
    showFirstPartOfWeek() {
      return this.isFullView || this.isCompactViewMoTilWe
    },
    showLastPartOfWeek() {
      return this.isFullView || this.isCompactViewThTilSu
    },
    groupedCourses() {
      return groupCoursesByDay(this.courses, this.weekRange).map((dayCourses) =>
        dayCourses.sort((a, b) => {
          const aTime = a.timeInfo.hour * 60 + a.timeInfo.minute
          const bTime = b.timeInfo.hour * 60 + b.timeInfo.minute
          return aTime - bTime
        }),
      )
    },
    firstPartOfWeekDays() {
      // Format: [ { label: 'mo', index: '1' } ]
      const firstThreeDays = weekDays.slice(0, 3)
      return firstThreeDays.map((day) => {
        return {
          label: day.label.slice(0, 2),
          index: day.value,
        }
      })
    },
    lastPartOfWeekDays() {
      const lastFourDays = weekDays.slice(weekDays.length - 4)
      return lastFourDays.map((day) => {
        return {
          label: day.label.slice(0, 2),
          index: day.value,
        }
      })
    },
    firstPartOfWeekCourses() {
      return getCoursesNDaysRange('first', this.firstPartOfWeekDays.length, this.groupedCourses)
    },
    lastPartOfWeekCourses() {
      return getCoursesNDaysRange('last', this.lastPartOfWeekDays.length, this.groupedCourses)
    },
    firstPartOfWeek() {
      return {
        days: this.firstPartOfWeekDays,
        courses: this.firstPartOfWeekCourses,
      }
    },
    lastPartOfWeek() {
      return {
        days: this.lastPartOfWeekDays,
        courses: this.lastPartOfWeekCourses,
      }
    },
  },
}
</script>

<style>
.calendar-page {
  height: calc(100% - 7rem);
  display: flex;
  flex-direction: column;
  padding-bottom: 1rem;
  background-color: whitesmoke;
}

@media (min-width: 1024px) {
  .calendar-page {
    flex-direction: row;
    padding-left: 1rem;
    padding-right: 1rem;
    gap: 1rem;
  }
}
</style>
