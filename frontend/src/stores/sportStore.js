import { defineStore } from 'pinia'
import { handleApiResponse, buildErrorResponse } from '@/api/on'
import { getAllSports, addSport, updateSport, deleteSport } from '@/api/sportApi'
import useMessageStore from '@/stores/messageStore'
import useUserStore from './userStore'

const useSportStore = defineStore('sport', {
  state: () => {
    return {
      sports: [],
    }
  },
  getters: {
    userId: () => useUserStore().user.id,
    messageStore: () => useMessageStore(),
  },
  actions: {
    async getAllSports() {
      try {
        const res = await getAllSports()
        const result = await handleApiResponse(res, 'Sportarten Laden fehlgeschlagen')

        if (result.error) {
          this.setError(result.message)
          return result
        }
        this.sports = result.data
        return result
      } catch (err) {
        console.error('Fehler beim Laden der Sportarten:', err)
        this.setError('Ein Fehler ist aufgetreten')
        return buildErrorResponse()
      }
    },
    async addSport(sport, color) {
      try {
        const res = await addSport({ sport, color, userId: this.userId })
        const result = await handleApiResponse(res, 'Sportart Hinzufügen fehlgeschlagen')

        if (result.error) {
          this.setError(result.message)
          return result
        }

        this.setSuccess('Sportart erfolgreich hinzugefügt')

        return result
      } catch (err) {
        console.error('Fehler beim Hinzufügen der Sportart:', err)
        this.setError('Ein Fehler ist aufgetreten')
        return buildErrorResponse()
      }
    },
    async updateSport(sport, color, sportId) {
      try {
        const res = await updateSport({ sport, color, sportId, userId: this.userId })
        const result = await handleApiResponse(res, 'Sportart Aktualisieren fehlgeschlagen')

        if (result.error) {
          this.setError(result.message)
          return result
        }

        this.setSuccess('Sportart erfolgreich aktualisiert')

        return result
      } catch (err) {
        console.error('Fehler beim Aktualisieren der Sportart:', err)
        this.setError('Ein Fehler ist aufgetreten')
        return buildErrorResponse()
      }
    },
    async deleteSport(sportId) {
      try {
        const res = await deleteSport({ sportId, userId: this.userId })
        const result = await handleApiResponse(res, 'Sportart Löschen fehlgeschlagen')

        if (result.error) {
          this.setError(result.message)
          return result
        }

        this.setSuccess('Sportart erfolgreich gelöscht')

        return result
      } catch (err) {
        console.error('Fehler beim Löschen der Sportart:', err)
        this.setError('Ein Fehler ist aufgetreten')
        return buildErrorResponse()
      }
    },
    setError(msg) {
      this.messageStore.setMessage('sport', 'error', msg)
    },
    setSuccess(msg) {
      this.messageStore.setMessage('sport', 'success', msg)
    },
  },
})

export default useSportStore
