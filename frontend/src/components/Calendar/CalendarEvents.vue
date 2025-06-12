<template>
  <BaseMessage v-if="statusMessage" :status="statusType">
    {{ statusMessage }}
  </BaseMessage>
  <ul class="calendar-events">
    <li
      v-for="(dayCourses, index) in groupedCoursesByDay"
      :key="index"
      :class="['calendar-events__day', { 'calendar-events__day--last': index === 6 }]"
      :data-index="index === 6 ? 0 : index + 1"
      @click="exportDay"
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
  <CourseScreenshot
    :day="screenshotDay"
    :date="screenshotDate"
    v-if="takeScreenshot"
    ref="screenshotContainer"
  />
</template>

<script>
import { mapState } from 'pinia'
import useCourseStore from '@/stores/courseStore.js'
import { groupCoursesByDay, getDateFromWeekRange } from '@/utils/calendar'
import { weekDays } from '@/utils/base.js'
import { nextTick } from 'vue'
import CalendarEventCard from '@/components/Calendar/CalendarEventCard.vue'
import * as htmlToImage from 'html-to-image'
import download from 'downloadjs'

import CourseScreenshot from '@/components/Course/CourseScreenshot.vue'

export default {
  components: {
    CalendarEventCard,
    CourseScreenshot,
  },
  data() {
    return {
      statusMessage: '',
      statusType: '',
      isLoading: true,
      takeScreenshot: false,
      screenshotDate: '',
      screenshotDay: '',
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
  methods: {
    async exportDay(event) {
      if (!this.isExporting) return
      this.takeScreenshot = true
      await nextTick()

      const day = event.target.closest('.calendar-events__day')

      if (!day) {
        console.warn('No day fonud!')
        return
      }

      // clone day
      const clondedDay = day.cloneNode(true)
      clondedDay.style.width = '20rem'

      // get container
      const screenshotContainer = this.$refs.screenshotContainer.$el
      const screenshotContentContainer = Array.from(screenshotContainer.children).find((child) =>
        child.className.includes('screenshot-content'),
      )

      // change courses order
      clondedDay.style.flexDirection = 'row'
      clondedDay.style.width = getComputedStyle(screenshotContentContainer).width

      // white bg for courses
      for (const course of clondedDay.children) {
        course.style.backgroundColor = 'white'
      }

      screenshotContentContainer.append(clondedDay)

      this.screenshotDate = getDateFromWeekRange(
        this.weekRange.start,
        clondedDay.dataset.index,
      ).toLocaleDateString('de-DE', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })

      this.screenshotDay = weekDays.find(
        (day) => day.value.toString() === clondedDay.dataset.index,
      ).label

      const courseStore = useCourseStore()

      htmlToImage
        .toPng(screenshotContainer)
        .then((dataUrl) => {
          download(dataUrl, `${Date.now()}.png`)
          courseStore.isExporting = false
          this.takeScreenshot = false
        })
        .catch((error) => {
          console.error('Export fehlgeschlagen:', error)
        })
    },
  },
  computed: {
    ...mapState(useCourseStore, ['courses', 'weekRange', 'isExporting']),
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

.calendar-events__day:hover {
  background-color: rgba(255, 255, 255, 0.2);
  cursor: pointer;
}

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
