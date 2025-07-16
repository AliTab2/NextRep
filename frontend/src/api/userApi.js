const BASE_URL = 'https://nextrep-gjus.onrender.com/api/users'
// const BASE_URL = 'http://localhost:3000/api/users'

export async function getAllUsers(userId) {
  const res = await fetch(BASE_URL, {
    headers: {
      'x-user-id': userId,
    },
  })
  return res
}

export async function getOneUser(targetUserId, userId) {
  const res = await fetch(BASE_URL + '/user', {
    headers: {
      'x-user-id': userId,
      'x-target-user-id': targetUserId,
    },
  })
  return res
}

export async function createUser(userData, userId) {
  const res = await fetch(`${BASE_URL}/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-user-id': userId,
    },
    body: JSON.stringify(userData),
  })
  return res
}

export async function updateUser(targetUserId, userData, userId) {
  const res = await fetch(`${BASE_URL}/update`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'x-user-id': userId,
      'x-target-user-id': targetUserId,
    },
    body: JSON.stringify(userData),
  })
  return res
}

export async function deleteUser(targetUserId, userId) {
  const res = await fetch(`${BASE_URL}/delete`, {
    method: 'DELETE',
    headers: {
      'x-user-id': userId,
      'x-target-user-id': targetUserId,
    },
  })
  return res
}

export async function login(accessCode) {
  const res = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ password: accessCode }),
  })
  return res
}
