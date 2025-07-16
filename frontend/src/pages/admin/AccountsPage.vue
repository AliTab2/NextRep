<template>
  <PageContainer :is-loading="isLoading">
    <template #header>
      <AccountPageHeader />
    </template>
    <template #main>
      <DataSection :not-found="notFound" not-found-item="Konten">
        <template #list-item>
          <AccountListItem v-for="user in users" :key="user._id" :user="user" />
        </template>
      </DataSection>
    </template>
  </PageContainer>
</template>

<script>
import { usePermission } from '@/composables/usePermission.js'
import useUserStore from '@/stores/userStore'
import { mapActions, mapState } from 'pinia'
import PageContainer from '@/components/dashboard/ui/PageContainer.vue'
import AccountPageHeader from '@/components/dashboard/account/AccountPageHeader.vue'
import DataSection from '@/components/dashboard/ui/DataSection.vue'
import AccountListItem from '@/components/dashboard/account/AccountListItem.vue'

export default {
  components: {
    PageContainer,
    AccountPageHeader,
    DataSection,
    AccountListItem,
  },
  setup() {
    const { hasPermission } = usePermission()
    return { hasPermission }
  },
  data() {
    return {
      isLoading: true,
      error: false,
    }
  },
  async created() {
    if (this.hasPermission('view:registered-admins')) {
      this.error = (await this.getAllUsers()).error
    } else {
      this.error = (await this.getOneUser()).error
    }

    this.isLoading = false
  },
  methods: {
    ...mapActions(useUserStore, ['getOneUser', 'getAllUsers']),
    goToAddUserPage() {
      this.navigate({ mode: 'push', to: { name: 'AdminUserAdd' } })
    },
  },
  computed: {
    ...mapState(useUserStore, ['users']),
    notFound() {
      return Boolean(this.users.length) === false || this.error
    },
  },
}
</script>

<style scoped>
.users__container {
  padding: 2rem;
}

.users__list {
  list-style: none;
  width: 100%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

@media (min-width: 768px) {
  .users__container {
    padding: 4rem;
  }
}

.users__title-container {
  width: 100%;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.users__title {
  font-size: 1.6rem;
  color: var(--color-text);
}

@media (min-width: 576px) {
  .users__title {
    font-size: 1.8rem;
  }
}
@media (min-width: 768px) {
  .users__title {
    font-size: 2rem;
  }
}
</style>
