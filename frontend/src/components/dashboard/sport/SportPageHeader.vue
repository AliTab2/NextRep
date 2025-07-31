<template>
  <PageHeader heading="Sportarten">
    <template #actions>
      <base-button :disabled="buttonDisabled" variant="delete" @click="$emit('add-sport')">
        <font-awesome-icon class="btn-icon" icon="fa-solid fa-plus"></font-awesome-icon>
        Sportart
      </base-button>
    </template>
  </PageHeader>
</template>

<script>
import PageHeader from '@/components/dashboard/ui/PageHeader.vue'
export default {
  components: {
    PageHeader,
  },
  props: {
    buttonDisabled: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
}
</script>

<style>
.btn-icon {
  margin-right: 1rem;
}
</style>
