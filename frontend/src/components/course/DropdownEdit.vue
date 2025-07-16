<template>
  <div class="edit-menu" ref="menuRef" v-if="hasPermission('edit:course')" @click="toggleDropdown">
    <font-awesome-icon class="gear-icon" size="2xl" icon="fa-solid fa-gear" />
    <div class="edit-menu__dropdown" v-if="showDropdown">
      <base-button variant="dropdown-edit" @click="$emit('edit')">Bearbeiten</base-button>
      <base-button variant="dropdown-edit" @click="$emit('delete')">Löschen</base-button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { usePermission } from '@/composables/usePermission'

const { hasPermission } = usePermission()

const menuRef = ref(null)
const showDropdown = ref(false)

function toggleDropdown() {
  showDropdown.value = !showDropdown.value
}

function handleClickOutside(event) {
  if (menuRef.value && !menuRef.value.contains(event.target)) {
    showDropdown.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})
onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.edit-menu {
  position: relative;
  cursor: pointer;
  color: #666;
}
.edit-menu__dropdown {
  position: absolute;
  top: 120%;
  right: 0;
  background-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 0.5rem;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  min-width: 14rem;
  gap: 1rem;
}
.gear-icon {
  transition: all 0.25s;
}
.gear-icon:hover {
  cursor: pointer;
  scale: 1.2;
}
</style>
