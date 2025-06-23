<template>
  <div class="add-course-page__form-wrapper">
    <base-form title="Sportkurs Bearbeiten">
      <CourseSportSelector @update-sport="updateCourseSport" :sport="courseObj.sport" />
      <CourseTrainerSelector
        @update-trainer="updateCourseTrainer"
        :trainer="courseObj.trainer._id"
      />
      <CourseDaySelector @update-day="updateCourseDay" :day="courseObj.date.weekDay" />
      <CourseTimeSelector
        @update-hour="updateCourseHour"
        @update-minute="updateCourseMinutes"
        :minutes="courseObj.time.minutes"
        :hour="courseObj.time.hour"
      />
      <CourseDurationSelector
        @update-duration="updateCourseDuration"
        :duration="courseObj.time.duration"
      />
      <CourseStatusSelector @update-status="updateCourseStatus" :status="courseObj.status" />
      <CourseRecurringSelector
        v-if="showRecurringSelector"
        @update-recurring="updateCoursRecurring"
        :recurring="courseObj.date.recurring"
      />
      <CourseChangeSelector
        v-if="showChangeSelector"
        @update-change="updateCourseTypeOfChange"
        change="once"
      />
      <div class="btn-container">
        <base-button @click="updateEditedCourse" :is-loading="isLoading" :disabled="!hasChanged"
          >Aktualisieren</base-button
        >
        <base-button @click="navigate({ mode: 'back', fallback: '/calendar' })" variant="delete"
          >Abbrechen</base-button
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
import CourseChangeSelector from '@/components/Course/CourseChangeSelector.vue'

import { mapActions, mapState } from 'pinia'
import useCourseStore from '@/stores/courseStore.js'
import { checkCourse } from '@/utils/validate.js'
import { ref } from 'vue'
import { getDateFromWeekRange } from '@/utils/calendar.js'
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
    CourseChangeSelector,
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

    // console.log(this.courseObj)

    this.showRecurringSelector = this.course.date.recurring === false
    this.showChangeSelector = this.course.date.recurring === true
  },
  methods: {
    async updateEditedCourse() {
      const { invalid, invalidInputs } = checkCourse(this.course)

      if (invalid) {
        this.isInvalid = true
        this.invalidInputs.value = invalidInputs
        this.$emit('invalid-input', invalidInputs)
        return
      }

      try {
        // Bearbeitung eines wiederkehrenden Kurses
        if (this.courseCopy.date.recurring) {
          const exceptionDate = getDateFromWeekRange(this.weekRange.start, this.course.date.weekDay)
          this.courseCopy.date.exceptions.push(exceptionDate)

          if (this.changeOnlyThisEntry) {
            // Fall: Nur diese eine Instanz bearbeiten (aus Serien-Kurs)
            const logObj = generateCourseLogObj('edit_single', this.courseCopy, this.weekRange)

            // ### TEST ###
            // console.log(logObj)

            this.isLoading = true
            const updateRes = await this.updateCourse_store(this.courseCopy, logObj)
            const addRes = await this.addCourse_store(
              {
                ...this.course,
                date: { ...this.course.date, recurring: false },
              },
              // { ...logObj },
            )
            this.isLoading = false

            if (updateRes.error || addRes.error) {
              this.$emit(
                'error',
                updateRes.message || addRes.message || 'Aktualisierung fehlgeschlagen',
              )
              return
            } else {
              this.$emit('success', 'Kurs wurde erfolgreicht aktualisiert')
            }
          } else {
            // Fall: Diese Instanz + alle folgenden bearbeiten
            this.courseCopy.date.repeatUntil = new Date(this.weekRange.start)
            const logObj = generateCourseLogObj('edit_all', this.courseCopy, this.weekRange)

            // ### TEST ###
            // console.log(logObj)

            this.isLoading = true
            const updateRes = await this.updateCourse_store(this.courseCopy, logObj)
            const addRes = await this.addCourse_store(
              {
                ...this.course,
                date: { ...this.course.date, recurring: true },
              },
              // { ...logObj },
            )
            this.isLoading = false

            if (updateRes.error || addRes.error) {
              this.$emit(
                'error',
                updateRes.message || addRes.message || 'Bearbeitung der Serie fehlgeschlagen',
              )
              return
            } else {
              this.$emit('success', 'Kurs wurde erfolgreicht aktualisiert')
            }
          }
        } else {
          // Fall: Einzelkurs bearbeiten
          const logObj = generateCourseLogObj('edit_single', this.courseCopy)

          // ### TEST ###
          // console.log(logObj)

          this.isLoading = true
          const res = await this.updateCourse_store(this.course, logObj)
          this.isLoading = false

          if (res.error) {
            this.$emit('error', res.message || 'Kurs konnte nicht aktualisiert werden')
            return
          } else {
            this.$emit('success', 'Kurs wurde erfolgreicht aktualisiert')
          }
        }
      } catch (err) {
        console.error('Fehler beim Kurs-Update:', err)
        this.$emit('error', 'Ein unerwarteter Fehler ist aufgetreten')
      }
    },
    async deleteCourse() {
      console.log('called')

      // delete this and futre entries from mobile!
      if (this.deleteOptions?.isMobile && this.deleteOptions?.all) {
        this.changeOnlyThisEntry = false
      }

      try {
        if (this.courseCopy.date.recurring) {
          // Wiederkehrender Kurs
          if (this.changeOnlyThisEntry) {
            // Nur diese eine Instanz aus Serie ausnehmen
            const exceptionDate = getDateFromWeekRange(
              this.weekRange.start,
              this.course.date.weekDay,
            )
            this.courseCopy.date.exceptions.push(exceptionDate)

            const logObj = generateCourseLogObj('delete_single', this.course, this.weekRange)
            this.isLoading = true
            const res = await this.updateCourse_store(this.courseCopy, logObj)
            this.isLoading = false

            if (res.error) {
              this.$emit(
                'error',
                res.message || 'Diese Kurseinheit konnte nicht ausgeblendet werden.',
              )
              return
            }
          } else {
            // Alle zukünftigen Termine löschen (nicht rückwirkend!)
            this.courseCopy.date.repeatUntil = new Date(this.weekRange.start)
            const logObj = generateCourseLogObj('delete_all', this.course, this.weekRange)
            this.isLoading = true
            const res = await this.updateCourse_store(this.courseCopy, logObj)
            this.isLoading = false

            if (res.error) {
              this.$emit('error', res.message || 'Kurse konnten nicht gelöscht werden.')
              return
            }
          }
        } else {
          // Einzelkurs löschen
          const logObj = generateCourseLogObj('delete_single', this.courseCopy)
          const res = await this.deleteCourse_store(this.courseCopy._id, logObj)

          if (res.error) {
            this.$emit('error', res.message || 'Kurs konnte nicht gelöscht werden.')
            this.$emit('course-deleted')
            return
          }
        }

        this.$emit('success', 'Kurs wurde erfolgreich gelöscht')
        this.$emit('course-deleted')
      } catch (err) {
        console.error('Fehler beim Löschen des Kurses:', err)
        this.$emit('error', 'Ein unerwarteter Fehler ist aufgetreten')
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
