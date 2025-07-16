<template>
  <transition name="fade-message">
    <div v-if="visible" :class="['msg', statusClass]">
      <p class="msg__text"><slot>Dies ist eine Nachricht</slot></p>
    </div>
  </transition>
</template>

<script>
import { nextTick } from 'vue'

export default {
  props: {
    status: { type: String, default: 'default' },
    autoClose: { type: Boolean, default: true },
    duration: { type: Number, default: 3000 },
  },
  data() {
    return {
      visible: false,
    }
  },
  computed: {
    statusClass() {
      return (
        {
          error: 'msg--error',
          success: 'msg--success',
          warning: 'msg--warning',
        }[this.status] || 'msg--default'
      )
    },
  },
  mounted() {
    // Zeige die Nachricht, nachdem sie gemountet wurde
    nextTick(() => {
      this.visible = true
    })

    // Wenn autoClose aktiv ist, verstecke sie nach X ms
    if (this.autoClose) {
      setTimeout(() => {
        this.visible = false
      }, this.duration)
    }
  },
}
</script>

<style scoped>
/* === Base Container === */
.msg {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 1.6rem;
  border-radius: 0.5rem;
  width: 100%;
  min-height: 4rem;
  box-sizing: border-box;
  text-align: center;
  /* margin: 0 auto; */
}

.msg__text {
  font-size: 1.4rem;
  font-weight: 500;
  color: inherit;
  margin: 0;
}

.msg--default {
  background-color: #f5f5f5;
  border-left: 4px solid #999;
  border-right: 4px solid #999;
  color: #333;
}

.msg--error {
  background-color: #ffebee;
  border-left: 4px solid #d32f2f;
  border-right: 4px solid #d32f2f;
  color: #d32f2f;
}

.msg--success {
  background-color: #e8f5e9;
  border-left: 4px solid green;
  border-right: 4px solid green;
  color: green;
}

.msg--warning {
  background-color: #fff8e1;
  border: 1px solid #ff9800;
  color: #856404;
}

/* === Responsive === */
@media (min-width: 576px) {
  /* .msg {
    width: 50%;
  } */
}

@media (min-width: 768px) {
  .msg__text {
    font-size: 1.6rem;
  }
  /* .msg {
    width: 40%;
  } */
}

@media (min-width: 1024px) {
  .msg__text {
    font-size: 1.8rem;
  }
  /* .msg {
    width: 30%;
  } */
}

.fade-message-enter-active,
.fade-message-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}
.fade-message-enter-from,
.fade-message-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
.fade-message-enter-to,
.fade-message-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
