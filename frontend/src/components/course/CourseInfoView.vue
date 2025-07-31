<template>
  <div class="course-info">
    <div class="info-item info-item-header">
      <div>
        <h3 class="label">Sportart</h3>
        <p class="value" :style="{ color: coursesWidgetsList[course.sport].color }">
          {{ course.sport }}
        </p>
      </div>
      <DropdownEdit @edit="$emit('edit')" @delete="showDeleteModal = true" />
      <DeleteCourseModal
        v-model="changeScope"
        :show-modal="showDeleteModal"
        @close-delete="showDeleteModal = false"
        @confirm-delete="deleteCourse"
        :recurrence-pattern="recurrencePattern"
      />
    </div>

    <div class="info-item">
      <h3 class="label">Release</h3>
      <p class="value">{{ exceptionToday?.release || course.release }}</p>
    </div>

    <div class="info-item">
      <h3 class="label">Trainer</h3>
      <p class="value">
        <span v-if="course.trainer?.length">
          {{ course.trainer.map((t) => t.name).join(', ') }}
        </span>
        <span v-else>-</span>
      </p>
    </div>

    <div class="info-item">
      <h3 class="label">Startzeit</h3>
      <p class="value">{{ course.timeInfo.hour }}:{{ pad(course.timeInfo.minute) }}</p>
    </div>

    <div class="info-item">
      <h3 class="label">Dauer</h3>
      <p class="value">{{ course.timeInfo.duration }} Min.</p>
    </div>

    <div class="info-item">
      <h3 class="label">Wiederholung</h3>
      <p class="value">
        {{ recurrenceLabel[course.dateInfo.recurrencePattern] || '-' }}
      </p>
    </div>

    <div class="info-item">
      <h3 class="label">Status</h3>
      <p :class="['value', `status-${course.status}--text`]">
        {{ statusList.find((obj) => obj.value === course.status).label }}
      </p>
    </div>
  </div>
</template>

<script setup>
import DropdownEdit from '@/components/course/DropdownEdit.vue'
import DeleteCourseModal from '@/components/course/modals/DeleteCourseModal.vue'

import Course from '@/models/Course'
import DateInfo from '@/models/DateInfo'
import useCourseStore from '@/stores/courseStore'
import { CourseService } from '@/services/courseService'

import { statusList, coursesWidgetsList } from '@/utils/base'
import { computed, ref } from 'vue'

const props = defineProps(['originalCourse', 'exceptionToday'])
const emit = defineEmits(['error', 'success', 'edit'])
const showDeleteModal = ref(false)
const changeScope = ref('once')

const course = computed(() => props.exceptionToday ?? props.originalCourse)
const recurrencePattern = computed(() => props.originalCourse.dateInfo.recurrencePattern)
const isRecurring = computed(() => recurrencePattern.value === 'weekly')

async function deleteCourse() {
  let result = null

  if (changeScope.value === 'once' && isRecurring.value) {
    const dateInfo = new DateInfo(
      useCourseStore().weekRange,
      course.value.dateInfo.dayIndex,
      course.value.dateInfo.recurrencePattern,
    )
    const exception = new Course(
      course.value.sport,
      course.value.release,
      course.value.trainer,
      'deleted',
      course.value.timeInfo,
      dateInfo,
    )
    result = await CourseService.deleteCourse(exception, props.originalCourse)
  } else {
    result = await CourseService.deleteCourse(null, props.originalCourse)
  }

  if (result.error) {
    emit('error', result.message)
  } else {
    emit('success', result.message || 'Kurstermin erfolgreich gelöscht.')
  }
}

function pad(num) {
  return num.toString().padStart(2, '0')
}

const recurrenceLabel = {
  once: 'Einmalig',
  weekly: 'Wöchentlich',
  biweekly: 'Zweiwöchentlich',
}
</script>

<style scoped>
.course-info {
  max-width: 100%;
}

.info-item {
  border-bottom: 1px solid #ccc;
  padding: 1.5rem;
}

.label {
  font-size: 1.4rem;
  color: #666;
  margin: 0;
}

.value {
  font-size: 1.6rem;
  color: #222;
  margin: 0.4rem 0 0;
}

.info-item-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.status-regular--text {
  color: var(--color-status-regular);
}
.status-represent--text {
  color: var(--color-status-represent);
  font-weight: bold;
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
</style>
