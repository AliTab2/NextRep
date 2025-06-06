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

export function validateCourse(course) {
  if (
    !course ||
    typeof course.sport !== 'string' || course.sport.trim() === '' ||
    typeof course.trainer !== 'string' || course.trainer.trim() === '' ||
    typeof course.time !== 'object' || typeof course.time.hour !== 'number' || course.time.hour === 0 ||
    typeof course.time.duration !== 'number' || course.time.duration === 0 ||
    typeof course.date !== 'object' ||
    course.date.weekDay === null || typeof course.date.weekDay !== 'number' ||
    course.date.recurring === null || typeof course.date.recurring !== 'boolean' ||
    typeof course.status !== 'string' || course.status.trim() === ''
  ) {
    return false;
  }

  // Interne Felder: Programmatisch gesetzt, aber gegen Missbrauch absichern
  if (
    typeof course.date.weekRange !== 'object' || !course.date.weekRange.start || !course.date.weekRange.end 
    // || course.date.actualDate === null || typeof course.date.actualDate !== 'string' || !course.date.actualDate.trim() ||
    // course.date.repeatUntil === null || typeof course.date.repeatUntil !== 'string' || !course.date.repeatUntil.trim()
  ) {
    return false;
  }

  return true;
}

