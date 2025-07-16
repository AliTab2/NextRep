<template>
  <div class="calendar-body glass">
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
.glass {
  background: rgba(255, 255, 255);
  backdrop-filter: blur(0.5rem);
  -webkit-backdrop-filter: blur(1rem);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 1rem;
}

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
}

.calendar-body::-webkit-scrollbar {
  display: none;
}
.calendar-body {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
