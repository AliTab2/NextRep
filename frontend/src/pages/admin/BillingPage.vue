<template>
  <PageContainer :is-loading="false">
    <template #header>
      <BillingPageHeader @generate-billing="generateBilling" />
      <BaseMessage v-if="statusMessage" :status="statusType">
        {{ statusMessage }}
      </BaseMessage>
    </template>
    <template #main>
      <DataSection :not-found="true" not-found-item="Abrechnungen" />
    </template>
  </PageContainer>
</template>

<script>
import PageContainer from '@/components/dashboard/ui/PageContainer.vue'
import BillingPageHeader from '@/components/dashboard/billing/BillingPageHeader.vue'
import DataSection from '@/components/dashboard/ui/DataSection.vue'
import { mapActions, mapState } from 'pinia'
import useCourseStore from '@/stores/courseStore'
import { subDays, addDays, getDaysInMonth, getDate, getMonth } from 'date-fns'
import {
  getDateFromWeekRange,
  calcStartTime,
  calcEndTime,
  calcCurrentMonthAndYear,
} from '@/utils/calendar'
import { useBillingStore } from '@/stores/billingStore'

export default {
  components: {
    PageContainer,
    BillingPageHeader,
    DataSection,
  },
  data() {
    return {
      plannedCourseEvents: [],
      attendedCourseEvents: [],
      billingCourseEvents: [],
      statusMessage: '',
      statusType: '',
    }
  },
  methods: {
    ...mapActions(useCourseStore, ['getUserCourses']),
    ...mapActions(useBillingStore, ['createBilling']),
    async generateBilling() {
      const coursesResult = await this.getUserCourses()
      if (coursesResult.error || coursesResult.data.length === 0) {
        this.statusMessage = coursesResult.error || 'Abrechnung kann nicht erstellt werden.'
        this.statusType = 'error'
        return
      }

      this.plannedCourseEvents = this.weeklyCourses
        .map((c) => {
          return getAllDatesForWeeklyCourse(c)
        })
        .flat()

      this.attendedCourseEvents = this.plannedCourseEvents.filter((planned) => {
        const deleted = this.deletedBillingObjects.find(
          (deleted) => deleted.date === planned.date && deleted.sport === planned.sport,
        )
        return !deleted
      })

      this.billingCourseEvents = this.attendedCourseEvents
        .concat(this.onceBillingObjects)
        .concat(this.activeExceptionsBillingObjects)

      const blob = await this.createBilling(
        this.billingCourseEvents,
        calcCurrentMonthAndYear(new Date(), 0),
      )

      if (!blob || blob.error) {
        this.statusMessage = blob?.message || 'Fehler beim Erstellen der Abrechnung'
        this.statusType = 'error'
      } else {
        this.statusMessage = 'Abrechnung wurde erfolgreich erstellt.'
        this.statusType = 'success'

        const url = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = 'NextRep-Monatsabrechnung.xlsx'
        link.click()
        window.URL.revokeObjectURL(url)
      }
    },
  },
  computed: {
    ...mapState(useCourseStore, ['courses']),
    weeklyCourses() {
      return this.courses.filter((c) => c.dateInfo?.recurrencePattern === 'weekly')
    },
    onceCourses() {
      return this.courses.filter((c) => c.dateInfo?.recurrencePattern === 'once')
    },
    onceBillingObjects() {
      return this.onceCourses.map((once) => {
        const date = getDateFromWeekRange(
          once.dateInfo?.creationWeekRange?.start,
          once.dateInfo?.dayIndex,
        )
        return toBillingObj(once, date)
      })
    },
    allExceptions() {
      return this.weeklyCourses
        .map((c) => {
          return c.dateInfo?.exceptions
        })
        .flat()
    },
    deletedCourseEvents() {
      return this.allExceptions.filter((e) => e.status === 'deleted' || e.status === 'cancelled')
    },
    deletedBillingObjects() {
      return this.deletedCourseEvents.map((deleted) => {
        const date = getDateFromWeekRange(
          deleted.dateInfo?.creationWeekRange?.start,
          deleted.dateInfo?.dayIndex,
        )
        return toBillingObj(deleted, date)
      })
    },
    activeCourseExceptions() {
      return this.allExceptions.filter((e) => e.status !== 'deleted' && e.status !== 'cancelled')
    },
    activeExceptionsBillingObjects() {
      return this.activeCourseExceptions.map((active) => {
        const date = getDateFromWeekRange(
          active.dateInfo?.creationWeekRange?.start,
          active.dateInfo?.dayIndex,
        )
        return toBillingObj(active, date)
      })
    },
  },
}

export function getAllDatesForWeeklyCourse(course) {
  const courseDate = getDateFromWeekRange(
    course.dateInfo?.creationWeekRange?.start,
    course.dateInfo?.dayIndex,
  )
  const currentDay = getDate(courseDate)
  const month = getMonth(courseDate)
  const totalDaysInMonth = getDaysInMonth(courseDate)

  const totalEventsInMonth = Math.round(totalDaysInMonth / 6)
  const eventsPrevious = Math.floor(currentDay / 7)
  const eventsFurther = totalEventsInMonth - (eventsPrevious + 1)

  const result = []

  for (let i = eventsPrevious; i >= 1; i--) {
    const date = subDays(courseDate, i * 7)
    if (getMonth(date) === month) result.push(toBillingObj(course, date))
  }

  result.push(toBillingObj(course, courseDate))

  for (let i = 1; i <= eventsFurther; i++) {
    const date = addDays(courseDate, i * 7)
    if (getMonth(date) === month) result.push(toBillingObj(course, date))
  }

  return result
}

function toBillingObj(course, date) {
  return {
    sport: course.sport,
    date: date.toLocaleDateString('de-De', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
    }),
    start: calcStartTime(course.timeInfo.minute, course.timeInfo.hour),
    end: calcEndTime(course.timeInfo.minute, course.timeInfo.hour, course.timeInfo.duration),
    duration: course.timeInfo.duration,
    amount: hourlyRate[course.timeInfo.duration],
  }
}

const hourlyRate = {
  30: 17.5,
  45: 20,
  60: 25,
}
</script>
