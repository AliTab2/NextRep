<template>
  <div class="courses__container">
    <div class="courses__title-container">
      <h1 class="courses__title">{{ listTitle }}</h1>
      <base-button v-if="hasPermission('add:course')" @click="goToAddCoursePage"
        >Neuer Kurs</base-button
      >
    </div>

    <ul class="courses__list">
      <CoursesListItem v-for="course in filteredCourses" :key="course._id" :course="course" />
    </ul>
  </div>
</template>

<script>
import CoursesListItem from '@/components/Course/CoursesListItem.vue'
import { usePermission } from '@/composables/usePermission.js'
import useUserStore from '@/stores/userStore'
import { mapState } from 'pinia'

export default {
  components: {
    CoursesListItem,
  },
  props: {
    courses: {
      type: Array,
      default: () => [],
    },
  },
  setup() {
    const { hasPermission } = usePermission()

    return {
      hasPermission,
    }
  },
  computed: {
    ...mapState(useUserStore, ['user']),
    filteredCourses() {
      if (this.hasPermission('view:registered-courses')) return this.courses
      else {
        return this.courses.filter((c) => c.trainer.toLowerCase() === this.user.name.toLowerCase())
      }
    },
    listTitle() {
      if (this.hasPermission('view:registered-courses') && this.courses.length > 0)
        return `Kurstermine (${this.courses.length})`
      else if (this.courses.length > 0) return `Meine Kurstermine (${this.courses.length})`
      else return 'Keine Kurstermine gefunden!'
    },
  },
  methods: {
    goToAddCoursePage() {
      this.$router.push({ name: 'AddCourse' })
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
  /* border-radius: 1rem; */
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
