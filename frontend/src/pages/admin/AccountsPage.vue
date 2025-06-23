<template>
  <div class="users__container">
    <div class="users__title-container">
      <h1 class="users__title">{{ listLabel }}</h1>
      <base-button v-if="hasPermission('create:admin')" @click="goToAddUserPage"
        >Neues Konto</base-button
      >
    </div>

    <ul class="users__list">
      <BaseListItem
        v-for="user in accounts"
        :key="user._id"
        :label="user.name"
        :status="{
          icon: user.isBlocked ? 'fa-solid fa-user-lock' : 'fa-solid fa-user-check',
          color: user.isBlocked ? '#db1200' : 'lightgreen',
        }"
        :meta="user.roles.join(', ')"
        @click="navigate({ mode: 'push', to: { name: 'AdminUserEdit', params: { id: user._id } } })"
      />
    </ul>
  </div>
</template>

<script>
import { usePermission } from '@/composables/usePermission.js'
import { useSmartNavigation } from '@/composables/useSmartNavigation.js'
import useUserStore from '@/stores/userStore'
import { mapActions } from 'pinia'

export default {
  setup() {
    const { hasPermission } = usePermission()
    const { navigate } = useSmartNavigation()

    return {
      hasPermission,
      navigate,
    }
  },
  data() {
    return {
      accounts: [],
    }
  },
  async created() {
    if (this.hasPermission('view:registered-admins')) {
      const allAccounts = await this.getUsers_store()
      this.accounts = allAccounts.data
    } else {
      const userAccount = await this.getOneUser_store()
      this.accounts.push(userAccount.data)
    }
  },
  methods: {
    ...mapActions(useUserStore, ['getOneUser_store', 'getUsers_store']),
    goToAddUserPage() {
      this.$router.push({ name: 'AdminUserAdd' })
    },
  },
  computed: {
    listLabel() {
      if (this.accounts.length === 0) return 'Keine Konten gefunden!'
      if (this.hasPermission('view:registered-admins')) return `Konten (${this.accounts.length})`
      return 'Mein Konto'
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
