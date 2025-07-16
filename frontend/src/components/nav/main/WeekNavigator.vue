<template>
  <div class="calendar-nav app-header__calendar-nav">
    <button class="calendar-nav__button" @click="moveOneWeek('back')">
      <span v-html="back"></span>
    </button>

    <span class="calendar-nav__range">{{ getWeekRange }}</span>

    <button class="calendar-nav__button" @click="moveOneWeek('forward')">
      <span v-html="forward"></span>
    </button>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import useCourseStore from '@/stores/courseStore.js'
import {
  calcBaseStartDate,
  calcEndOfWeek,
  formatDate,
  calcWeekRange,
  calcCurrentMonthAndYear,
  calcStoreWeekRange,
} from '@/utils/calendar'
import { navArrowForward, navArrowBackward } from '@/utils/base'
export default {
  data() {
    return {
      forward: navArrowForward,
      back: navArrowBackward,
      baseStartDate: null, // monday of current week
      endOfWeek: null,
      weekOffset: 0,
    }
  },
  methods: {
    ...mapActions(useCourseStore, ['addCourse', 'updateWeekRange']),

    initBaseStartDate() {
      this.baseStartDate = calcBaseStartDate()
    },
    initEndOfWeek() {
      this.endOfWeek = calcEndOfWeek(this.baseStartDate)
    },
    moveOneWeek(direction) {
      if (direction === 'back') this.weekOffset -= 1
      if (direction === 'forward') this.weekOffset += 1
      // tracks in which month and year user is navigating
      this.updateMonthAndYear()
      this.updateStoreWeekRange()
    },
    backToCurrentWeek() {
      this.weekOffset = 0
      this.updateStoreWeekRange()
    },
    updateMonthAndYear() {
      this.$emit('update', this.currentMonthAndYear)
    },
    updateStoreWeekRange() {
      const { start, end } = calcStoreWeekRange(this.baseStartDate, this.weekOffset)
      this.updateWeekRange(start, end)
    },
  },
  computed: {
    ...mapState(useCourseStore, ['courses', 'weekRange']),

    getWeekRange() {
      return calcWeekRange(this.baseStartDate, this.weekOffset, formatDate)
    },
    currentMonthAndYear() {
      return calcCurrentMonthAndYear(this.baseStartDate, this.weekOffset)
    },
  },
  created() {
    this.initBaseStartDate()
    this.initEndOfWeek()
    this.updateMonthAndYear()
    this.updateStoreWeekRange()
  },
}
</script>

<style scoped>
button {
  margin-top: 0;
}
.calendar-nav {
  display: flex;
  align-items: center;
}
.calendar-nav__button {
  width: 2.5rem;
  height: 2.5rem;
  border: none;
  border-radius: 0.75rem;
  background-color: #db1200;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}
.calendar-nav__button:hover {
  opacity: 0.8;
}
.calendar-nav__range {
  font-size: 1.2rem;
  font-weight: 500;
  color: var(--color-text);
  text-align: center;
  padding: 0 0.5rem;
}
@media (min-width: 768px) {
  .calendar-nav {
    gap: 0.5rem;
    padding: 0.5rem;
  }
  .calendar-nav__button {
    width: 3rem;
    height: 3rem;
    font-size: 1.8rem;
  }
  .calendar-nav__range {
    font-size: 1.4rem;
  }
}
@media (min-width: 1024px) {
  .calendar-nav__button {
    width: 3rem;
    height: 3rem;
    font-size: 2rem;
  }
  .calendar-nav__range {
    font-size: 1.4rem;
  }
}
.app-header__calendar-nav {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
}
</style>
