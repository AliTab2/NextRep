<template>
  <article :class="['calendar-event', cardSizeClass]" @click="goToEditCoursePage()">
    <header class="calendar-event__header">
      <BaseWidget
        :label="sport || 'Kurs'"
        :icon="screenIsLarge || mode === 'preview' ? courseStyle.icon : ''"
        :background="courseStyle.color"
        :mode="mode"
      />
    </header>

    <p class="calendar-event__trainer">
      mit <strong>{{ trainer || 'Trainer / Trainerin' }}</strong>
    </p>

    <p class="calendar-event__time">{{ getStartTime }} - {{ getEndTime }} Uhr</p>
    <p class="calendar-event__duration">{{ duration }} min</p>
    <p class="calendar-event__status" :class="statusClass">
      {{ getStatus }}
    </p>

    <div
      class="calendar-event__preview"
      v-if="$route.name === 'AddCourse' || $route.name === 'EditCourse'"
    >
      <p class="calendar-event__preview-weekday">{{ weekDayName || 'Wochentag' }}</p>
      <p class="calendar-event__preview-recurring">{{ getRecurring || 'Wiederholung' }}</p>
    </div>
    <div class="btn-container">
      <base-button
        class="btn-container__edit"
        @click="switchToForm"
        v-if="$route.name !== 'Calendar' && hasPermission('edit:course') && !screenIsLarge"
        >Bearbeiten</base-button
      >
      <base-button
        variant="delete"
        @click="$emit('delete-course')"
        :is-loading="isLoading"
        class="btn-container__delete"
        v-if="!['Calendar', 'AddCourse'].includes($route.name) && hasPermission('delete:course')"
        >kurs Löschen</base-button
      >
      <base-button
        v-else-if="!['Calendar', 'AddCourse'].includes($route.name)"
        style="width: 100%"
        variant="delete"
        @click="navigate({ mode: 'back', fallback: '/calendar' })"
        >Zurück</base-button
      >
    </div>
  </article>
</template>

<script>
import BaseWidget from '@/components/Base/BaseWidget.vue'
import { coursesWidgetsList } from '@/utils/base.js'
import { calcStartTime, calcEndTime, getDateFromWeekRange } from '@/utils/calendar'
import { usePermission } from '@/composables/usePermission.js'
import { useSmartNavigation } from '@/composables/useSmartNavigation.js'

export default {
  components: {
    BaseWidget,
  },
  props: {
    weekRange: {
      type: Object,
      required: false,
    },
    weekDay: Number,
    sport: String,
    trainer: String,
    hour: Number,
    minutes: Number,
    duration: Number,
    status: String,
    courseId: String,
    size: String,
    weekDayName: String,
    recurring: Boolean,
    mode: {
      type: String,
      default: 'calendar', // optional: 'calendar' | 'preview'
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const { hasPermission } = usePermission()
    const { navigate } = useSmartNavigation()
    return { hasPermission, navigate }
  },
  data() {
    return {
      screenIsLarge: window.innerWidth >= 1000,
      courseWidgets: structuredClone(coursesWidgetsList),
    }
  },
  created() {
    window.addEventListener('resize', this.checkScreenSize)
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.checkScreenSize)
  },

  methods: {
    goToEditCoursePage() {
      this.navigate({ mode: 'push', to: { name: 'EditCourse', params: { id: this.courseId } } })
    },
    checkScreenSize() {
      this.screenIsLarge = window.innerWidth >= 1000
    },
    switchToForm() {
      this.$emit('switch-to-form')
    },
  },
  computed: {
    getOnceDate() {
      if (!this.weekRange || !this.weekDay) return false
      const onceDate = getDateFromWeekRange(this.weekRange.start, this.weekDay)
      return new Date(onceDate).toLocaleDateString('de-DE', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })
    },
    cardSizeClass() {
      return this.mode === 'preview' ? 'calendar-card--large' : 'calendar-card--compact'
    },
    statusClass() {
      if (this.status === 'represent') return 'status-represent'
      if (this.status === 'regular') return 'status-regular'
      return 'status-cancelled'
    },
    courseStyle() {
      return (
        this.courseWidgets[this.sport] || {
          color: '#ccc',
          icon: '',
        }
      )
    },
    getStartTime() {
      return calcStartTime(this.minutes, this.hour)
    },
    getEndTime() {
      return calcEndTime(this.minutes, this.hour, this.duration)
    },
    getStatus() {
      if (this.status === 'represent') return 'Vertretung'
      if (this.status === 'regular') return 'Regulär'
      return 'Ausfall'
    },
    getRecurring() {
      return this.recurring
        ? `Wöchentlich am ${this.weekDayName}`
        : this.recurring === false && this.getOnceDate
          ? `Einmalig, am ${this.getOnceDate}`
          : this.recurring === false
            ? 'Einmalig'
            : ''
    },
  },
}
</script>

<style scoped>
/** base */
.calendar-event {
  /* background-color: var(--color-secondary); */
  color: var(--color-text);
  border-radius: 1rem;
  width: 95%;
  min-height: 15rem;
  margin: 0 auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: opacity 0.25s;

  background: rgba(255, 255, 255, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.2);
}
.calendar-event__header {
  margin-bottom: var(--space-sm);
}

/** heights -> for mobile */
.calendar-event__header {
  /* background-color: red; */
  min-height: 20%;
}
.calendar-event__trainer {
  min-height: 20%;
  /* background-color: blue; */
}
.calendar-event__time {
  min-height: 20%;
  /* background-color: orange; */
}
.calendar-event__duration {
  min-height: 10%;
  /* background-color: blue; */
}

/** mode */
.calendar-card--compact {
  font-size: 0.8rem;
  padding: 0.5rem;
}
.calendar-card--large {
  font-size: 1.6rem;
  padding: 1.5rem;
}

/** info */
.calendar-event__trainer,
.calendar-event__duration,
.calendar-event__time {
  color: #333;
  margin-bottom: var(--space-sm);
}
.calendar-event__time {
  font-style: italic;
}

/** status */

.calendar-event__status {
  width: fit-content;
  padding: 0 var(--space-xs);
  border-radius: 9999px;
}

.status-represent {
  background-color: lightgoldenrodyellow;
  border: 1px solid #856404;
  color: #856404;
}

.status-regular {
  background-color: #e8f5e9;
  color: green;
  border: 1px solid green;
}

.status-cancelled {
  background-color: #ffebee;
  color: #d32f2f;
  border: 1px solid #d32f2f;
}

/** preview - day, recurring */

.calendar-event__preview {
  margin-top: var(--space-md);
  padding: var(--space-sm);
  border-radius: 1rem;
  font-weight: bold;
  color: #444;
}
.calendar-event__preview-weekday {
  margin-bottom: var(--space-xs);
}

/** media queries, responsive */

@media (min-width: 576px) {
  .calendar-card--compact {
    font-size: 1rem;
    padding: var(--space-sm);
  }
  .calendar-event__status {
    padding: 0 var(--space-sm);
  }
  .calendar-event__header,
  .calendar-event__trainer,
  .calendar-event__time,
  .calendar-event__duration {
    min-height: 0%;
  }
}

@media (min-width: 768px) {
  .calendar-card--compact {
    font-size: 1.2rem;
  }
  .calendar-event__status {
    margin: 0.5rem 0;
  }
}

@media (min-width: 1024px) {
  .calendar-event {
    padding: var(--space-md);
  }
  .calendar-card--compact {
    font-size: 1.4rem;
  }
  .calendar-card--large {
    padding: 1.5rem;
  }
  .calendar-event__status {
    padding: var(--space-xs) var(--space-md);
  }
  .calendar-event__preview-weekday,
  .calendar-event__preview-recurring {
    font-size: 1.4rem;
  }
}

/** buttons, hover-effect */

.btn-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 1rem;
}
.btn-container__edit,
.btn-container__delete {
  width: 50%;
}

.calendar-event:hover {
  cursor: pointer;
}
</style>
