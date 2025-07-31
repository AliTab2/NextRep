<template>
  <transition name="modal-slide" appear>
    <div v-if="visible" class="modal-backdrop">
      <div class="modal-content">
        <slot name="title">
          <h2 class="modal-title">Bestätigung</h2>
        </slot>

        <div class="modal-body">
          <slot />
        </div>

        <div class="modal-actions">
          <base-button variant="light" @click="emitClose">Abbrechen</base-button>
          <base-button variant="delete" @click="emitConfirm">Bestätigen</base-button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
defineProps({
  visible: Boolean,
})

const emit = defineEmits(['close', 'confirm'])

function emitClose() {
  emit('close')
}

function emitConfirm() {
  emit('confirm')
}
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  z-index: 1000;
  overflow-y: auto;
  max-height: 100vh;
  overflow-y: auto;
  padding-top: 2rem;
  padding-bottom: 2rem;
}

.modal-content {
  background-color: #fff;
  border-radius: 0.8rem;
  padding: 2.4rem;
  width: 90%;
  max-width: 50rem;
  box-shadow: 0 1rem 2.5rem rgba(0, 0, 0, 0.1);
}

.modal-title {
  font-size: 2rem;
  font-weight: bold;
  margin: 0;
}

.modal-body {
  margin-top: 1.6rem;
  font-size: 1.6rem;
  line-height: 1.5;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1.2rem;
  margin-top: 2.4rem;
}

.modal-slide-enter-active,
.modal-slide-leave-active {
  transition: all 0.3s ease;
}

.modal-slide-enter-from {
  opacity: 0;
  transform: translateY(-50px);
}

.modal-slide-leave-to {
  opacity: 0;
  transform: translateY(-50px);
}
</style>
