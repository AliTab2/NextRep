export function checkCourse(course) {
  let invalid = true
  const invalidInputs = []

  if (!course.sport) invalidInputs.push('sport')
  if (!course.trainer) invalidInputs.push('trainer')
  if (Number(course.time.hour) === 0) invalidInputs.push('hour')
  if (Number(course.time.duration) === 0) invalidInputs.push('duration')
  if (course.date.weekDay === null) invalidInputs.push('weekDay')
  if (course.date.recurring === null) invalidInputs.push('recurring')
  if (course.status === '') invalidInputs.push('status')

  if (invalidInputs.length === 0) return { invalid: false, invalidInputs }
  return { invalid, invalidInputs }
}

export function checkUser(user) {
  let invalid = true
  const invalidInputs = []

  if (!user.name) invalidInputs.push('name')
  // if (user.roles.length === 0) invalidInputs.push('roles')
  if (user.roles.includes('trainer') && user.courses.length === 0) invalidInputs.push('courses')

  if (invalidInputs.length === 0) return { invalid: false, invalidInputs }
  return { invalid, invalidInputs }
}
