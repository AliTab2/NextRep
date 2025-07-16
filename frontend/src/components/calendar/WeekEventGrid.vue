<template>
  <BaseMessage v-if="statusMessage" :status="statusType">
    {{ statusMessage }}
  </BaseMessage>
  <ul class="calendar-events">
    <li
      v-for="(dayCourses, index) in courses"
      :key="index"
      class="calendar-events__day"
      @click="exportDay($event, dayCourses[0])"
    >
      <BaseLoader v-if="isLoading" />
      <transition-group name="slide">
        <EventCard v-for="course in dayCourses" :key="course._id" :course="course" />
      </transition-group>
    </li>
  </ul>
  <ScreenshotDisplay
    :day="screenshotDay"
    :date="screenshotDate"
    :note="exportNote"
    v-if="takeScreenshot"
    ref="screenshotContainer"
  />
</template>

<script>
import { weekDays } from '@/utils/base.js'
import { nextTick } from 'vue'
import * as htmlToImage from 'html-to-image'
import download from 'downloadjs'

import EventCard from '@/components/shared/EventCard.vue'
import ScreenshotDisplay from '@/components/course/ScreenshotDisplay.vue'
import useCourseStore from '@/stores/courseStore.js'
import { getDateFromWeekRange } from '@/utils/calendar'
import { mapState } from 'pinia'

export default {
  components: {
    EventCard,
    ScreenshotDisplay,
  },
  props: {
    courses: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      takeScreenshot: false,
      screenshotDate: null,
      screenshotDay: null,
    }
  },
  computed: {
    ...mapState(useCourseStore, [
      'isLoading',
      'statusMessage',
      'statusType',
      'weekRange',
      'isExporting',
      'exportNote',
    ]),
  },
  methods: {
    async exportDay(event, course) {
      const courseStore = useCourseStore()
      if (!this.isExporting || !course) {
        courseStore.isExporting = false
        return
      }
      this.takeScreenshot = true
      await nextTick()
      const day = event.target.closest('.calendar-events__day')
      if (!day) {
        console.warn('No day fonud!')
        return
      }
      const clondedDay = day.cloneNode(true)
      const screenshotContainer = this.$refs.screenshotContainer.$el
      const screenshotContentContainer = Array.from(screenshotContainer.children).find((child) =>
        child.className.includes('screenshot-content'),
      )
      clondedDay.style.flexDirection = 'row'
      clondedDay.style.border = '0px'
      clondedDay.style.width = getComputedStyle(screenshotContentContainer).width
      for (const course of clondedDay.children) {
        course.style.backgroundColor = 'white'
        if (window.innerWidth < 900) {
          course.firstChild.firstChild.style.fontSize = '1rem'
        }
      }
      screenshotContentContainer.append(clondedDay)

      this.screenshotDate = getDateFromWeekRange(
        this.weekRange.start,
        course.dateInfo.dayIndex,
      ).toLocaleDateString('de-DE', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })
      this.screenshotDay = weekDays.find(
        (day) => day.value.toString() === course.dateInfo.dayIndex.toString(),
      ).label
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
  width: calc(100% / 3);
  text-align: center;
  border-right: 1px solid rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 1rem;
  transition: all 0.2s;
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
