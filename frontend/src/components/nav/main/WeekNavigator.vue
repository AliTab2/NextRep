<template>
  <div class="calendar-nav app-header__calendar-nav">
    <font-awesome-icon
      class="circle-arrow-icon"
      @click="moveOneWeek('back')"
      size="2xl"
      icon="fa-solid fa-circle-arrow-left"
    />
    <font-awesome-icon
      class="circle-arrow-icon"
      @click="moveOneWeek('forward')"
      size="2xl"
      icon="fa-solid fa-circle-arrow-right"
    />
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
  gap: 0.5rem;
}
.circle-arrow-icon {
  font-size: 2.5rem;
  color: var(--color-accent);
  transition: background-color 0.3s ease;
  cursor: pointer;
}
.circle-arrow-icon:hover {
  opacity: 0.8;
}
</style>
