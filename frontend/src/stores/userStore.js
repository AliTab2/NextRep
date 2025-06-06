import { defineStore } from 'pinia'
import { createUser, deleteUser, getUsers, login, updateUser } from '@/api/userApi.js'
import { handleApiResponse, buildErrorResponse } from '@/api/on'
import { renderLogMessage, logTemplates } from '@/utils/logging'
import { useHistoryStore } from './historyStore'
import { generateAdminLogObj } from '@/utils/logging'

const useUserStore = defineStore('user', {
  state: () => ({
    user: {
      id: null,
      name: '',
      password: '',
      roles: [],
      courses: [],
      isBlocked: false,
    },
    isLoggedIn: false,
    users: [],
    token: null,
  }),
  getters: {
    mainRole: (state) => state.user.roles.filter((r) => r !== 'trainer')[0],
  },
  actions: {
    async login_store(accessCode) {
      try {
        const res = await login(accessCode)
        const result = await handleApiResponse(res, 'Login fehlgeschlagen')
        if (!result.error) {
          this.isLoggedIn = true
          this.user = result.data

          localStorage.setItem('user', JSON.stringify(this.user))

          const logObj = generateAdminLogObj('login', {
            target_role: this.mainRole,
            target_name: this.user.name,
          })
          this.logUserAction(logObj.actionKey, logObj)
        }

        return result
      } catch (err) {
        console.error('Login Fehler:', err)
        return buildErrorResponse()
      }
    },
    async restoreSession() {
      const user = localStorage.getItem('user')
      const parsedUser = JSON.parse(user)

      if (user) {
        const res = await this.login_store(parsedUser.password)
        if (res.error) this.logout_store()
      }
    },
    logout_store() {
      const logObj = generateAdminLogObj('logout', {
        target_role: this.mainRole,
        target_name: this.user.name,
      })
      this.logUserAction(logObj.actionKey, logObj)
      this.user = {
        id: null,
        name: '',
        password: '',
        roles: [],
        courses: [],
        isBlocked: false,
      }
      this.users = []
      this.isLoggedIn = false
      localStorage.removeItem('user')
    },
    async createUser_store(user, logObj) {
      try {
        const res = await createUser(user, this.user.id)
        const result = await handleApiResponse(res, 'Nutzer Erstellen fehlgeschlagen')

        if (!result.error && logObj) {
          this.logUserAction(logObj.actionKey, logObj)
        }

        return result
      } catch (err) {
        console.error('Fehler beim Nutzer Erstellen:', err)
        return buildErrorResponse()
      }
    },

    async updateUser_store(updatedUser, logObj) {
      try {
        const res = await updateUser(updatedUser._id, updatedUser, this.user.id)
        const result = await handleApiResponse(res, 'Nutzer Aktualisieren fehlgeschlagen')
        if (!result.error && logObj) {
          this.logUserAction(logObj.actionKey, logObj)
        }
        return result
      } catch (err) {
        console.error('Fehler beim Nutzer Aktualisieren:', err)
        return buildErrorResponse()
      }
    },

    async deleteUser_store(userId, logObj) {
      try {
        const res = await deleteUser(userId, this.user.id)
        const result = await handleApiResponse(res, 'Nuter Löschen fehlgeschlagen')
        if (!result.error && logObj) {
          this.logUserAction(logObj.actionKey, logObj)
        }
        return result
      } catch (err) {
        console.error('Fehler beim Nutzer Löschen:', err)
        return buildErrorResponse()
      }
    },

    async getUsers_store() {
      try {
        const res = await getUsers(this.user.id)
        const result = await handleApiResponse(res, 'Nutzer Laden werden')
        if (!result.error) {
          this.users = result.data
        }
        return result
      } catch (err) {
        console.error('Fehler beim Nutzer laden:', err)
        return buildErrorResponse()
      }
    },
    async logUserAction(actionKey, values) {
      try {
        const template = logTemplates.admin[actionKey]

        if (!template) {
          console.error(`[Log] Kein Template für: ${actionKey}`)
          return
        }

        const message = renderLogMessage(template, values)
        const historyStore = useHistoryStore()
        const result = await historyStore.createHistoryEntry({
          action: actionKey,
          message,
          userId: this.user.id,
        })

        if (result.error) {
          console.warn('Fehler beim Speichern in History:', result.message)
        }

        return result
      } catch (err) {
        console.error('Fehler in logUserAction(): ', err)
        return buildErrorResponse()
      }
    },
  },
})

export default useUserStore
