<template>
  <base-form :title="formLabel">
    <BaseInput label="Name" placeholder="Bitte Name eingeben" v-model="name" :inValid="isInvalid" />
    <BaseCheckbox v-model="selectedRoles" :option="option" />
    <BaseCheckboxGroup
      label="Kurse"
      placeholder-label="Bitte Kurse wählen"
      :options="courses"
      v-model="selectedCourses"
      :inValid="isInvalid"
      v-if="selectedRoles.includes('trainer')"
    />
    <Base-options v-if="showStatusInput" label="Status" :options="userState" v-model="status" />

    <div class="password-wrapper" v-if="isEditing">
      <base-input label="Zugangscode" style="flex: 1" v-model="password" :disabled="true">
        <template #append>
          <base-button @click="generateNewPassword()">
            <font-awesome-icon icon="fa-solid fa-arrows-rotate" />
          </base-button>
        </template>
      </base-input>
    </div>

    <div class="btn-container">
      <base-button class="btn-container__save" @click="handleSave">{{ buttonLabel }}</base-button>
      <base-button
        v-if="showCancelButton"
        class="btn-container__back"
        @click="navigate({ mode: 'back', fallback: '/calendar' })"
        variant="delete"
        >Abbrechen</base-button
      >
    </div>
  </base-form>
</template>

<script>
import { coursesList } from '@/utils/base.js'
import { generateAdminPassword } from '@/utils/user.js'
import { checkUser } from '@/utils/validate.js'
import { mapState, mapActions } from 'pinia'
import useUserStore from '@/stores/userStore.js'
import { userFormat, userStateList } from '@/utils/base.js'
import { generateAdminLogObj } from '@/utils/logging'
import { useSmartNavigation } from '@/composables/useSmartNavigation.js'

export default {
  props: {
    isEditing: {
      type: Boolean,
      default: false,
    },
    editableUser: Object,
    showCancelButton: { type: Boolean, default: false },
  },
  setup() {
    const selfId = useUserStore().user.id
    const { navigate } = useSmartNavigation()
    return { selfId, navigate }
  },
  data() {
    return {
      name: '',
      password: '',
      selectedCourses: [],
      selectedRoles: ['admin'],
      status: 'unblocked',
      option: { label: 'Trainer', value: 'trainer' },

      courses: coursesList.map((c) => ({ ...c })),
      userState: userStateList.map((s) => ({ ...s })),
      isInvalid: false,
      user: {},
    }
  },
  mounted() {
    if (this.isEditing) {
      this.user = JSON.parse(JSON.stringify(this.editableUser))
      this.name = this.user.name
      this.password = this.user.password
      this.selectedCourses = this.user.courses
      this.selectedRoles = this.user.roles
      this.user.isBlocked ? (this.status = 'blocked') : (this.status = 'unblocked')
    } else {
      this.user = structuredClone(userFormat)
    }
  },
  methods: {
    handleSave() {
      if (this.isEditing) this.update()
      else this.add()
    },
    generateNewPassword() {
      this.password = generateAdminPassword(this.name)
    },
    async add() {
      this.user.name = this.name
      this.user.courses = [...this.selectedCourses]
      this.user.roles = [...this.selectedRoles]

      const { invalid } = checkUser(this.user)
      if (invalid) {
        this.isInvalid = true
        return
      }

      this.password = generateAdminPassword(this.name)
      this.user.password = this.password

      try {
        const logObj = generateAdminLogObj('create', {
          target_role: this.getUserMainRole,
          target_name: this.user.name,
        })
        const res = await this.createUser_store(this.user, logObj)
        if (res.error) {
          this.$emit('error', res.message)
        } else {
          this.$emit('success', 'Benutzer wurde erfolgreich erstellt')
        }
      } catch (err) {
        console.error('Fehler in add():', err)
        this.$emit('error', 'Ein unerwarteter Fehler ist aufgetreten')
      }
    },
    async update() {
      const { invalid } = checkUser(this.user)
      if (invalid) {
        this.isInvalid = true
      } else {
        try {
          const logObj = generateAdminLogObj('edit', {
            target_role: this.getUserMainRole,
            target_name: this.user.name,
          })
          const res = await this.updateUser_store(this.user, logObj)
          if (res.error) {
            this.$emit('error', res.message)
          } else {
            this.$emit('success', 'Benutzer wurde erfolgreich aktualisiert')
          }
        } catch (err) {
          console.error('Fehler in update():', err)
          this.$emit('error', 'Ein unerwarteter Fehler ist aufgetreten')
        }
      }
    },
    updateUser() {
      this.$emit('update-user', this.user)
    },
    ...mapActions(useUserStore, ['updateUser_store', 'createUser_store']),
  },
  computed: {
    formLabel() {
      return this.isEditing ? 'Konto Bearbeiten' : 'Konto Regestrierung'
    },
    buttonLabel() {
      return this.isEditing ? 'Speichern' : 'Hinzufügen'
    },
    getUserMainRole() {
      return this.user.roles.find((r) => r === 'admin' || r === 'superadmin')
    },
    showStatusInput() {
      return this.isEditing && this.user._id !== this.selfId
    },
    ...mapState(useUserStore, ['users']),
  },
  watch: {
    name(val) {
      this.user.name = val
      this.updateUser()
    },
    password(val) {
      this.user.password = val
      this.updateUser()
    },
    status(val) {
      this.user.isBlocked = val === 'blocked'
      this.updateUser()
    },
    selectedCourses(val) {
      this.user.courses = [...val]
      this.updateUser()
    },
    selectedRoles(val) {
      // 1. conflict "trainer" vs. "worker"
      const uiRoles = ['trainer', 'worker']
      const selectedUi = val.filter((r) => uiRoles.includes(r))
      if (selectedUi.length > 1) {
        const last = val[val.length - 1]
        this.selectedRoles = val.filter((r) => !uiRoles.includes(r)).concat(last)
        return
      }

      // 2. conflict: "superadmin", "admin", "viewer"
      const rbacRoles = ['superadmin', 'admin', 'viewer']
      const selectedRBAC = val.filter((r) => rbacRoles.includes(r))
      if (selectedRBAC.length > 1) {
        const last = val[val.length - 1]
        this.selectedRoles = val.filter((r) => !rbacRoles.includes(r)).concat(last)
        return
      }

      if (!this.selectedRoles.includes('trainer')) {
        this.selectedCourses = []
      }

      this.user.roles = [...this.selectedRoles]
      this.updateUser()
    },
  },
}
</script>

<style>
.btn-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 1rem;
}
.btn-container__save,
.btn-container__back {
  width: 50%;
  flex: 1;
}

.password-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}
</style>
