<template>
  <ul class="expanded-list">
    <li class="expanded-list-item" v-for="exception in courseExceptions" :key="exception._id">
      <font-awesome-icon icon="fa-solid fa-turn-up" flip="horizontal" />
      {{ `${exception.status} am ${exception.date}` }}
      {{ exception.trainer ? `mit ${exception.trainer}` : '' }}
    </li>
  </ul>
</template>

<script>
import { statusList } from '@/utils/base'
import { getDateFromWeekRange } from '@/utils/calendar'
export default {
  props: {
    exceptions: {
      type: Array,
      required: true,
    },
  },
  computed: {
    courseExceptions() {
      return this.exceptions.map((e) => {
        const status = statusList.find((s) => s.value === e.status).label
        const date = getDateFromWeekRange(e.dateInfo?.creationWeekRange.start, e.dateInfo?.dayIndex)
        const trainer = e.trainer.map((t) => t.name).join(', ')
        const noTrainer = ['cancelled', 'deleted'].includes(e.status)
        return {
          status,
          date: date.toLocaleDateString('de-DE'),
          trainer: noTrainer ? false : trainer,
        }
      })
    },
  },
}
</script>

<style scoped>
.expanded-list {
  list-style-type: none;
}
.expanded-list-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}
</style>
