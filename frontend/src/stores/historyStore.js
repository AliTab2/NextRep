import { defineStore } from 'pinia'
import {
  getAllHistory,
  getUserHistory,
  addHistoryEntry,
  sendNotification,
} from '@/api/historyApi.js'
import { handleApiResponse, buildErrorResponse } from '@/api/on.js'
import useUserStore from '@/stores/userStore.js'
import useMessageStore from './messageStore'

const useHistoryStore = defineStore('history', {
  state: () => ({
    history: [],
  }),
  getters: {
    userId: () => useUserStore().user.id,
    messageStore: () => useMessageStore(),
  },
  actions: {
    async fetchAllHistory() {
      try {
        const res = await getAllHistory()
        const result = await handleApiResponse(res, 'Verlauf Laden fehlgeschlagen')
        if (result.error) {
          this.setError(result.message)
          return result
        }

        this.history = result.data
        return result
      } catch (err) {
        console.error('Verlauf Laden fehlgeschlagen:', err)
        this.setError('Ein Fehler ist aufgetreten')
        return buildErrorResponse()
      }
    },

    async fetchUserHistory(id) {
      try {
        const userId = id ?? useUserStore().user.id
        const res = await getUserHistory(userId)
        const result = await handleApiResponse(res, 'Verlauf Laden fehlgeschlagen')
        if (result.error) {
          this.setError(result.message)
          return result
        }
        this.history = result.data
        return result
      } catch (err) {
        console.error('Verlauf Laden fehlgeschlagen:', err)
        this.setError('Ein Fehler ist aufgetreten')
        return buildErrorResponse()
      }
    },

    async createHistoryEntry({ action, course, userId }) {
      try {
        const res = await addHistoryEntry({ action, course, userId })
        const result = await handleApiResponse(res, 'Fehler beim Speichern des Verlauf-Eintrags')
        return result
      } catch (err) {
        console.error('Fehler beim Speichern des Verlauf-Eintrags:', err)
        this.setError('Ein Fehler ist aufgetreten')
        return buildErrorResponse()
      }
    },

    async sendNotification({ group, notifications }) {
      try {
        const res = await sendNotification({ group, notifications, userId: this.userId })
        const result = await handleApiResponse(res, 'Nachrichten Senden fehlgeschlagen')
        if (result.error) {
          this.setError(result.message)
          return result
        }
        this.setSuccess('Nachrichten erfolgreich gesendet')
        return result
      } catch (err) {
        console.error('Nachrichten Senden fehlgeschlagen:', err)
        this.setError('Ein Fehler ist aufgetreten')
        return buildErrorResponse()
      }
    },
    setError(msg) {
      this.messageStore.setMessage('history', 'error', msg)
    },
    setSuccess(msg) {
      this.messageStore.setMessage('history', 'success', msg)
    },
  },
})

export default useHistoryStore
