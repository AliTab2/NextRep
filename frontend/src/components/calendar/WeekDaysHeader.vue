<template>
  <ul class="calendar-days">
    <li
      v-for="(dayObj, index) in days"
      :key="index"
      class="calendar-days__item"
      :class="{ 'is-today': isToday(dayDates[index]) }"
      :style="{ width: `calc(100% / ${days.length})` }"
    >
      <p class="calendar-days__name">{{ dayObj.label }}</p>
      <p class="calendar-days__weekday">
        {{ dayDates[index].getDate() }}
      </p>
    </li>
  </ul>
</template>

<script>
import useCourseStore from '@/stores/courseStore.js'
import { mapState } from 'pinia'

export default {
  props: {
    days: {
      type: Array,
      required: true,
      // format: [ { label: 'mo', index: 1 }, ... ]
    },
  },
  computed: {
    ...mapState(useCourseStore, ['weekRange']),
    dayDates() {
      if (!this.weekRange || !this.weekRange.start) return []

      const startDate = new Date(this.weekRange.start)

      return this.days.map((dayObj) => {
        const moveDays = dayObj.index === 0 ? 6 : dayObj.index - 1
        const date = new Date(startDate)
        date.setDate(startDate.getDate() + moveDays)
        return date
      })
    },
  },
  methods: {
    isToday(date) {
      const today = new Date()
      return (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
      )
    },
  },
}
</script>

<style scoped>
.calendar-days {
  list-style: none;
  display: flex;
  margin: 0;
  padding: 0;
  height: auto;
  position: sticky;
  top: 0;
  z-index: 10;
  box-shadow: 0 4px 6px -4px rgba(0, 0, 0, 0.2);
}

.calendar-days__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 1rem;
  padding-top: 0.5rem;
}

.calendar-days__name {
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--color-text);
  border-radius: 1rem;
  text-align: center;
  white-space: nowrap;
  margin: 0;
}
.calendar-days__weekday {
  font-size: 1rem;
}

@media (min-width: 768px) {
  .calendar-days__name {
    font-size: 1.6rem;
    /* padding: 0.8rem 1rem; */
  }
  .calendar-days__weekday {
    font-size: 1.2rem;
  }
}

@media (min-width: 1024px) {
  .calendar-days__name {
    font-size: 1.8rem;
    /* padding: 1rem 1.2rem; */
  }
}

.calendar-days__item.is-today {
  font-weight: bolder;
  background-color: var(--color-accent);
}
</style>
