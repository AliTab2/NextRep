<template>
  <div class="auth-container">
    <BaseMessage v-if="statusMessage" :status="statusType" :key="Date.now()">
      {{ statusMessage }}
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
          <div class="wrapper">
            <h1>Bitte Zugangscode eingeben:</h1>
            <div class="code-inputs">
              <BaseInput
                v-for="(char, index) in codeLength"
                :key="index"
                variant="auth"
                length="1"
                v-model="code[index]"
                @input="onInput(index, $event)"
                @keydown.backspace="onBackspace(index, $event)"
                ref="inputs"
              />
            </div>
          </div>
        </template>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import useUserStore from '@/stores/userStore.js'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

const codeLength = 8
const code = reactive(Array(codeLength).fill(''))
const inputs = ref([])
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

function onInput(index, event) {
  const value = event.target.value
  if (value && index < codeLength - 1) {
    inputs.value[index + 1]?.focus()
  }
}

function onBackspace(index) {
  statusMessage.value = ''
  statusType.value = ''
  if (!code[index] && index > 0) {
    inputs.value[index - 1]?.focus()
  }
}

watch(code, async () => {
  const fullCode = code.join('')

  if (fullCode.length !== 8) return

  isLoading.value = true
  const res = await userStore.login_store(fullCode)
  isLoading.value = false

  if (res?.error) {
    statusMessage.value = res?.message || 'Login fehlgeschlagen'
    statusType.value = 'error'
  } else {
    statusMessage.value = 'Login erfolgreich!'
    statusType.value = 'success'
    setTimeout(() => {
      router.push({ name: 'Admin' })
    }, 1000)
  }
})
</script>

<style scoped>
.auth-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
}
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 2rem;
}

.code-inputs {
  display: flex;
  gap: 1rem;
}

h1 {
  font-size: 1.6rem;
  text-align: center;
  width: 70%;
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
