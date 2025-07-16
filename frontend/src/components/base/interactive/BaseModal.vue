<template>
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
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: #fff;
  border-radius: 0.8rem;
  padding: 2.4rem;
  width: 90%;
  max-width: 50rem;
  box-shadow: 0 1rem 2.5rem rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
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
  gap: 12px;
  margin-top: 2.4rem;
}
</style>
