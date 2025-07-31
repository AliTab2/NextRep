<template>
  <PageContainer :is-loading="isLoading">
    <template #header>
      <SportPageHeader :button-disabled="isLoading" @add-sport="openAddSportModal" />
      <BaseMessage v-if="sport.msg" :status="sport.status" :key="Date.now()">
        {{ sport.msg }}
      </BaseMessage>
    </template>
    <template #main>
      <DataSection :not-found="notFound" not-found-item="Sportarten">
        <template #list-item>
          <SportListItem
            @update-sport="openUpdateSportModal"
            @delete-sport="openDeleteSportModal"
            v-for="sport in sports"
            :sport="sport"
            :key="sport.sport"
          />
        </template>
      </DataSection>
      <AddSportModal
        :show-modal="showAddSportModal"
        v-model.sport="options"
        @close-sport="closeModal"
        @confirm-sport="confirmSport"
      />
      <DeleteSportModal
        :show-modal="showDeleteSportModal"
        @close-delete="closeDeleteSportModal"
        @confirm-delete="deleteSportItem"
        :sport="options"
      />
    </template>
  </PageContainer>
</template>

<script>
import PageContainer from '@/components/dashboard/ui/PageContainer.vue'
import SportPageHeader from '@/components/dashboard/sport/SportPageHeader.vue'
import DataSection from '@/components/dashboard/ui/DataSection.vue'
import SportListItem from '@/components/dashboard/sport/SportListItem.vue'
import AddSportModal from '@/components/dashboard/sport/AddSportModal.vue'
import DeleteSportModal from '@/components/dashboard/sport/DeleteSportModal.vue'
import useSportStore from '@/stores/sportStore'
import useMessageStore from '@/stores/messageStore'
import { mapActions, mapState } from 'pinia'

export default {
  components: {
    PageContainer,
    SportPageHeader,
    DataSection,
    SportListItem,
    AddSportModal,
    DeleteSportModal,
  },
  data() {
    return {
      showAddSportModal: false,
      showDeleteSportModal: false,
      isLoading: false,
      error: false,
      options: {
        sport: '',
        color: '#000000',
        _id: null,
      },
      shouldUpdate: false,
    }
  },
  beforeMount() {
    this.clearMessage('sport')
  },
  async created() {
    this.clearMessage('sport')
    this.loadSports()
    if (this.error) return
  },
  computed: {
    ...mapState(useMessageStore, ['sport']),
    ...mapState(useSportStore, ['sports']),
    notFound() {
      return Boolean(this.sports.length) === false || this.error
    },
  },
  methods: {
    ...mapActions(useMessageStore, ['clearMessage']),
    ...mapActions(useSportStore, ['getAllSports', 'addSport', 'updateSport', 'deleteSport']),
    async loadSports() {
      this.isLoading = true
      this.error = (await this.getAllSports()).error
      this.isLoading = false
    },
    closeModal() {
      this.showAddSportModal = false
      this.shouldUpdate = false
      this.options._id = null
    },
    openAddSportModal() {
      this.clearMessage('sport')
      this.shouldUpdate = false
      this.showAddSportModal = true
    },
    openUpdateSportModal(sport) {
      this.clearMessage('sport')
      this.options.sport = sport.sport
      this.options.color = sport.color
      this.options._id = sport._id
      this.shouldUpdate = true
      this.showAddSportModal = true
    },
    openDeleteSportModal(sport) {
      this.clearMessage('sport')
      this.showDeleteSportModal = true

      this.options.sport = sport.sport
      this.options.color = sport.color
      this.options._id = sport._id
    },
    closeDeleteSportModal() {
      this.showDeleteSportModal = false
      this.loadSports()
    },
    async confirmSport() {
      this.isLoading = true
      let res
      if (this.shouldUpdate) {
        res = await this.updateSport(this.options.sport, this.options.color, this.options._id)
      } else {
        res = await this.addSport(this.options.sport, this.options.color)
      }
      this.isLoading = false
      this.showAddSportModal = false
      if (res.error) return
      this.loadSports()
    },
    async deleteSportItem() {
      this.isLoading = true
      const res = await this.deleteSport(this.options._id)
      this.isLoading = true
      this.showDeleteSportModal = false
      if (res.error) return
      this.loadSports()
    },
  },
}
</script>
