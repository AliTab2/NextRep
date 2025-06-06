const BASE_URL = 'https://nextrep-gjus.onrender.com/api/users'

export async function getUsers(adminId) {
  const res = await fetch(BASE_URL, {
    headers: {
      'x-user-id': adminId,
    },
  })
  return res
}

export async function createUser(userData, adminId) {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-user-id': adminId,
    },
    body: JSON.stringify(userData),
  })
  return res
}

export async function updateUser(id, userData, adminId) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'x-user-id': adminId,
    },
    body: JSON.stringify(userData),
  })
  return res
}

export async function deleteUser(id, adminId) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
    headers: {
      'x-user-id': adminId,
    },
  })
  return res
}

export async function login(password) {
  const res = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ password }),
  })
  return res
}
