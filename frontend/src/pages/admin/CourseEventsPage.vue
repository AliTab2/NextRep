<template>
  <div class="courses__container">
    <BaseLoader v-if="isLoading" />
    <div v-else>
      <div class="courses__title-container">
        <h1 class="courses__title">{{ listLabel }}</h1>
        <base-button v-if="hasPermission('add:course')" @click="goToAddCoursePage"
          >Neuer Kurs</base-button
        >
      </div>

      <ul class="courses__list">
        <CourseListItem v-for="course in courses" :key="course._id" :course="course" />
      </ul>
    </div>
  </div>
</template>

<script>
import { usePermission } from '@/composables/usePermission.js'
import useCourseStore from '@/stores/courseStore'
import { mapActions } from 'pinia'
import CourseListItem from '@/components/Course/CourseListItem.vue'

export default {
  components: {
    CourseListItem,
  },
  setup() {
    const { hasPermission } = usePermission()

    return {
      hasPermission,
    }
  },
  data() {
    return {
      courses: [],
      isLoading: true,
    }
  },
  async created() {
    if (this.hasPermission('view:registered-courses')) {
      const events = await this.getCourses_store()
      this.courses = events.data
      this.isLoading = false
    } else {
      const events = await this.getUserCourses_store()
      this.courses = events.data
      this.isLoading = false
    }
  },
  methods: {
    ...mapActions(useCourseStore, ['getUserCourses_store', 'getCourses_store']),
    goToAddCoursePage() {
      this.$router.push({ name: 'AdminCourseAdd' })
    },
  },
  computed: {
    listLabel() {
      if (this.courses.length === 0) return 'Keine Kurstermine gefunden!'
      if (this.hasPermission('view:registered-courses'))
        return `Kurstermine (${this.courses.length})`
      else return `Meine Kurstermine (${this.courses.length})`
    },
  },
}
</script>

<style scoped>
.courses__container {
  padding: 2rem;
}

.courses__list {
  list-style: none;
  width: 100%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

@media (min-width: 768px) {
  .courses__container {
    padding: 4rem;
  }
}

.courses__title-container {
  width: 100%;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.courses__title {
  font-size: 1.6rem;
  color: var(--color-text);
}

@media (min-width: 576px) {
  .courses__title {
    font-size: 1.8rem;
  }
}
@media (min-width: 768px) {
  .courses__title {
    font-size: 2rem;
  }
}
</style>
