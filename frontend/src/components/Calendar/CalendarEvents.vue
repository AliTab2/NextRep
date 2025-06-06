<template>
  <BaseMessage v-if="statusMessage" :status="statusType">
    {{ statusMessage }}
  </BaseMessage>
  <ul class="calendar-events">
    <li
      v-for="(dayCourses, index) in groupedCoursesByDay"
      :key="index"
      :class="['calendar-events__day', { 'calendar-events__day--last': index === 6 }]"
    >
      <BaseLoader v-if="isLoading" />
      <transition-group name="slide">
        <CalendarEventCard
          v-for="course in dayCourses"
          :key="course._id"
          :sport="course.sport"
          :hour="course.time.hour"
          :minutes="course.time.minutes"
          :duration="course.time.duration"
          :status="course.status"
          :course-id="course._id"
          :trainer="course.trainer"
          :weekDay="index"
          :weekRange="course.date.weekRange"
        />
      </transition-group>
    </li>
  </ul>
</template>

<script>
import { mapState } from 'pinia'
import useCourseStore from '@/stores/courseStore.js'
import { groupCoursesByDay } from '@/utils/calendar'
import CalendarEventCard from '@/components/Calendar/CalendarEventCard.vue'

export default {
  components: {
    CalendarEventCard,
  },
  data() {
    return {
      statusMessage: '',
      statusType: '',
      isLoading: true,
    }
  },
  async created() {
    const courseStore = useCourseStore()
    const res = await courseStore.getCourses_store()
    this.isLoading = false

    if (res.error) {
      this.statusMessage = res.message || 'Kurse konnten nicht geladen werden.'
      this.statusType = 'error'
    }
  },
  mounted() {
    const { status, message } = this.$route.query
    if (status && message) {
      this.statusMessage = message
      this.statusType = status
    }
  },
  computed: {
    ...mapState(useCourseStore, ['courses', 'weekRange']),
    groupedCoursesByDay() {
      // return groupCoursesByDay(this.courses, this.weekRange)

      return groupCoursesByDay(this.courses, this.weekRange).map((dayCourses) =>
        dayCourses.sort((a, b) => {
          const aTime = a.time.hour * 60 + a.time.minutes
          const bTime = b.time.hour * 60 + b.time.minutes
          return aTime - bTime
        }),
      )
    },
  },
}
</script>

<style scoped>
.calendar-events {
  list-style: none;
  display: flex;
  flex: 1;
  flex-direction: row;
  margin: 0;
  padding: 0;
}

.calendar-events__day {
  width: calc(100% / 7);
  text-align: center;
  border-right: 1px solid rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 1rem;
  transition: all 0.2s;
}

/* .calendar-events__day:hover {
  background-color: #E0F0FF;
} */

.calendar-events__day--last {
  border-right: none;
}
/* Slide Animation */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.4s ease;
}

.slide-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.slide-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}
</style>
