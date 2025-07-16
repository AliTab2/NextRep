<template>
  <div>
    <BaseMessage v-if="statusMessage" :status="statusType" :key="Date.now()">
      {{ statusMessage }}
    </BaseMessage>
    <PageSplitView
      v-if="hasPermission('edit:admin')"
      :is-editing="isEditing"
      left-width="70%"
      right-width="100%"
      ref="splitRef"
    >
      <template #right="{ screenIsLarge }">
        <UserDetailsCard
          :user="userAccount"
          :is-editing="isEditing"
          :screen-is-large="screenIsLarge"
          @switch-to-form="handleCardSwitch"
          @success="handleSuccess"
          @error="handleError"
        />
      </template>

      <template #left>
        <UserForm
          :isEditing="isEditing"
          @update-user="updateUser"
          :editable-user="userAccount"
          :show-cancel-button="true"
          @success="handleSuccess"
          @error="handleError"
        />
      </template>
    </PageSplitView>
    <div v-else>
      <UserDetailsCard :user="userAccount" :is-editing="isEditing" />
    </div>
  </div>
</template>

<script>
import UserDetailsCard from '@/components/user/UserDetailsCard.vue'
import UserForm from '@/components/user/UserForm.vue'
import { usePermission } from '@/composables/usePermission.js'
import { useSmartNavigation } from '@/composables/useSmartNavigation.js'
import { mapState, mapActions } from 'pinia'
import useUserStore from '@/stores/userStore.js'
import { userFormat } from '@/utils/base.js'
import PageSplitView from '@/components/shared/PageSplitView.vue'

export default {
  components: {
    UserDetailsCard,
    UserForm,
    PageSplitView,
  },
  setup() {
    const { hasPermission } = usePermission()
    const { navigate } = useSmartNavigation()
    return { hasPermission, navigate }
  },
  data() {
    return {
      userAccount: {},
      isEditing: false,
      cardVisible: true,
      formVisible: false,
      statusMessage: '',
      statusType: '',
    }
  },
  async created() {
    const userId = this.$route.params.userId
    if (userId) {
      this.isEditing = true

      if (this.hasPermission('view:registered-admins')) {
        const foundUser = this.users.find((u) => u._id.toString() === userId.toString())
        this.userAccount = { ...foundUser }
      } else {
        this.userAccount = { ...this.user }
      }
    } else {
      this.userAccount = { ...userFormat }
    }
  },
  methods: {
    ...mapActions(useUserStore, ['getOneUser_store']),
    updateUser(user) {
      this.userAccount = { ...user }
    },
    handleCardSwitch() {
      this.$refs.splitRef?.handleSwitch?.()
    },
    clearMessage() {
      this.statusMessage = ''
      this.statusType = ''
    },
    handleSuccess(message) {
      this.clearMessage()
      this.navigate({
        mode: 'push',
        to: { name: 'AdminAccounts', query: { status: 'success', message } },
      })
    },
    handleError(message) {
      this.clearMessage()
      this.statusMessage = message
      this.statusType = 'error'
    },
  },
  computed: {
    ...mapState(useUserStore, ['users', 'user']),
  },
}
</script>
