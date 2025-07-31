<template>
  <base-form :title="formLabel">
    <BaseInput label="Name" placeholder="Bitte Name eingeben" v-model="name" :inValid="isInvalid" />
    <BaseCheckbox v-model="selectedRoles" :option="option" />
    <CheckboxGroup
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
      <base-button
        v-if="showCancelButton"
        class="btn-container__back"
        @click="navigate({ mode: 'back', fallback: '/calendar' })"
        variant="delete"
        >Abbrechen</base-button
      >
      <base-button variant="dark" class="btn-container__save" @click="handleSave">{{
        buttonLabel
      }}</base-button>
    </div>
  </base-form>
</template>

<script>
import { coursesList } from '@/utils/base.js'
import { generateAdminPassword } from '@/utils/user.js'
import { validateUser } from '@/utils/validate.js'
import { mapState, mapActions } from 'pinia'
import useUserStore from '@/stores/userStore.js'
import { userFormat, userStateList } from '@/utils/base.js'
import { useSmartNavigation } from '@/composables/useSmartNavigation.js'
import CheckboxGroup from '../shared/CheckboxGroup.vue'

export default {
  components: {
    CheckboxGroup,
  },
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
    ...mapActions(useUserStore, ['updateUser', 'createUser']),
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

      const { invalid } = validateUser(this.user)
      if (invalid) {
        this.isInvalid = true
        return
      }

      this.password = generateAdminPassword(this.name)
      this.user.password = this.password

      try {
        const res = await this.createUser(this.user)
        if (!res.error) this.$emit('success')
      } catch (err) {
        console.error('Fehler in add():', err)
      }
    },
    async update() {
      const { invalid } = validateUser(this.user)
      if (invalid) {
        this.isInvalid = true
      } else {
        try {
          const res = await this.updateUser(this.user)
          if (!res.error) this.$emit('success')
        } catch (err) {
          console.error('Fehler in update():', err)
        }
      }
    },
    updateUserIntern() {
      this.$emit('update-user', this.user)
    },
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
      this.updateUserIntern()
    },
    password(val) {
      this.user.password = val
      this.updateUserIntern()
    },
    status(val) {
      this.user.isBlocked = val === 'blocked'
      this.updateUserIntern()
    },
    selectedCourses(val) {
      this.user.courses = [...val]
      this.updateUserIntern()
    },
    selectedRoles() {
      if (!this.selectedRoles.includes('trainer')) {
        this.selectedCourses = []
      }
      this.user.roles = [...this.selectedRoles]
      this.updateUserIntern()
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
