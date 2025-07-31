import { defineStore } from 'pinia'
import { createBilling } from '@/api/billingApi'
import { buildErrorResponse } from '@/api/on'
import useUserStore from '@/stores/userStore'
import useMessageStore from './messageStore'

const useBillingStore = defineStore('billing', {
  getters: {
    userId: () => useUserStore().user.id,
    messageStore: () => useMessageStore(),
  },
  actions: {
    async createBilling(courses, month, vacationDates) {
      if (courses.length === 0) {
        this.setError('Abrechnung kann nicht erstellt werden.')
        return
      }
      try {
        const res = await createBilling({ courses, month, userId: this.userId, vacationDates })
        const error = new Error('Fehler beim Erstellen der Abrechnung')
        if (!res.ok) {
          this.setError(error.message)
          return
        }

        const blob = await res.blob()
        if (!blob) {
          this.setError(error.message)
          return
        }

        this.setSuccess('Abrechnung erfolgreich erstellt')
        return blob
      } catch (err) {
        console.error('Fehler beim Erstellen der Abrechnung:', err)
        this.setError('Ein Fehler ist aufgetreten')
        return buildErrorResponse()
      }
    },
    setError(msg) {
      this.messageStore.setMessage('billing', 'error', msg)
    },
    setSuccess(msg) {
      this.messageStore.setMessage('billing', 'success', msg)
    },
  },
})

export default useBillingStore
