import { defineStore } from 'pinia'
import useUserStore from './userStore'
import { renderLogMessage, logTemplates } from '@/utils/logging'
import { getCourses, createCourse, updateCourse, deleteCourse } from '@/api/courseApi.js'
import { handleApiResponse, buildErrorResponse } from '@/api/on'
import { useHistoryStore } from './historyStore'

const useCourseStore = defineStore('courses', {
  state: () => {
    return {
      courses: [],
      weekRange: {
        start: 0,
        end: 0,
      },
    }
  },
  getters: {
    userId: () => useUserStore().user.id,
  },
  actions: {
    async addCourse_store(course, logObj) {
      try {
        // WhatsApp message
        let autoMsg = null
        if (logObj) {
          const temp = logTemplates.course[logObj.actionKey]
          logObj.target_date = new Date(logObj.target_date).toLocaleDateString('de-DE', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          })
          autoMsg = renderLogMessage(temp, logObj)
        }

        const res = await createCourse(course, this.userId, autoMsg)
        const result = await handleApiResponse(res, 'Kurs Hinzufügen fehlgeschlagen')

        if (!result.error && logObj) {
          this.logCourseAction(logObj.actionKey, logObj)
        }

        return result
      } catch (err) {
        console.error('Fehler beim Hinzufügen des Kurses:', err)
        return buildErrorResponse()
      }
    },

    async updateCourse_store(updatedCourse, logObj) {
      try {
        // WhatsApp message
        let autoMsg = null
        if (logObj) {
          const temp = logTemplates.course[logObj.actionKey]
          logObj.target_date = new Date(logObj.target_date).toLocaleDateString('de-DE', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          })
          autoMsg = renderLogMessage(temp, logObj)
        }

        const res = await updateCourse(updatedCourse._id, updatedCourse, this.userId, autoMsg)
        const result = await handleApiResponse(res, 'Kurs Aktualisieren fehlgeschlagen')

        if (!result.error && logObj) {
          this.logCourseAction(logObj.actionKey, logObj)
        }

        return result
      } catch (err) {
        console.error('Fehler beim Aktualisieren des Kurses:', err)
        return buildErrorResponse()
      }
    },

    async deleteCourse_store(courseId, logObj) {
      try {
        // WhatsApp message
        let autoMsg = null
        if (logObj) {
          const temp = logTemplates.course[logObj.actionKey]
          logObj.target_date = new Date(logObj.target_date).toLocaleDateString('de-DE', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          })
          autoMsg = renderLogMessage(temp, logObj)
        }

        const res = await deleteCourse(courseId, this.userId, autoMsg)
        const result = await handleApiResponse(res, 'Kurs Löschen fehlgeschlagen')

        if (!result.error && logObj) {
          this.logCourseAction(logObj.actionKey, logObj)
        }
        return result
      } catch (err) {
        console.error('Fehler beim Löschen des Kurses:', err)
        return buildErrorResponse()
      }
    },

    async getCourses_store() {
      try {
        const res = await getCourses()
        const result = await handleApiResponse(res, 'Kurse Laden fehlgeschlagen')
        if (!result.error) {
          this.courses = result.data
        }
        return result
      } catch (err) {
        console.error('Fehler beim Laden der Kurse:', err)
        return buildErrorResponse()
      }
    },
    updateWeekRange(startDate, endDate) {
      this.weekRange.start = startDate
      this.weekRange.end = endDate
    },
    async logCourseAction(actionKey, values) {
      console.log(values)
      try {
        const template = logTemplates.course[actionKey]

        if (!template) {
          console.error(`[Log] Kein Template für: ${actionKey}`)
          return
        }

        const message = renderLogMessage(template, values)

        const historyStore = useHistoryStore()
        const result = await historyStore.createHistoryEntry({
          action: actionKey,
          message,
          userId: this.userId,
        })

        if (result.error) {
          console.warn('Fehler beim Speichern in History:', result.message)
        }

        return result
      } catch (err) {
        console.error('Fehler in logCourseAction(): ', err)
        return buildErrorResponse()
      }
    },
  },
})

export default useCourseStore
