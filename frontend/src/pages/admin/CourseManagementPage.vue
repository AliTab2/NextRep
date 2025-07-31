<template>
  <div>
    <BaseMessage v-if="courseMessage.msg" :status="courseMessage.status" :key="Date.now()">
      {{ courseMessage.msg }}
    </BaseMessage>

    <transition name="fade-slide" mode="out-in">
      <component
        :is="currentComponent"
        :key="viewMode"
        :original-course="course"
        :exception-today="exceptionToday"
        @edit="viewMode = 'edit'"
        @success="handleSuccess"
      />
    </transition>
  </div>
</template>

<script>
import FormAdd from '@/components/course/form/FormAdd.vue'
import FormEdit from '@/components/course/form/FormEdit.vue'
import CourseInfoView from '@/components/course/CourseInfoView.vue'
import { usePermission } from '@/composables/usePermission.js'
import { useSmartNavigation } from '@/composables/useSmartNavigation.js'
import useCourseStore from '@/stores/courseStore'
import { mapActions, mapState } from 'pinia'
import useMessageStore from '@/stores/messageStore'

export default {
  components: {
    FormAdd,
    FormEdit,
    CourseInfoView,
  },
  data() {
    return {
      viewMode: 'info', // 'info' | 'edit' | 'add'
      statusMessage: '',
      statusType: '',
      course: null,
      exceptionToday: null,
    }
  },
  setup() {
    const { hasPermission } = usePermission()
    const { navigate } = useSmartNavigation()
    return { hasPermission, navigate }
  },
  created() {
    const courseId = this.$route.params.courseId
    if (!courseId) {
      this.viewMode = 'add'
      return
    }

    this.course = this.courses.find((c) => c._id.toString() === courseId.toString())

    const exceptionDate = this.$route.query.exceptionDate
    if (exceptionDate) {
      this.exceptionToday = this.course?.dateInfo?.exceptions?.find((c) => {
        return (
          `${new Date(c.dateInfo.creationWeekRange.start).toDateString()}-${c.dateInfo.dayIndex}` ===
          exceptionDate
        )
      })
    }
  },
  mounted() {
    this.clearMessage('course')
  },

  computed: {
    ...mapState(useCourseStore, ['courses']),
    ...mapState(useMessageStore, { courseMessage: 'course' }),
    currentComponent() {
      return {
        info: CourseInfoView,
        edit: FormEdit,
        add: FormAdd,
      }[this.viewMode]
    },
  },
  methods: {
    ...mapActions(useMessageStore, ['clearMessage']),
    handleSuccess() {
      this.navigate({
        mode: 'push',
        to: { name: 'Calendar' },
      })
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
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.4s ease;
}
.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
}
</style>
