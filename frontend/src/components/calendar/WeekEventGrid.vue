<template>
  <BaseMessage v-if="courseMessage.msg" :status="courseMessage.status">
    {{ courseMessage.msg }}
  </BaseMessage>
  <ul class="calendar-events">
    <li
      v-for="(dayCourses, index) in courses"
      :key="index"
      class="calendar-events__day"
      @click="exportDay($event, dayCourses[0])"
    >
      <BaseLoader v-if="isLoadingCourses" />
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
import { mapActions, mapState } from 'pinia'
import useMessageStore from '@/stores/messageStore'

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
    ...mapState(useCourseStore, ['isLoadingCourses', 'weekRange', 'isExporting', 'exportNote']),
    ...mapState(useMessageStore, { courseMessage: 'course' }),
  },
  methods: {
    ...mapActions(useCourseStore, ['updateStateValue']),
    async exportDay(event, course) {
      if (!this.isExporting || !course) {
        this.updateStateValue('isExporting', false)
        return
      }

      this.takeScreenshot = true
      await nextTick()

      const day = event.target.closest('.calendar-events__day')
      if (!day) {
        console.warn('No day found!')
        return
      }

      const clonedDay = day.cloneNode(true)
      const screenshotContainer = this.$refs.screenshotContainer.$el
      const screenshotContentContainer = Array.from(screenshotContainer.children).find((child) =>
        child.className.includes('screenshot-content'),
      )

      clonedDay.style.flexDirection = 'row'
      clonedDay.style.border = '0px'
      clonedDay.style.width = getComputedStyle(screenshotContentContainer).width

      for (const course of clonedDay.children) {
        course.style.backgroundColor = 'white'
        if (window.innerWidth < 900) {
          course.firstChild.firstChild.style.fontSize = '1rem'
        }
      }

      screenshotContentContainer.append(clonedDay)

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

      await new Promise((r) => setTimeout(r, 500))

      try {
        const dataUrl = await htmlToImage.toPng(screenshotContainer, { cacheBust: true })
        download(dataUrl, `NextRep_${this.screenshotDate}.png`)
      } catch (error) {
        console.error('Export fehlgeschlagen:', error)
      } finally {
        this.updateStateValue('isExporting', false)
        this.takeScreenshot = false
      }
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
