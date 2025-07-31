const BASE_URL = import.meta.env.VITE_HISTORY_BASE_URL

export async function getAllHistory() {
  const res = await fetch(BASE_URL)
  return res
}

export async function getUserHistory(userId) {
  const res = await fetch(`${BASE_URL}/${userId}`)
  return res
}

export async function addHistoryEntry({ action, course, userId }) {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ action, course, userId }),
  })
  return res
}

export async function sendNotification({ group, notifications, userId }) {
  const res = await fetch(BASE_URL, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'x-user-id': userId,
    },
    body: JSON.stringify({ group, notifications }),
  })
  return res
}
