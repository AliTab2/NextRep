const BASE_URL = import.meta.env.VITE_COURSE_BASE_URL

export async function getAllCourses() {
  const res = await fetch(BASE_URL)
  return res
}

export async function getUserCourses(userId) {
  const res = await fetch(BASE_URL + '/user', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-user-id': userId,
    },
  })
  return res
}

export async function createCourse(course, userId, msg = null) {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-user-id': userId,
    },
    body: JSON.stringify({
      course,
      msg,
    }),
  })
  return res
}

export async function updateCourse(courseId, course, userId, msg = null) {
  const res = await fetch(`${BASE_URL}/${courseId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'x-user-id': userId,
    },
    body: JSON.stringify({ course, msg }),
  })
  return res
}

export async function deleteCourse(courseId, userId, msg = null) {
  const url = new URL(`${BASE_URL}/${courseId}`)

  if (msg) url.searchParams.append('msg', msg)

  const res = await fetch(url, {
    method: 'DELETE',
    headers: {
      'x-user-id': userId,
    },
  })

  return res
}
