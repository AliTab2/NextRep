const BASE_URL = 'https://nextrep-gjus.onrender.com/api/courses'

export async function getCourses() {
  const res = await fetch(BASE_URL)
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

export async function updateCourse(id, course, userId, msg = null) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'x-user-id': userId,
    },
    body: JSON.stringify({ course, msg }),
  })
  return res
}

export async function deleteCourse(id, userId, msg = null) {
  const url = new URL(`${BASE_URL}/${id}`)

  // Nur anhängen, wenn msg vorhanden ist
  if (msg) {
    url.searchParams.append('msg', msg)
  }

  const res = await fetch(url, {
    method: 'DELETE',
    headers: {
      'x-user-id': userId,
    },
  })

  return res
}
