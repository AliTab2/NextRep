<template>
  <div class="calendar-body glass">
    <CalendarDays />
    <CalendarEvents />
  </div>
</template>

<script>
import CalendarDays from '@/components/Calendar/CalendarDays.vue'
import CalendarEvents from '@/components/Calendar/CalendarEvents.vue'

export default {
  components: {
    CalendarDays,
    CalendarEvents,
  },
}
</script>

<style scoped>
.glass {
  background: rgba(255, 255, 255, 0.5);
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
  -ms-overflow-style: none; /* IE + Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
