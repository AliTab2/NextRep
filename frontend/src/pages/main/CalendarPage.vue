<template>
  <div class="calendar-page">
    <CalendarBody />
  </div>
</template>

<script>
import CalendarBody from '@/components/Calendar/CalendarBody.vue'

export default {
  components: {
    CalendarBody,
  },
}
</script>

<style>
.calendar-page {
  height: 100%;
  display: flex;
  flex-direction: column;
  padding-bottom: 2rem;
  position: relative;
  background-color: #db1200;
  background-size: cover;
  background-position: center;
  z-index: 0;
  overflow: hidden; /* falls nötig, damit overlay nicht rausläuft */
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3); /* hier die gewünschte Abdunklung */
  z-index: 1; /* über dem Hintergrund, aber unter dem Inhalt */
  pointer-events: none; /* wichtig, damit Overlay keine Klicks blockiert */
}

.calendar-page > *:not(.overlay) {
  position: relative;
  z-index: 2; /* sicherstellen, dass der Inhalt über dem Overlay ist */
}
</style>
