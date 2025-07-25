import { defineStore } from 'pinia'
import { createBilling } from '@/api/billingApi'
import { buildErrorResponse } from '@/api/on'
import useUserStore from '@/stores/userStore'

export const useBillingStore = defineStore('billing', {
  getters: {
    userId: () => useUserStore().user.id,
  },
  actions: {
    async createBilling(courses, month) {
      try {
        const res = await createBilling({ courses, month, userId: this.userId })
        if (!res.ok) throw new Error('Fehler beim Erstellen der Abrechnung')
        const blob = await res.blob()
        return blob
      } catch (err) {
        console.error('Fehler beim Erstellen der Abrechnung:', err)
        return buildErrorResponse()
      }
    },
  },
})
