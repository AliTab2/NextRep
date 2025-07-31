<template>
  <article
    :class="['event-card', `${statusClass}--bg`, `${statusClass}--border`]"
    @click="goToCourseManagementPage()"
  >
    <header class="event-card__header">
      <p
        class="event-card__sport"
        :style="{
          color: sports.find((s) => s.sport.toLowerCase() === course.sport.toLowerCase())?.color,
        }"
      >
        {{ course.sport }}
      </p>
    </header>
    <p class="event-card__trainer">{{ trainer }}</p>
    <p class="event-card__time">{{ getStartTime }} - {{ getEndTime }}</p>
    <p :class="['event-card__status', `${statusClass}--text`]">{{ getStatus }}</p>
  </article>
</template>

<script>
import { calcStartTime, calcEndTime } from '@/utils/calendar'
import { usePermission } from '@/composables/usePermission.js'
import { useSmartNavigation } from '@/composables/useSmartNavigation.js'
import useCourseStore from '@/stores/courseStore'
import { mapState } from 'pinia'
import { coursesWidgetsList } from '@/utils/base'
import useSportStore from '@/stores/sportStore'

export default {
  setup() {
    const { hasPermission } = usePermission()
    const { navigate } = useSmartNavigation()
    return { hasPermission, navigate, coursesWidgetsList }
  },
  props: {
    course: Object,
  },
  methods: {
    goToCourseManagementPage() {
      if (this.isExporting) return
      const d = this.course.exceptionDate
      const exceptionDate = d ? `${new Date(d.weekRangeStart).toDateString()}-${d.dayIndex}` : null
      this.navigate({
        mode: 'push',
        to: {
          name: 'AdminCourseEdit',
          params: {
            courseId: this.course._id,
          },
          query: {
            exceptionDate,
          },
        },
      })
    },
  },
  computed: {
    ...mapState(useCourseStore, ['isExporting']),
    ...mapState(useSportStore, ['sports']),
    trainer() {
      return this.course.trainer.map((t) => t.name).join(', ')
    },
    statusClass() {
      if (this.course.status === 'represent') return 'status-represent'
      if (this.course.status === 'regular') return 'status-regular'
      if (this.course.status === 'change') return 'status-change'
      if (this.course.status === 'special') return 'status-special'
      return 'status-cancelled'
    },
    getStartTime() {
      return calcStartTime(this.course.timeInfo.minute, this.course.timeInfo.hour)
    },
    getEndTime() {
      return calcEndTime(
        this.course.timeInfo.minute,
        this.course.timeInfo.hour,
        this.course.timeInfo.duration,
      )
    },
    getStatus() {
      if (this.course.status === 'represent') return 'Vertretung'
      if (this.course.status === 'regular') return 'Regulär'
      if (this.course.status === 'change') return 'Änderung'
      if (this.course.status === 'special') return 'Special'
      return 'Ausfall'
    },
  },
}
</script>

<style scoped>
.event-card {
  color: var(--color-text);
  width: 95%;
  margin: 0 auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: opacity 0.25s;
  padding: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.25s;
  font-size: 0.9rem;
}
@media (min-width: 576px) {
  .event-card {
    font-size: 1rem;
  }
}
@media (min-width: 768px) {
  .event-card {
    font-size: 1.2rem;
  }
}
.event-card:hover {
  scale: 1.02;
  cursor: pointer;
}
.event-card__header {
  display: flex;
  justify-content: space-between;
}
.event-card__sport,
.event-card__trainer {
  font-weight: bold;
}
.event-card__status {
  margin-left: auto;
}

.status-represent--text {
  color: var(--color-status-represent);
  font-weight: bold;
}
.status-regular--text {
  color: var(--color-status-regular);
}
.status-change--text {
  color: var(--color-status-change);
  font-weight: bold;
}
.status-cancelled--text {
  color: var(--color-status-cancelled);
  font-weight: bold;
}
.status-special--text {
  color: var(--color-status-special);
  font-weight: bold;
}

.status-represent--border {
  border-left: var(--border-status-represent);
}
.status-regular--border {
  border-left: var(--border-status-regular);
}
.status-change--border {
  border-left: var(--border-status-change);
}
.status-cancelled--border {
  border-left: var(--border-status-cancelled);
}
.status-special--border {
  border-left: var(--border-status-special);
}
</style>
