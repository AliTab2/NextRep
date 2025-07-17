<template>
  <SharedListItem
    :label="course.sport"
    :status="{
      color: statusColor,
      text: statusText,
      icon: statusIcon,
    }"
    :meta="courseInfo"
    :expand-on-click="hasCourseExceptions"
  >
    <template #expanded>
      <CourseListItemExpanded :exceptions="courseExceptions" />
    </template>
  </SharedListItem>
</template>

<script>
import { getDateFromWeekRange } from '@/utils/calendar.js'
import { weekDays, statusList } from '@/utils/base'
import SharedListItem from '@/components/shared/SharedListItem.vue'
import CourseListItemExpanded from '@/components/dashboard/course/CourseListItemExpanded.vue'

export default {
  props: {
    course: Object,
  },
  components: {
    SharedListItem,
    CourseListItemExpanded,
  },
  computed: {
    courseInfo() {
      const { dateInfo, timeInfo, trainer } = this.course
      const hour = String(timeInfo.hour).padStart(2, '0')
      const minutes = String(timeInfo.minute).padStart(2, '0')
      const timeString = `${hour}:${minutes}`
      const duration = timeInfo.duration

      let base = `mit ${trainer.map((t) => t.name).join(', ')} um ${timeString} Uhr (${duration} Minuten)`

      if (dateInfo.recurrencePattern === 'weekly') {
        return `Wöchentlich am ${weekDays.find((d) => d.value.toString() === dateInfo.dayIndex.toString()).label} ${base}`
      } else {
        const onceDate = getDateFromWeekRange(dateInfo.creationWeekRange.start, dateInfo.dayIndex)

        const onceDateFormatted = new Date(onceDate).toLocaleDateString('de-DE', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        })

        return `Einmalig am ${onceDateFormatted} ${base}`
      }
    },
    isExpired() {
      const courseDate = getDateFromWeekRange(
        this.course.dateInfo.creationWeekRange.start,
        this.course.dateInfo.dayIndex,
      )
      const today = new Date()
      const courseDay = new Date(courseDate)
      today.setHours(0, 0, 0, 0)
      courseDay.setHours(0, 0, 0, 0)

      return courseDay < today && this.course.dateInfo.recurrencePattern === 'once'
    },
    courseStatus() {
      return this.course.status
    },
    statusText() {
      if (this.isExpired) return 'Abgelaufen'
      return statusList.find((s) => s.value === this.courseStatus).label
    },
    statusColor() {
      if (this.isExpired) return 'var(--color-border-default)'
      if (this.hasCourseExceptions) return 'var(--color-text)'
      return `var(--color-status-${this.courseStatus})`
    },
    statusIcon() {
      if (this.hasCourseExceptions) return 'fa-solid fa-exclamation-circle'
      return ''
    },
    courseExceptions() {
      return this.course.dateInfo.exceptions || []
    },
    hasCourseExceptions() {
      return Boolean(this.courseExceptions.length)
    },
  },
}
</script>
