<template>
  <li class="users__list-item" @click="goToAddUserPage()">
    <div class="users__list-texts">
      <p class="users__list-name">{{ user.name }}</p>
      <p class="users__list-meta">{{ formattedMeta }}</p>
    </div>
    <p :class="['users__list-status', userStatusClass]">{{ userStatusText }}</p>
  </li>
</template>

<script>
export default {
  props: ['user'],
  methods: {
    goToAddUserPage() {
      this.$router.push({ name: 'EditUser', params: { id: this.user._id } })
    },
  },
  computed: {
    userStatusText() {
      return this.user.isBlocked ? 'Blockiert' : 'Frei geschaltet'
    },
    userStatusClass() {
      return this.user.isBlocked ? 'users__list-status--blocked' : 'users__list-status--active'
    },
    formattedMeta() {
      const format = (dateStr) =>
        new Date(dateStr).toLocaleDateString('de-DE', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        })

      const created = format(this.user.createdAt)
      const updated = format(this.user.updatedAt)

      if (created.toLowerCase().includes('invalid')) {
        return `aktualisiert: ${updated}`
      }
      return `erstellt: ${created} - aktualisiert: ${updated}`
    },
  },
}
</script>

<style>
.users__list-item {
  border-bottom: 1px solid #ddd;
  padding: 1rem 2rem;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  font-size: 1.2rem;
}

.users__list-item:hover {
  background-color: var(--color-secondary);
  cursor: pointer;
}

.users__list-texts {
  display: flex;
  flex-direction: column;
}

.users__list-name {
  font-weight: bold;
  font-size: 1.4rem;
  margin-bottom: 0.3rem;
}

.users__list-meta {
  font-size: 1.2rem;
  color: #666;
}

.users__list-status {
  font-size: 1.3rem;
  font-weight: 500;
}

.users__list-status--active {
  color: var(--color-primary);
}
.users__list-status--blocked {
  color: red;
}

@media (min-width: 576px) {
  .users__list-name {
    font-size: 1.6rem;
  }
  .users__list-meta,
  .users__list-status {
    font-size: 1.4rem;
  }
}
</style>
