<template>
  <li class="courses__list-item">
    <div class="courses__list-texts">
      <p class="courses__list-name">{{ course.sport }}</p>
      <p class="courses__list-info">{{ courseInfo }}</p>
      <p v-if="exceptionNote" class="courses__list-warning">{{ exceptionNote }}</p>
    </div>
    <p :class="['courses__list-status', statusClass]">{{ statusText }}</p>
  </li>
</template>

<script>
import { getDateFromWeekRange } from '@/utils/calendar.js'
export default {
  props: ['course'],
  computed: {
    courseInfo() {
      const { date, time, trainer } = this.course
      const hour = String(time.hour).padStart(2, '0')
      const minutes = String(time.minutes).padStart(2, '0')
      const timeString = `${hour}:${minutes}`
      const duration = this.course.time.duration

      let base = `mit ${trainer} um ${timeString} Uhr (${duration} Minuten)`

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
      // if (!this.course?.date?.weekRange?.start || this.course?.date?.weekDay == null) {
      //   return false
      // }

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
    statusClass() {
      if (this.isExpired) return 'status--expired'
      const status = this.course.status
      return (
        {
          regular: 'status--regular',
          represent: 'status--represent',
          cancelled: 'status--cancelled',
        }[status] || ''
      )
    },
    exceptionNote() {
      const exceptions = this.course.date?.exceptions || []
      if (exceptions.length > 0) {
        return 'Achtung: Dieser Kurs entfällt an einzelnen Tagen - siehe Kalender.'
      }
      return ''
    },
  },
}
</script>

<style scoped>
.courses__list-item {
  border-bottom: 1px solid #ddd;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: row;
}

.courses__list-texts {
  display: flex;
  flex-direction: column;
}

.courses__list-name {
  font-weight: bold;
  font-size: 1.4rem;
  margin-bottom: 0.3rem;
}

.courses__list-info {
  font-size: 1.2rem;
  color: #666;
}

.courses__list-status {
  font-size: 1.2rem;
  font-weight: bold;
  color: var(--color-primary);
  min-width: fit-content;
}

.courses__list-item:hover {
  background-color: var(--color-secondary-light);
  cursor: pointer;
}

@media (min-width: 576px) {
  .courses__list-name {
    font-size: 1.6rem;
  }

  .courses__list-info,
  .courses__list-status {
    font-size: 1.4rem;
  }
}

.status--represent {
  color: orange;
}

.status--regular {
  color: var(--color-primary);
}

.status--cancelled {
  color: #d32f2f;
}

.courses__list-warning {
  font-size: 1.1rem;
  font-style: italic;
  color: #cc6600;
  margin-top: 0.3rem;
}

.status--expired {
  color: #999;
  font-style: italic;
}
</style>
