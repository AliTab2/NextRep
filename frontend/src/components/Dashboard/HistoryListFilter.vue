<template>
  <div class="history-filter">
    <base-input placeholder="Einfach tippen!" label="Filter" v-model="searchTerm"></base-input>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchTerm: '',
    }
  },
  methods: {
    filterEntries() {
      this.$emit('filter-entries', this.searchTerm)
    },
  },
  watch: {
    searchTerm() {
      this.filterEntries()
    },
  },
}
</script>

<style scoped>
.history-filter {
  display: flex;
  gap: 1rem;
  align-items: center;
}
</style>
