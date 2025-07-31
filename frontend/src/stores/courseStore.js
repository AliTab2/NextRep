import { defineStore } from 'pinia'
import useUserStore from './userStore'
import { handleApiResponse, buildErrorResponse } from '@/api/on'
import useHistoryStore from '@/stores/historyStore'
import useMessageStore from '@/stores/messageStore'

import {
  getAllCourses,
  getUserCourses,
  createCourse,
  updateCourse,
  deleteCourse,
} from '@/api/courseApi.js'

const useCourseStore = defineStore('course', {
  state: () => {
    return {
      courses: [],
      weekRange: {
        start: 0,
        end: 0,
      },
      isExporting: false,
      exportNote: null,
      calendarView: 'full',
      isLoadingCourses: false,
    }
  },
  getters: {
    userId: () => useUserStore().user.id,
    messageStore: () => useMessageStore(),
  },
  actions: {
    async addCourse(course, logObj) {
      try {
        const res = await createCourse(course, this.userId)
        const result = await handleApiResponse(res, 'Kurs Hinzufügen fehlgeschlagen')

        if (result.error) {
          this.setError(result.message)
          return result
        }

        this.setSuccess('Kurs erfolgreich hinzugefügt')

        if (logObj) this.logCourseAction(logObj)

        return result
      } catch (err) {
        console.error('Fehler beim Hinzufügen des Kurses:', err)
        this.setError('Ein Fehler ist aufgetreten')
        return buildErrorResponse()
      }
    },

    async updateCourse(course, logObj) {
      try {
        const res = await updateCourse(course._id, course, this.userId)
        const result = await handleApiResponse(res, 'Kurs Aktualisieren fehlgeschlagen')

        if (result.error) {
          this.setError(result.message)
          return result
        }

        this.setSuccess('Kurs erfolgreich aktualisiert')

        if (logObj) this.logCourseAction(logObj)

        return result
      } catch (err) {
        console.error('Fehler beim Aktualisieren des Kurses:', err)
        this.setError('Ein Fehler ist aufgetreten')
        return buildErrorResponse()
      }
    },

    async deleteCourse(courseId, logObj) {
      try {
        const res = await deleteCourse(courseId, this.userId)
        const result = await handleApiResponse(res, 'Kurs Löschen fehlgeschlagen')

        if (result.error) {
          this.setError(result.message)
          return result
        }

        this.setSuccess('Kurs erfolgreich gelöscht')

        if (logObj) this.logCourseAction(logObj)

        return result
      } catch (err) {
        console.error('Fehler beim Löschen des Kurses:', err)
        this.setError('Ein Fehler ist aufgetreten')
        return buildErrorResponse()
      }
    },
    async getAllCourses() {
      try {
        const res = await getAllCourses()
        const result = await handleApiResponse(res, 'Kurse Laden fehlgeschlagen')

        if (result.error) {
          this.setError(result.message)
          return result
        }
        this.courses = result.data
        return result
      } catch (err) {
        console.error('Fehler beim Laden der Kurse:', err)
        this.setError('Ein Fehler ist aufgetreten')
        return buildErrorResponse()
      }
    },
    async getUserCourses() {
      try {
        const res = await getUserCourses(this.userId)
        const result = await handleApiResponse(res, 'Kurse Laden fehlgeschlagen')
        if (result.error) {
          this.setError(result.message)
          return result
        }
        this.courses = result.data
        return result
      } catch (err) {
        console.error('Fehler beim Laden der Kurse:', err)
        this.setError('Ein Fehler ist aufgetreten')
        return buildErrorResponse()
      }
    },
    updateWeekRange(startDate, endDate) {
      this.weekRange.start = startDate
      this.weekRange.end = endDate
    },
    updateStateValue(key, value) {
      this[key] = value
    },
    async logCourseAction(logObj) {
      try {
        const historyStore = useHistoryStore()
        const result = await historyStore.createHistoryEntry({
          action: logObj.action_key,
          course: logObj.target_course,
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
    setError(msg) {
      this.messageStore.setMessage('course', 'error', msg)
    },
    setSuccess(msg) {
      this.messageStore.setMessage('course', 'success', msg)
    },
  },
})

export default useCourseStore
