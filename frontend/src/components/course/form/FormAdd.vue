<template>
  <div class="add-course-page__form-wrapper">
    <base-form title="Sportkurs Registrierung">
      <SportSelector v-model="course.sport" field-name="sport" :invalid-inputs="invalidInputs" />
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
      <RecurrenceSelector
        v-model="course.dateInfo.recurrencePattern"
        field-name="recurrence"
        :invalid-inputs="invalidInputs"
      />
      <div class="btn-container">
        <base-button variant="delete" @click="navigate({ mode: 'back', fallback: '/calendar' })"
          >Abbrechen</base-button
        >
        <base-button variant="dark" @click="addCourse" :is-loading="isLoading"
          >Speichern</base-button
        >
      </div>
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
import RecurrenceSelector from '@/components/course/selectors/RecurrenceSelector.vue'

import { ref } from 'vue'
import { mapState } from 'pinia'
import { useSmartNavigation } from '@/composables/useSmartNavigation.js'
import Course from '@/models/Course'
import TimeInfo from '@/models/TimeInfo'
import DateInfo from '@/models/DateInfo'
import { CourseService } from '@/services/courseService.js'
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
    RecurrenceSelector,
  },
  setup() {
    const { navigate } = useSmartNavigation()
    return { navigate }
  },
  data() {
    const course = new Course(undefined, undefined, [])
    course.timeInfo = new TimeInfo()
    course.dateInfo = new DateInfo()

    return {
      course,
      invalidInputs: ref([]),
      isLoading: false,
    }
  },
  methods: {
    async addCourse() {
      const { invalid, invalidInputs } = this.course.isValid()
      if (invalid) {
        this.invalidInputs.value = invalidInputs
        this.$emit('invalid-input', invalidInputs)
        return
      }
      this.course.dateInfo.creationWeekRange = this.weekRange
      const result = await CourseService.addCourse(this.course)
      if (result.error) {
        this.$emit('error', result.message)
      } else {
        this.$emit('success', result.message || 'Kurstermin erfolgreich hinzugefügt.')
      }
    },
  },
  computed: {
    ...mapState(useCourseStore, ['weekRange']),
    trainerIsInvalid() {
      return this.invalidInputs?.value?.includes('trainer')
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
