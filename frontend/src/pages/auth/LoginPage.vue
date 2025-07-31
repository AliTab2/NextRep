<template>
  <div class="auth-container">
    <BaseMessage v-if="messageStore.user.msg" :status="messageStore.user.status" :key="Date.now()">
      {{ messageStore.user.msg }}
    </BaseMessage>
    <BaseLoader v-if="isLoading" />
    <div class="wrapper">
      <transition name="fade" mode="out-in">
        <template v-if="isBlocked">
          <h1 class="blocked">
            Du wurdest von dem Projektleiter
            <strong style="color: red">blockiert</strong>. Was hast du schon wieder gemacht?
          </h1>
        </template>
        <template v-else>
          <base-form title="Login" style="width: 90%">
            <BaseInput
              v-model="code"
              label="Zugangscode"
              placeholder="Bitte den 6-stelligen Code eingeben"
              :disabled="isLoading"
            />
          </base-form>
        </template>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import useUserStore from '@/stores/userStore.js'
import BaseInput from '@/components/base/form/BaseInput.vue'
import useMessageStore from '@/stores/messageStore'
const messageStore = useMessageStore()

onMounted(() => {
  messageStore.clearMessage('user')
})
onBeforeUnmount(() => {
  messageStore.clearMessage('user')
})

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

const code = ref('')
const statusMessage = ref('')
const statusType = ref('')

const isBlocked = ref(false)
const isAuthorized = ref(true)
const isLoading = ref(false)

watch(
  () => route.query.reason,
  (reason) => {
    isBlocked.value = reason === 'blocked'
    isAuthorized.value = reason !== 'unauthorized'
    statusMessage.value = ''
    statusType.value = ''
  },
  { immediate: true },
)

watch(code, async (value) => {
  if (value.length !== 6) return

  isLoading.value = true
  const res = await userStore.login(value)
  isLoading.value = false

  if (res.error) return

  setTimeout(() => {
    router.push({ name: 'AdminDashboard' })
  }, 1000)
})
</script>

<style scoped>
.auth-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
}
.wrapper {
  padding-top: 4rem;
  height: 100%;
}

h1.blocked,
h1.access {
  font-size: 4rem;
}
@media (min-width: 576px) {
  h1 {
    font-size: 1.8rem;
  }
}
@media (min-width: 768px) {
  h1 {
    font-size: 2rem;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
