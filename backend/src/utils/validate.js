export function validateUser(user) {
  if (
    !user ||
    typeof user.name !== 'string' || user.name.trim() === '' ||
    !Array.isArray(user.roles) || user.roles.length === 0 ||
    (user.roles.includes('trainer') && (!Array.isArray(user.courses) || user.courses.length === 0)) ||
    typeof user.isBlocked !== 'boolean'
  ) {
    return false;
  }
  return true;
}

/**
 * 
 * @param {*} course 
 * @returns False if course is invalid, otherwise True
 */
export function validateCourse(course) {
  if (!course || typeof course !== 'object') return false
  if (!course.release || typeof course.release !== 'number' && typeof course.release !== 'string') return false
  if (!course.sport || typeof course.sport !== 'string') return false
  if (
    !Array.isArray(course.trainer) || 
    course.trainer.length === 0 || 
    !course.trainer.every(t => typeof t === 'string' || typeof t === 'object')) 
    {
      return false
    }
  if (!course.status || typeof course.status !== 'string') return false

  const t = course.timeInfo
  if (!t || typeof t !== 'object') return false
  if (typeof t.hour !== 'number' && typeof t.hour !== 'string' || Number(t.hour) < 0 || Number(t.hour) > 23) return false
  if (t.minute && typeof t.minute !== 'number' && typeof t.minute !== 'string' || Number(t.minute) < 0 || Number(t.minute) > 59) return false
  if (typeof t.duration !== 'number' && typeof t.duration !== 'string' || Number(t.duration) <= 0 || Number(t.duration) > 60) return false


  const d = course.dateInfo
  if (!d || typeof d !== 'object') return false
  if (typeof d.dayIndex !== 'number' && typeof d.dayIndex !== 'string' || Number(d.dayIndex) < 0 || Number(d.dayIndex) > 6) return false
  if (!['once', 'weekly'].includes(d.recurrencePattern)) return false

  return true
}
