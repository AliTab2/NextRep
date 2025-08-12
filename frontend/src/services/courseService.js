import useCourseStore from '@/stores/courseStore'
const store = useCourseStore()
import { generateCourseLogObj } from '@/utils/logging'

export const CourseService = {
  async addCourse(course) {
    // if (Number(course.timeInfo.minute) !== 0 && !course.timeInfo.minute) {
    //   course.timeInfo.minute = 0
    // }

    const isRecurring = course.dateInfo.recurrencePattern.includes('weekly')
    const actionKey = isRecurring ? 'add_recurring' : 'add_one'
    const logObj = generateCourseLogObj(actionKey, course)
    return await store.addCourse(course, logObj)
  },
  async updateCourse(exception, course) {
    if (exception) {
      course.dateInfo.exceptions.push(exception)
    }
    this.cleanExceptions(course)
    let actionKey = 'edit_all'
    if (exception) actionKey = 'edit_one'
    if (exception && exception.status === 'deleted') actionKey = 'delete_one'

    const logObj = generateCourseLogObj(actionKey, exception ?? course)
    return await store.updateCourse(course, logObj)
  },
  deleteCourse(exception, course) {
    if (exception) {
      return this.updateCourse(exception, course)
    }
    const actionKey =
      exception || course.dateInfo?.recurrencePattern === 'once' ? 'delete_one' : 'delete_all'
    const logObj = generateCourseLogObj(actionKey, exception ?? course)
    return store.deleteCourse(course._id, logObj)
  },
  cleanExceptions(course) {
    const map = new Map()
    for (const ex of course.dateInfo.exceptions) {
      const dateInfo = ex.dateInfo || {}
      const key = `${new Date(dateInfo.creationWeekRange.start).toDateString()}-${dateInfo.dayIndex}`
      map.set(key, ex)
    }
    course.dateInfo.exceptions = Array.from(map.values())
    return course
  },
}
