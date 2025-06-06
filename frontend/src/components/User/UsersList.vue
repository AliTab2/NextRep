<template>
  <div class="users__container">
    <div class="users__title-container">
      <h1 class="users__title">{{ listTitle }}</h1>
      <base-button v-if="hasPermission('create:admin')" @click="goToAddUserPage"
        >Neues Konto</base-button
      >
    </div>

    <ul class="users__list">
      <UsersListItem v-for="user in filteredUsers" :key="user._id" :user="user" />
    </ul>
  </div>
</template>

<script>
import UsersListItem from '@/components/User/UsersListItem.vue'
import { usePermission } from '@/composables/usePermission.js'
import useUserStore from '@/stores/userStore'

export default {
  components: {
    UsersListItem,
  },
  props: {
    users: {
      type: Array,
      default: () => [],
    },
  },
  setup() {
    const { hasPermission } = usePermission()
    const currentUser = useUserStore().user

    return {
      hasPermission,
      currentUser,
    }
  },
  computed: {
    filteredUsers() {
      // Projektleiter → alle
      if (this.hasPermission('view:registered-admins')) {
        return this.users
      }
      // Admin → nur sich selbst
      return this.users.filter((u) => u._id.toString() === this.currentUser.id.toString())
    },
    listTitle() {
      const count = this.filteredUsers.length
      if (count === 0) return 'Keine Kontos gefunden!'
      if (count === 1) return 'Mein Konto'
      return `Kontos (${count})`
    },
  },
  methods: {
    goToAddUserPage() {
      this.$router.push({ name: 'AddUser' })
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
  /* border-radius: 1rem; */
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
