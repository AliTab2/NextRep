export function validateCourse(course) {
  let invalid = false
  const invalidInputs = []

  if (course.sport === undefined) invalidInputs.push('sport')
  if (course.release === undefined) invalidInputs.push('releases')
  if (course.trainer.length === 0) invalidInputs.push('trainer')
  if (course.status === undefined) invalidInputs.push('status')

  if (course.timeInfo.hour === undefined) invalidInputs.push('hour')
  if (course.timeInfo.duration === undefined) invalidInputs.push('duration')

  if (course.dateInfo.dayIndex === undefined) invalidInputs.push('weekDay')
  if (course.dateInfo.recurrencePattern === undefined) invalidInputs.push('recurrence')

  if (invalidInputs.length > 0) return { invalid: true, invalidInputs }
  return { invalid, invalidInputs }
}

export function validateUser(user) {
  let invalid = true
  const invalidInputs = []

  if (!user.name) invalidInputs.push('name')
  if (user.roles.includes('trainer') && user.courses.length === 0) invalidInputs.push('courses')

  if (invalidInputs.length === 0) return { invalid: false, invalidInputs }
  return { invalid, invalidInputs }
}
