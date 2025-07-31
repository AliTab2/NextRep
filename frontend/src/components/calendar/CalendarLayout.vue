<template>
  <div class="calendar-body">
    <WeekDaysHeader :days="partOfWeek.days" />
    <WeekEventGrid :courses="partOfWeek.courses" />
  </div>
</template>

<script>
import WeekDaysHeader from '@/components/calendar/WeekDaysHeader.vue'
import WeekEventGrid from '@/components/calendar/WeekEventGrid.vue'

export default {
  components: {
    WeekDaysHeader,
    WeekEventGrid,
  },
  props: {
    partOfWeek: {
      type: Object,
      required: true,
    },
  },
}
</script>
<style scoped>
.calendar-body {
  width: 98%;
  margin: 1rem auto 0;
  padding-bottom: 1rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border-radius: 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  min-height: 0;
  overflow-y: auto;
  background: rgba(255, 255, 255);
}

.calendar-body::-webkit-scrollbar {
  display: none;
}
.calendar-body {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
