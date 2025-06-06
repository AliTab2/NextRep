import { defineStore } from 'pinia'
import { getAllHistory, getUserHistory, addHistoryEntry } from '@/api/historyApi.js'
import { handleApiResponse, buildErrorResponse } from '@/api/on.js'
import useUserStore from '@/stores/userStore.js'

export const useHistoryStore = defineStore('history', {
  state: () => ({
    allHistory: [],
    userHistory: [],
    loading: false,
  }),

  actions: {
    async fetchAllHistory() {
      this.loading = true
      try {
        const res = await getAllHistory()
        const result = await handleApiResponse(res, 'Fehler beim Laden der Verlauf')
        if (!result.error) {
          this.allHistory = result.data
        }
        return result
      } catch (err) {
        console.error('Fehler beim Laden der Verlauf:', err)
        return buildErrorResponse()
      } finally {
        this.loading = false
      }
    },

    async fetchUserHistory(id) {
      this.loading = true
      try {
        const userId = id ? id : useUserStore().user.id
        const res = await getUserHistory(userId)
        const result = await handleApiResponse(res, 'Fehler beim Laden der Nutzer-Verlauf')
        if (!result.error) {
          this.userHistory = result.data
        }
        return result
      } catch (err) {
        console.error('Fehler beim Laden der Nutzer-Verlauf:', err)
        return buildErrorResponse()
      } finally {
        this.loading = false
      }
    },

    async createHistoryEntry({ action, message, userId }) {
      try {
        const res = await addHistoryEntry({ action, message, userId })
        const result = await handleApiResponse(res, 'Fehler beim Speichern des Verlauf-Eintrags')
        return result
      } catch (err) {
        console.error('Fehler beim Speichern des Verlauf-Eintrags:', err)
        return buildErrorResponse()
      }
    },
  },
})
