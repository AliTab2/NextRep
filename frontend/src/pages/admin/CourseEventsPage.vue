<template>
  <PageContainer :is-loading="isLoading">
    <template #header>
      <CoursePageHeader />
    </template>
    <template #main>
      <DataSection :not-found="notFound" not-found-item="Kurstermine">
        <template #list-item>
          <CourseListItem v-for="course in courses" :key="course._id" :course="course" />
        </template>
      </DataSection>
    </template>
  </PageContainer>
</template>

<script>
import { usePermission } from '@/composables/usePermission.js'
import useCourseStore from '@/stores/courseStore'
import { mapActions, mapState } from 'pinia'
import PageContainer from '@/components/dashboard/ui/PageContainer.vue'
import CoursePageHeader from '@/components/dashboard/course/CoursePageHeader.vue'
import DataSection from '@/components/dashboard/ui/DataSection.vue'
import CourseListItem from '@/components/dashboard/course/CourseListItem.vue'

export default {
  components: {
    PageContainer,
    CoursePageHeader,
    DataSection,
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
      isLoading: true,
      error: false,
    }
  },
  async created() {
    if (this.hasPermission('view:registered-courses')) {
      this.error = (await this.getAllCourses()).error
    } else {
      this.error = (await this.getUserCourses()).error
    }
    this.isLoading = false
  },
  computed: {
    ...mapState(useCourseStore, ['courses']),
    notFound() {
      return Boolean(this.courses.length) === false || this.error
    },
  },
  methods: {
    ...mapActions(useCourseStore, ['getUserCourses', 'getAllCourses']),
  },
}
</script>
