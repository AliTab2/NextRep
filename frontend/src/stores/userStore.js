import { defineStore } from 'pinia'
import {
  createUser,
  deleteUser,
  getOneUser,
  getAllUsers,
  login,
  updateUser,
} from '@/api/userApi.js'
import { handleApiResponse, buildErrorResponse } from '@/api/on'
import useHistoryStore from './historyStore'
import { generateAdminLogObj } from '@/utils/logging'
import useMessageStore from './messageStore'

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
  }),
  getters: {
    mainRole: (state) => state.user.roles.filter((r) => r !== 'trainer')[0],
    messageStore: () => useMessageStore(),
  },
  actions: {
    async login(accessCode) {
      try {
        const res = await login(accessCode)
        const result = await handleApiResponse(res, 'Login fehlgeschlagen')

        if (result.error) {
          this.setError(result.message)
          return result
        }

        this.isLoggedIn = true
        this.user = result.data

        this.setSuccess('Login erfolgreich')

        localStorage.setItem('user', JSON.stringify(this.user))
        const logObj = generateAdminLogObj('login')
        this.logUserAction(logObj)

        return result
      } catch (err) {
        console.error('Login Fehler:', err)
        this.setError('Ein Fehler ist aufgetreten')
        return buildErrorResponse()
      }
    },
    async restoreSession() {
      const user = localStorage.getItem('user')
      const parsedUser = JSON.parse(user)

      if (user) {
        const res = await this.login(parsedUser.password)
        if (res.error) this.logout()
      }
    },
    logout() {
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
      this.setSuccess('Abmeldung erfolgreich')
    },
    async createUser(user, logObj) {
      try {
        const res = await createUser(user, this.user.id)
        const result = await handleApiResponse(res, 'Nutzerkonto Erstellen fehlgeschlagen')

        if (result.error) {
          this.setError(result.message)
          return result
        }

        this.setSuccess('Nutzerkonto erfolgreich erstellt')
        if (logObj) this.logUserAction(logObj)
        return result
      } catch (err) {
        console.error('Fehler beim Nutzerkonto Erstellen:', err)
        this.setError('Ein Fehler ist aufgetreten')
        return buildErrorResponse()
      }
    },

    async updateUser(updatedUser, logObj) {
      try {
        const res = await updateUser(updatedUser._id, updatedUser, this.user.id)
        const result = await handleApiResponse(res, 'Nutzerkonto Aktualisieren fehlgeschlagen')
        if (result.error) {
          this.setError(result.message)
          return result
        }
        this.setSuccess('Nutzerkonto erfolgreich aktualisiert')
        if (logObj) this.logUserAction(logObj)
        return result
      } catch (err) {
        console.error('Fehler beim Nutzerkonto Aktualisieren:', err)
        this.setError('Ein Fehler ist aufgetreten')
        return buildErrorResponse()
      }
    },

    async deleteUser(userId, logObj) {
      try {
        const res = await deleteUser(userId, this.user.id)
        const result = await handleApiResponse(res, 'Nuterkonto Löschen fehlgeschlagen')
        if (result.error) {
          this.setError(result.message)
          return result
        }
        this.setSuccess('Nutzerkonto erfolgreich gelöscht')
        if (logObj) this.logUserAction(logObj)
        return result
      } catch (err) {
        console.error('Fehler beim Nutzer Löschen:', err)
        this.setError('Ein Fehler ist aufgetreten')
        return buildErrorResponse()
      }
    },
    async getAllUsers() {
      try {
        const res = await getAllUsers(this.user.id)
        const result = await handleApiResponse(res, 'Nutzerkonten Laden fehlgeschlagen')
        if (result.error) {
          this.setError(result.message)
          return result
        }
        this.users = result.data
        return result
      } catch (err) {
        console.error('Fehler beim Nutzerkonten laden:', err)
        this.setError('Ein Fehler ist aufgetreten')
        return buildErrorResponse()
      }
    },
    async getOneUser() {
      try {
        const res = await getOneUser(this.user.id)
        const result = await handleApiResponse(res, 'Nutzerkonto Laden fehlgeschlagen')
        if (result.error) {
          this.setError(result.message)
          return result
        }
        this.users = result.data
        return result
      } catch (err) {
        console.error('Fehler beim Nutzer laden:', err)
        this.setError('Ein Fehler ist aufgetreten')
        return buildErrorResponse()
      }
    },
    async logUserAction(logObj) {
      try {
        const historyStore = useHistoryStore()
        const result = await historyStore.createHistoryEntry({
          action: logObj.action_key,
          course: null,
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
    setError(msg) {
      this.messageStore.setMessage('user', 'error', msg)
    },
    setSuccess(msg) {
      this.messageStore.setMessage('user', 'success', msg)
    },
  },
})

export default useUserStore
