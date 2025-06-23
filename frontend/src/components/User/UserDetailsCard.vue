<template>
  <div class="profile-card">
    <h2 class="profile-name">{{ user.name || 'Name' }}</h2>

    <div class="profile-info">
      <div class="info-row">
        <span class="label">Rollen:</span>
        <span class="value">{{ user.roles.join(', ') || 'Keine Rollen' }}</span>
      </div>
      <div class="info-row">
        <span class="label">Kurse:</span>
        <span class="value">{{ user.courses.join(', ') || 'Keine Kurse' }}</span>
      </div>
      <div class="info-row">
        <span class="label">Zugangscode:</span>
        <span class="value">{{ user.password || 'Wird automatisch erzeugt' }}</span>
      </div>
      <div class="info-row" v-if="isEditing">
        <span class="label">Verlauf:</span>
        <span class="value history-link" @click="showUserHistory">Verlaufstabelle anzeigen</span>
      </div>
      <div class="info-row" v-if="isEditing">
        <span class="label">Status:</span>
        <span class="value">{{ user.isBlocked ? 'Blockiert' : 'Frei geschaltet' }}</span>
      </div>
      <div class="btn-container">
        <base-button class="btn-container__btn-edit" @click="switchToForm" v-if="showEditButton"
          >Bearbeiten</base-button
        >
        <base-button
          @click="deleteUserAccount"
          variant="delete"
          class="btn-container__btn-delete"
          v-if="showDeleteButton"
          >Konto Löschen</base-button
        >
        <base-button
          style="width: 100%"
          variant="delete"
          v-else-if="!user.roles.includes('superadmin') && isEditing"
          @click="navigate({ mode: 'back', fallback: '/calendar' })"
          >Zurück</base-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import useUserStore from '@/stores/userStore'
import { mapActions } from 'pinia'
import { generateAdminLogObj } from '@/utils/logging'
import { usePermission } from '@/composables/usePermission.js'
import { useSmartNavigation } from '@/composables/useSmartNavigation.js'
export default {
  props: {
    user: Object,
    isEditing: {
      type: Boolean,
      default: false,
    },
    screenIsLarge: {
      type: Boolean,
      default: true,
    },
  },
  setup() {
    const { hasPermission } = usePermission()
    const { navigate } = useSmartNavigation()
    return { hasPermission, navigate }
  },
  methods: {
    ...mapActions(useUserStore, ['deleteUser_store']),
    switchToForm() {
      this.$emit('switch-to-form')
    },
    showUserHistory() {
      this.navigate({
        mode: 'push',
        to: {
          name: 'AdminHistory',
          query: { userId: this.user.id || this.user._id, userName: this.user.name },
        },
      })
    },
    async deleteUserAccount() {
      try {
        const logObj = generateAdminLogObj('delete', {
          target_role: this.getUserMainRole,
          target_name: this.user.name,
        })
        const res = await this.deleteUser_store(this.user._id, logObj)
        if (res.error) {
          this.$emit('error', res.message)
        } else {
          this.$emit('success', 'Benutzer wurde erfolgreich gelöscht')
        }
      } catch (err) {
        console.log('Fehler in deleteUserAccount()', err)
        this.$emit('error', 'Ein unerwarteter Fehler ist aufgetreten')
      }
    },
  },
  computed: {
    showEditButton() {
      return this.isEditing && !this.screenIsLarge
    },
    showDeleteButton() {
      return (
        this.isEditing &&
        this.hasPermission('delete:admin') &&
        this.user.roles.includes('superadmin') === false
      )
    },
    getUserMainRole() {
      const mainRoleArray = this.user.roles.filter((r) => r !== 'trainer' && r !== 'worker')
      return mainRoleArray[0]
    },
  },
}
</script>

<style scoped>
.profile-card {
  max-width: 400px;
  margin: 2rem auto;
  padding: 3rem;
  background-color: #fff;
  border-radius: 1rem;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.05);
}

.profile-name {
  font-size: 1.6rem;
  font-weight: 600;
  color: #333;
  text-align: center;
  margin-bottom: 3rem;
}

.profile-info {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.info-row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 1.2rem;
  border-bottom: 1px solid #eee;
  padding-bottom: 1rem;
}

.label {
  color: #777;
  font-weight: 500;
  width: 30%;
}

.value {
  color: #333;
  font-weight: 400;
  text-align: right;
  width: 70%;
}

@media (min-width: 576px) {
  .profile-name {
    font-size: 1.7rem;
  }
  .info-row {
    font-size: 1.2rem;
  }
}
@media (min-width: 768px) {
  .profile-name {
    font-size: 1.8rem;
  }
  .info-row {
    font-size: 1.3rem;
  }
}

.btn-container {
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 1rem;
}
.btn-container__btn-edit,
.btn-container__btn-delete {
  width: 50%;
}

.history-link {
  cursor: pointer;
  color: var(--color-primary);
  width: fit-content;
}
.history-link:hover {
  text-decoration: underline;
}
</style>
