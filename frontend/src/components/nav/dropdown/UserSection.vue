<template>
  <div class="user-menu" @click="showDropdown = !showDropdown">
    <font-awesome-icon class="user-icon" icon="fa-solid fa-circle-user" />
    <DropdownUser
      @open-export-modal="$emit('open-export-modal')"
      @open-view-modal="$emit('open-view-modal')"
      v-if="showDropdown"
    />
  </div>
</template>

<script>
import DropdownUser from '@/components/nav/dropdown/DropdownUser.vue'
export default {
  components: {
    DropdownUser,
  },
  data() {
    return {
      showDropdown: false,
    }
  },
  mounted() {
    document.addEventListener('click', this.handleClickOutside)
  },
  beforeUnmount() {
    document.removeEventListener('click', this.handleClickOutside)
  },
  methods: {
    handleClickOutside(event) {
      if (this.$el && !this.$el.contains(event.target)) {
        this.showDropdown = false
      }
    },
  },
}
</script>

<style scoped>
.user-menu {
  position: relative;
  cursor: pointer;
}
.user-icon {
  font-size: 2.5rem;
}
</style>
