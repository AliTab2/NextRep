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
      @dblclick="exportDay"
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
import { groupCoursesByDay, getDateFromWeekRange } from '@/utils/calendar'
import CalendarEventCard from '@/components/Calendar/CalendarEventCard.vue'
import * as htmlToImage from 'html-to-image'
import download from 'downloadjs'

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
  methods: {
    exportDay(event) {
      const shouldExport = confirm('Möchtest du den Tag exportieren?')
      if (!shouldExport) return

      const node = event.target
      const clonedNode = node.cloneNode(true)
      clonedNode.style.width = `${window.innerWidth / 7}px`

      // // date element
      const dateElem = document.createElement('div')
      dateElem.style.width = getComputedStyle(node).width
      dateElem.style.backgroundColor = 'red'
      dateElem.style.color = 'white'
      dateElem.style.fontSize = '1.6rem'
      dateElem.style.textAlign = 'center'
      dateElem.style.marginBottom = '1rem'

      // // container
      const container = document.createElement('div')
      container.style.display = 'flex'
      container.style.flexDirection = 'column'
      container.style.alignItems = 'center'
      container.style.width = getComputedStyle(node).width
      container.style.padding = '1rem 2rem'

      const date = getDateFromWeekRange(this.weekRange.start, clonedNode.dataset.index)
      dateElem.innerText = date.toLocaleDateString('de-DE')

      container.appendChild(dateElem)
      container.appendChild(clonedNode)
      document.body.appendChild(container)

      htmlToImage
        .toPng(container)
        .then((dataUrl) => {
          download(dataUrl, `${Date.now()}.png`)
          document.body.removeChild(container)
        })
        .catch((error) => {
          console.error('Export fehlgeschlagen:', error)
        })
    },
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
