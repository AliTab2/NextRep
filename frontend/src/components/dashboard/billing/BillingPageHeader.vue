<template>
  <PageHeader heading="Abrechnungen">
    <template #actions>
      <base-button @click="$emit('generate-billing')">
        <font-awesome-icon icon="fa-solid fa-file-csv" class="btn-icon" />
        Erstellen
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
}
</script>

<style scoped>
.btn-icon {
  margin-right: 1rem;
}
</style>
