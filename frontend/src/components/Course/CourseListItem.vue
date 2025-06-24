<template>
  <BaseListItem
    :label="course.sport"
    :status="{
      color: statusColor,
      text: statusText,
      icon: '',
    }"
    :meta="courseInfo"
  />
</template>

<script>
import { getDateFromWeekRange } from '@/utils/calendar.js'
export default {
  props: {
    course: Object,
  },
  computed: {
    courseInfo() {
      const { date, time, trainer } = this.course
      const hour = String(time.hour).padStart(2, '0')
      const minutes = String(time.minutes).padStart(2, '0')
      const timeString = `${hour}:${minutes}`
      const duration = this.course.time.duration

      let base = `mit ${trainer.name} um ${timeString} Uhr (${duration} Minuten)`

      if (date.recurring) {
        return `Wöchentlich am ${date.weekDayName} ${base}`
      } else {
        const onceDate = getDateFromWeekRange(
          this.course.date.weekRange.start,
          this.course.date.weekDay,
        )

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
        this.course.date.weekRange.start,
        this.course.date.weekDay,
      )

      const today = new Date()
      today.setHours(0, 0, 0, 0)

      const courseDay = new Date(courseDate)
      courseDay.setHours(0, 0, 0, 0)

      return courseDay < today && this.course.date.recurring === false
    },
    statusText() {
      if (this.isExpired) return 'Abgelaufen'
      const status = this.course.status
      switch (status) {
        case 'represent':
          return 'Vertretung'
        case 'cancelled':
          return 'Ausfall'
        default:
          return 'Regulär'
      }
    },
    statusColor() {
      if (this.isExpired) return '#999'
      const status = this.course.status
      return (
        {
          regular: '',
          represent: 'orange',
          cancelled: '#db1200',
        }[status] || ''
      )
    },
    exceptionNote() {
      const exceptions = this.course.date?.exceptions || []
      if (exceptions.length > 0) {
        return 'Achtung: Änderung oder Entfall an einzelnen Tagen - siehe Kalender.'
      }
      return ''
    },
  },
}
</script>

<style scoped>
.courses__list-warning {
  font-size: 1.1rem;
  font-style: italic;
  color: #cc6600;
  margin-top: 0.3rem;
}
</style>
