<template>
  <div v-if="showUserHistory">
    <HistoryList :user-id="userId" :user-name="userName" />
  </div>
  <div v-else>
    <BaseMessage v-if="statusMessage" :status="statusType">
      {{ statusMessage }}
    </BaseMessage>
    <UsersList :users="users" />
    <CoursesList :courses="courses" />
    <HistoryList />
  </div>
</template>

<script>
import UsersList from '@/components/User/UsersList.vue'
import CoursesList from '@/components/Course/CoursesList.vue'
import HistoryList from '@/components/History/HistoryList.vue'
import useUserStore from '@/stores/userStore.js'
import useCourseStore from '@/stores/courseStore.js'
import { mapState, mapActions } from 'pinia'
import { usePermission } from '@/composables/usePermission.js'

export default {
  components: {
    UsersList,
    CoursesList,
    HistoryList,
  },
  data() {
    return {
      statusMessage: '',
      statusType: '',
      userId: '',
      userName: '',
    }
  },
  computed: {
    ...mapState(useUserStore, ['users']),
    ...mapState(useCourseStore, ['courses']),
    showUserHistory() {
      const { hasPermission } = usePermission()
      if (this.userId && this.userName && hasPermission('view:admin-history')) return true
      return false
    },
  },
  methods: {
    ...mapActions(useUserStore, ['getUsers_store']),
    ...mapActions(useCourseStore, ['getCourses_store']),
  },
  mounted() {
    const { status, message, userId, userName } = this.$route.query
    if (status && message) {
      this.statusMessage = message
      this.statusType = status
    }

    if (userId && userName) {
      this.userId = userId
      this.userName = userName
    }
  },
  async created() {
    this.statusMessage = ''
    this.statusType = ''
    this.getUsers_store()
    this.getCourses_store()
  },

  watch: {
    '$route.query': {
      handler(newQuery) {
        // Wenn keine userId mehr vorhanden ist → Zustand zurücksetzen
        if (!newQuery.userId) {
          this.userId = null
          this.userName = ''
          this.statusMessage = ''
          this.statusType = ''
        }
      },
      immediate: true, // optional: sofort beim Laden prüfen
      deep: false, // flach reicht für $route.query
    },
  },
}
</script>
