<template>
  <div class="add-course-page__form-wrapper">
    <base-form title="Sportkurs Bearbeiten">
      <SportSelector
        v-model="course.sport"
        field-name="sport"
        :invalid-inputs="invalidInputs"
        disabled
      />
      <ReleasesSelector
        v-model="course.release"
        field-name="releases"
        :invalid-inputs="invalidInputs"
      />
      <TrainerSelector
        v-model="course.trainer"
        field-name="trainer"
        :invalid-inputs="invalidInputs"
      />
      <DaySelector
        v-model="course.dateInfo.dayIndex"
        field-name="weekDay"
        :invalid-inputs="invalidInputs"
        disabled
      />
      <TimePicker
        label="Uhrzeit"
        v-model="course.timeInfo"
        field-name="hour"
        :invalid-inputs="invalidInputs"
      />
      <DurationSelector
        v-model="course.timeInfo.duration"
        field-name="duration"
        :invalid-inputs="invalidInputs"
      />
      <StatusSelector v-model="course.status" field-name="status" :invalid-inputs="invalidInputs" />
      <div class="btn-container">
        <base-button variant="delete" @click="navigate({ mode: 'back', fallback: '/calendar' })"
          >Abbrechen</base-button
        >
        <base-button variant="dark" @click="handleCourseValidation" :is-loading="isLoading"
          >Speichern</base-button
        >
      </div>
      <EditCourseModal
        :show-modal="showEditModal"
        @close-edit="showEditModal = false"
        @confirm-edit="updateCourse"
        v-model="changeScope"
      />
    </base-form>
  </div>
</template>

<script>
import SportSelector from '@/components/course/selectors/SportSelector.vue'
import ReleasesSelector from '@/components/course/selectors/ReleasesSelector.vue'
import TrainerSelector from '@/components/course/selectors/TrainerSelector.vue'
import DaySelector from '@/components/course/selectors/DaySelector.vue'
import TimePicker from '@/components/course/selectors/TimePicker.vue'
import DurationSelector from '@/components/course/selectors/DurationSelector.vue'
import StatusSelector from '@/components/course/selectors/StatusSelector.vue'
import EditCourseModal from '@/components/course/modals/EditCourseModal.vue'

import { ref } from 'vue'
import { mapState } from 'pinia'
import { useSmartNavigation } from '@/composables/useSmartNavigation.js'
import Course from '@/models/Course'
import TimeInfo from '@/models/TimeInfo'
import DateInfo from '@/models/DateInfo'
import { CourseService } from '@/services/courseService'
import useCourseStore from '@/stores/courseStore'

export default {
  components: {
    SportSelector,
    ReleasesSelector,
    TrainerSelector,
    DaySelector,
    TimePicker,
    DurationSelector,
    StatusSelector,
    EditCourseModal,
  },
  setup() {
    const { navigate } = useSmartNavigation()
    return { navigate }
  },
  props: {
    originalCourse: {
      type: Object,
      required: true,
    },
    exceptionToday: {
      type: Object,
      required: false,
      default: () => null,
    },
  },
  data() {
    const course = new Course(
      this.exceptionToday?.sport || this.originalCourse.sport,
      this.exceptionToday?.release || this.originalCourse.release,
      this.exceptionToday?.trainer || this.originalCourse.trainer,
      this.exceptionToday?.status || this.originalCourse.status,
    )
    course.timeInfo = new TimeInfo(
      this.exceptionToday?.timeInfo.hour || this.originalCourse.timeInfo.hour,
      this.exceptionToday?.timeInfo.minute || this.originalCourse.timeInfo.minute,
      this.exceptionToday?.timeInfo.duration || this.originalCourse.timeInfo.duration,
    )
    course.dateInfo = new DateInfo(
      this.exceptionToday?.dateInfo.creationWeekRange ||
        this.originalCourse.dateInfo.creationWeekRange,
      this.exceptionToday?.dateInfo.dayIndex || this.originalCourse.dateInfo.dayIndex,
      this.exceptionToday?.dateInfo.recurrencePattern ||
        this.originalCourse.dateInfo.recurrencePattern,
    )
    return {
      course,
      invalidInputs: ref([]),
      isLoading: false,
      showEditModal: false,
      changeScope: 'once',
    }
  },
  methods: {
    handleCourseValidation() {
      const { invalid, invalidInputs } = this.course.isValid()
      if (invalid) {
        this.invalidInputs.value = invalidInputs
        this.$emit('invalid-input', invalidInputs)
        return
      }

      if (this.recurringCourse) {
        this.showEditModal = true
      } else {
        this.updateCourse()
      }
    },
    async updateCourse() {
      this.showEditModal = false
      this.course._id = this.originalCourse._id

      let result = null

      // one entry
      if (this.changeScope === 'once') {
        this.course.dateInfo.creationWeekRange = this.weekRange
        this.course.dateInfo.recurrencePattern = 'once'
        result = await CourseService.updateCourse(this.course, this.originalCourse)
      } else {
        // important: from one -> all
        this.course.dateInfo.creationWeekRange = this.originalCourse.dateInfo.creationWeekRange
        this.course.dateInfo.recurrencePattern = 'weekly'
        result = await CourseService.updateCourse(null, this.course)
      }

      if (result.error) {
        this.$emit('error', result.message)
      } else {
        this.$emit('success', result.message || 'Kurstermin erfolgreich aktualisiert.')
      }
    },
  },
  computed: {
    ...mapState(useCourseStore, ['weekRange', 'courses']),
    recurringCourse() {
      return this.originalCourse.dateInfo.recurrencePattern === 'weekly'
    },
  },
}
</script>

<style scoped>
.add-course-page__form-wrapper {
  width: 90%;
  margin: 2rem auto;
  padding-bottom: 2rem;
}
@media (min-width: 768px) {
  .add-course-page__form-wrapper {
    width: 70%;
  }
}
@media (min-width: 1024px) {
  .add-course-page__form-wrapper {
    width: 50%;
  }
}
.btn-container {
  display: flex;
  flex-direction: row;
  gap: 1rem;
}
.btn-container button {
  width: 50%;
}
</style>
