<template>
  <SharedListItem
    @click="$emit('update-sport', sport)"
    :status="{ color: `${sport.color}` }"
    :label="sport.sport"
    :meta="sport.color"
    :style="{ color: sport.color }"
    :show-checkbox="true"
    :checkbox-value="sport._id"
    :checkbox-model="selectedItem"
    @update:checkbox-model="deleteItem"
  />
</template>

<script>
import SharedListItem from '@/components/shared/SharedListItem.vue'
export default {
  components: {
    SharedListItem,
  },
  props: {
    sport: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      selectedItem: [],
    }
  },
  methods: {
    deleteItem() {
      this.$emit('delete-sport', this.sport)
    },
  },
}
</script>
