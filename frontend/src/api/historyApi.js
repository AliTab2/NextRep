const BASE_URL = 'https://nextrep-gjus.onrender.com/api/history'

export async function getAllHistory() {
  const res = await fetch(BASE_URL)
  return res
}

export async function getUserHistory(userId) {
  const res = await fetch(`${BASE_URL}/${userId}`)
  return res
}

export async function addHistoryEntry({ action, message, userId }) {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ action, message, userId }),
  })
  return res
}
