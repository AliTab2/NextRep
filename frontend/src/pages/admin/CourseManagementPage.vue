<template>
  <div>
    <BaseMessage v-if="statusMessage" :status="statusType" :key="Date.now()">
      {{ statusMessage }}
    </BaseMessage>
    <BaseSplitView
      :is-editing="isEditing"
      left-width="100%"
      right-width="60%"
      ref="splitRef"
      v-if="hasPermission('edit:course')"
    >
      <template #right>
        <CalendarEventCard
          :sport="course.sport"
          :trainer="course.trainer.name"
          :hour="course.time.hour"
          :minutes="course.time.minutes"
          :duration="course.time.duration"
          :status="course.status"
          :weekDayName="course.date.weekDayName"
          :recurring="course.date.recurring"
          mode="preview"
          @switch-to-form="handleCardSwitch"
          @delete-course="handleDeleteCourse"
          :is-loading="isLoading"
        />
      </template>

      <template #left>
        <CourseFormEdit
          v-if="isEditing"
          :courseObj="course"
          @update-course="updateCourse"
          @invalid-input="handleInvalid"
          @error="handleError"
          @success="handleSuccess"
          :should-delete-course="shouldDeleteCourse"
          :delete-options="deleteOptions"
          @course-deleted="handleCourseDeleted"
        />
        <CourseFormAdd
          v-else
          :courseObj="course"
          @update-course="updateCourse"
          @invalid-input="handleInvalid"
          @error="handleError"
          @success="handleSuccess"
        />
      </template>
    </BaseSplitView>
    <div class="course-preview" v-else>
      <CalendarEventCard
        :sport="course.sport"
        :trainer="course.trainer.name"
        :hour="course.time.hour"
        :minutes="course.time.minutes"
        :duration="course.time.duration"
        :status="course.status"
        :weekDayName="course.date.weekDayName"
        :recurring="course.date.recurring"
        :weekRange="course.date.weekRange"
        :weekDay="course.date.weekDay"
        mode="preview"
        @switch-to-form="handleCardSwitch"
        @delete-course="handleDeleteCourse"
        :is-loading="isLoading"
      />
    </div>
  </div>
</template>

<script>
import CalendarEventCard from '@/components/Calendar/CalendarEventCard.vue'
import CourseFormAdd from '@/components/Course/CourseFormAdd.vue'
import CourseFormEdit from '@/components/Course/CourseFormEdit.vue'

import { mapState, mapActions } from 'pinia'
import useCourseStore from '@/stores/courseStore.js'
import { courseFormat } from '@/utils/base.js'
import { usePermission } from '@/composables/usePermission.js'
import { useSmartNavigation } from '@/composables/useSmartNavigation.js'

export default {
  components: {
    CalendarEventCard,
    CourseFormAdd,
    CourseFormEdit,
  },
  setup() {
    const { hasPermission } = usePermission()
    const { navigate } = useSmartNavigation()
    return { hasPermission, navigate }
  },
  data() {
    return {
      screenIsLarge: window.innerWidth >= 1000,
      course: null,
      isEditing: false,
      isInvalid: false,
      isValid: false,
      cardVisible: true,
      formVisible: false,
      statusMessage: '',
      statusType: '',
      isLoading: false,
      shouldDeleteCourse: false,
      deleteOptions: {},
    }
  },
  created() {
    window.addEventListener('resize', this.checkScreenSize)
    const courseId = this.$route.params.id
    if (courseId) {
      this.isEditing = true
      const foundCourse = this.courses.find((c) => c._id === courseId)
      if (foundCourse) {
        this.course = JSON.parse(JSON.stringify(foundCourse))
      } else {
        this.navigate({ mode: 'push', to: { name: 'Calendar' } })
      }
    } else {
      // Kein Bearbeiten, leeres Objekt
      this.course = structuredClone(courseFormat)
    }
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.checkScreenSize)
  },
  mounted() {
    this.course.date.weekRange.start = this.weekRange.start
    this.course.date.weekRange.end = this.weekRange.end
  },
  methods: {
    checkScreenSize() {
      this.screenIsLarge = window.innerWidth >= 1000
      if (this.screenIsLarge) this.cardVisible = true
    },
    handleDeleteCourse(options) {
      this.shouldDeleteCourse = !this.shouldDeleteCourse
      this.deleteOptions = { ...options }
      this.isLoading = true
    },
    handleCourseDeleted() {
      this.isLoading = false
    },
    updateCourse(updatedCourse) {
      this.course = { ...updatedCourse }
    },
    handleCardSwitch() {
      this.$refs.splitRef?.handleSwitch?.()
    },
    handleInvalid() {
      this.isInvalid = true
    },
    clearMessage() {
      this.statusMessage = ''
      this.statusType = ''
    },
    handleError(msg) {
      this.clearMessage()
      this.statusMessage = msg
      this.statusType = 'error'
    },
    handleSuccess(msg) {
      this.navigate({
        mode: 'push',
        to: { name: 'Calendar', query: { status: 'success', message: msg } },
      })
    },
    ...mapActions(useCourseStore, ['addCourse']),
  },
  computed: {
    ...mapState(useCourseStore, ['weekRange', 'courses']),
    showForm() {
      if (this.screenIsLarge) return true
      if (!this.isEditing) return true
      return this.formVisible
    },
    showCard() {
      if (this.screenIsLarge) return this.cardVisible
      return this.isEditing && !this.formVisible
    },
    showCardButtons() {
      return !this.showForm && this.showCard
    },
    showCancelButton() {
      return !this.screenIsLarge && this.isEditing
    },
  },
  watch: {
    weekRange: {
      handler(val) {
        this.course.date.weekRange.start = val.start
        this.course.date.weekRange.end = val.end
      },
      deep: true,
    },
  },
}
</script>

<style scoped>
.course-preview {
  width: 90%;
  margin: 2rem auto;
}
@media (min-width: 576px) {
  .course-preview {
    width: 70%;
  }
}
@media (min-width: 768px) {
  .course-preview {
    width: 60%;
  }
}
@media (min-width: 1024px) {
  .course-preview {
    width: 40%;
  }
}
</style>
