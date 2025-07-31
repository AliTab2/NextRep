<template>
  <PageContainer :is-loading="isLoading">
    <template #header>
      <CoursePageHeader />
      <BaseMessage v-if="course.msg" :status="course.status" :key="Date.now()">
        {{ course.msg }}
      </BaseMessage>
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
import useMessageStore from '@/stores/messageStore'

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
  mounted() {
    this.clearMessage('course')
  },
  beforeUnmount() {
    this.clearMessage('course')
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
    ...mapState(useMessageStore, ['course']),
    notFound() {
      return Boolean(this.courses.length) === false || this.error
    },
  },
  methods: {
    ...mapActions(useCourseStore, ['getUserCourses', 'getAllCourses']),
    ...mapActions(useMessageStore, ['clearMessage']),
  },
}
</script>
