<template>
  <PageContainer :is-loading="isLoading">
    <template #header>
      <BillingPageHeader :button-disabled="isLoading" @generate-billing="generateBilling" />
      <BaseMessage
        v-if="billing.msg || course.msg"
        :status="billing.status || course.status"
        :key="Date.now()"
      >
        {{ billing.msg || course.msg }}
      </BaseMessage>
    </template>
    <template #main>
      <CheckboxGroup
        placeholder-label="Keine Urlaubstage gewählt"
        :label="vacationDatesSelectorLabel"
        v-model="selectedVacationDates"
        :options="vacationDates"
      />
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
  generateRange,
} from '@/utils/calendar'
import useBillingStore from '@/stores/billingStore'
import useMessageStore from '@/stores/messageStore'
import CheckboxGroup from '@/components/shared/CheckboxGroup.vue'

export default {
  components: {
    PageContainer,
    BillingPageHeader,
    DataSection,
    CheckboxGroup,
  },
  mounted() {
    this.clearMessage()
  },
  beforeUnmount() {
    this.clearMessage()
  },
  data() {
    return {
      plannedCourseEvents: [],
      attendedCourseEvents: [],
      billingCourseEvents: [],
      isLoading: false,
      selectedVacationDates: [],
    }
  },
  methods: {
    ...mapActions(useCourseStore, ['getUserCourses']),
    ...mapActions(useBillingStore, ['createBilling']),
    ...mapActions(useMessageStore, ['clearMessage']),
    async generateBilling() {
      this.clearMessage()

      this.isLoading = true
      const coursesResult = await this.getUserCourses()
      if (coursesResult.error) {
        this.isLoading = false
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

      this.isLoading = true

      const blob = await this.createBilling(
        this.billingCourseEvents,
        calcCurrentMonthAndYear(new Date(), 0),
        this.selectedVacationDates,
      )

      if (!blob) {
        this.isLoading = false
        return
      }

      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = 'NextRep-Monatsabrechnung.xlsx'
      link.click()
      window.URL.revokeObjectURL(url)

      this.isLoading = false
      this.selectedVacationDates = []
    },
  },
  computed: {
    ...mapState(useCourseStore, ['courses']),
    ...mapState(useMessageStore, ['billing', 'course']),
    vacationDates() {
      return generateRange(1, getDaysInMonth(new Date())).map((obj, i) => {
        const currYear = new Date().getFullYear()
        const currMonth = new Date().getMonth()
        const currDate = new Date(currYear, currMonth, i + 1)
        const formattedLabel = currDate.toLocaleDateString('de-DE', {
          day: '2-digit',
          month: '2-digit',
          year: '2-digit',
        })
        const formattedValue = currDate.toLocaleDateString('de-DE', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        })

        return {
          label: formattedLabel,
          value: formattedValue,
        }
      })
    },
    vacationDatesSelectorLabel() {
      return `Urlaubstage (${calcCurrentMonthAndYear(new Date(), 0)})`
    },
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
  watch: {
    'billing.msg'() {
      setTimeout(() => {
        this.clearMessage()
      }, 3000)
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
