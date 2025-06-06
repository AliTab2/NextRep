<template>
  <li class="history__list-item">
    <div class="history__list-texts">
      <p class="history__list-user">{{ entry.userName }}</p>
      <p class="history__list-meta">{{ formattedDateTime }}</p>
    </div>
    <p class="history__list-action">{{ entry.message }}</p>
  </li>
</template>

<script>
export default {
  props: ['entry'],
  computed: {
    formattedDateTime() {
      const date = new Date(this.entry.createdAt)
      const dateStr = date.toLocaleDateString('de-DE', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })
      const timeStr = date.toLocaleTimeString('de-DE', {
        hour: '2-digit',
        minute: '2-digit',
      })
      return `${dateStr} – ${timeStr}`
    },
  },
}
</script>

<style>
.history__list-item {
  border-bottom: 1px solid #ddd;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: row;
  font-size: 1.2rem;
}

.history__list-item:hover {
  background-color: var(--color-secondary-light);
  cursor: pointer;
}

.history__list-texts {
  display: flex;
  flex-direction: column;
  max-width: 60%;
}

.history__list-user {
  font-weight: bold;
  font-size: 1.4rem;
  margin-bottom: 0.3rem;
}

.history__list-meta {
  font-size: 1.2rem;
  color: #666;
}

.history__list-action {
  font-size: 1.3rem;
  color: var(--color-primary);
  font-weight: 500;
  text-align: right;
  max-width: 40%;
  word-break: break-word;
}

@media (min-width: 576px) {
  .history__list-user {
    font-size: 1.6rem;
  }

  .history__list-meta,
  .history__list-action {
    font-size: 1.4rem;
  }
}
</style>
