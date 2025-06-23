<template>
  <div class="add-course-page__form-wrapper">
    <base-form title="Sportkurs Registrierung">
      <CourseSportSelector @update-sport="updateCourseSport" />
      <CourseTrainerSelector @update-trainer="updateCourseTrainer" />
      <CourseDaySelector @update-day="updateCourseDay" />
      <CourseTimeSelector @update-hour="updateCourseHour" @update-minute="updateCourseMinutes" />
      <CourseDurationSelector @update-duration="updateCourseDuration" />
      <CourseStatusSelector @update-status="updateCourseStatus" />
      <CourseRecurringSelector @update-recurring="updateCoursRecurring" />
      <div class="btn-container">
        <base-button @click="addCourse" :is-loading="isLoading" :disabled="!hasChanged"
          >Speichern</base-button
        >
        <base-button variant="delete" @click="navigate({ mode: 'back', fallback: '/calendar' })"
          >Zurück</base-button
        >
      </div>
    </base-form>
  </div>
</template>

<script>
import CourseTimeSelector from '@/components/Course/CourseTimeSelector.vue'
import CourseSportSelector from '@/components/Course/CourseSportSelector.vue'
import CourseDurationSelector from '@/components/Course/CourseDurationSelector.vue'
import CourseDaySelector from '@/components/Course/CourseDaySelector.vue'
import CourseStatusSelector from '@/components/Course/CourseStatusSelector.vue'
import CourseTrainerSelector from '@/components/Course/CourseTrainerSelector.vue'
import CourseRecurringSelector from '@/components/Course/CourseRecurringSelector.vue'

import { mapActions, mapState } from 'pinia'
import useCourseStore from '@/stores/courseStore.js'
import { checkCourse } from '@/utils/validate.js'
import { ref } from 'vue'
import { generateCourseLogObj } from '@/utils/logging'
import { useSmartNavigation } from '@/composables/useSmartNavigation.js'

export default {
  props: ['courseObj', 'isEditing', 'shouldDeleteCourse', 'deleteOptions'],
  components: {
    CourseSportSelector,
    CourseDurationSelector,
    CourseDaySelector,
    CourseStatusSelector,
    CourseRecurringSelector,
    CourseTimeSelector,
    CourseTrainerSelector,
  },
  setup() {
    const { navigate } = useSmartNavigation()
    return { navigate }
  },
  data() {
    return {
      course: {},
      courseCopy: {},
      changeOnlyThisEntry: true,
      showRecurringSelector: false,
      showChangeSelector: false,
      isInvalid: false,
      invalidInputs: ref([]),
      isLoading: false,
      hasChanged: false,
      hasChangedCount: 0,
    }
  },
  provide() {
    return {
      errorInputs: this.invalidInputs,
    }
  },
  created() {
    this.course = { ...this.courseObj }
    this.courseCopy = JSON.parse(JSON.stringify(this.course))

    this.showRecurringSelector = this.course.date.recurring === false
    this.showChangeSelector = this.course.date.recurring === true
  },
  methods: {
    async addCourse() {
      const { invalid, invalidInputs } = checkCourse(this.course)

      if (invalid) {
        this.isInvalid = true
        this.invalidInputs.value = invalidInputs
        this.$emit('invalid-input', invalidInputs)
        return
      }

      const actionKey = this.course.date.recurring ? 'add_recurring' : 'add_once'
      const logObj = generateCourseLogObj(actionKey, this.course)

      this.isLoading = true
      const res = await this.addCourse_store(this.course, { ...logObj })
      this.isLoading = false

      if (res.error) {
        this.$emit('error', res.message || 'Fehler beim Hinzufügen des Kurses')
      } else {
        this.$emit('success', 'Kurs wurde erfolgreich hinzugefügt')
      }
    },
    updateCourse() {
      this.$emit('update-course', this.course)

      this.hasChangedCount += 1

      if (this.isEditing && this.hasChangedCount >= 1) {
        this.hasChanged = true
      }
      if (!this.isEditing) this.hasChanged = true
    },
    updateCourseSport(value) {
      this.course.sport = value
      this.updateCourse()
    },
    updateCourseTrainer(trainerId, trainerName) {
      console.log(trainerId, trainerName)
      this.course.trainer = {}
      this.course.trainer._id = trainerId
      this.course.trainer.name = trainerName
      this.updateCourse()
    },
    updateCourseDay(dayIndex, dayName) {
      this.course.date.weekDay = dayIndex
      this.course.date.weekDayName = dayName
      this.updateCourse()
    },
    updateCourseHour(value) {
      this.course.time.hour = value
      this.updateCourse()
    },
    updateCourseMinutes(value) {
      this.course.time.minutes = value
      this.updateCourse()
    },
    updateCourseDuration(value) {
      this.course.time.duration = value
      this.updateCourse()
    },
    updateCourseStatus(value) {
      this.course.status = value
      this.updateCourse()
    },
    updateCoursRecurring(value) {
      this.course.date.recurring = value === 'recurring'
      this.updateCourse()
    },
    updateCourseTypeOfChange(value) {
      this.changeOnlyThisEntry = value === 'once'
      this.hasChanged = true
    },

    ...mapActions(useCourseStore, ['addCourse_store', 'updateCourse_store', 'deleteCourse_store']),
  },
  computed: {
    ...mapState(useCourseStore, ['weekRange']),
  },
  watch: {
    async shouldDeleteCourse() {
      this.deleteCourse()
    },
  },
}
</script>

<style scoped>
.add-course-page__form-wrapper {
  width: 100%;
  margin: 0 auto;
}

.btn-container {
  display: flex;
  flex-direction: row;
  gap: 1rem;
}
.btn-container button {
  width: 50%;
}

@media (min-width: 768px) {
  .add-course-page__form-wrapper {
    width: 70%;
  }
}

@media (min-width: 1000px) {
  .add-course-page__form-wrapper {
    width: 80%;
  }
}
</style>
