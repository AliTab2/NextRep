const BASE_URL = import.meta.env.VITE_SPORT_BASE_URL

export async function getAllSports() {
  const res = await fetch(BASE_URL)
  return res
}

export async function addSport({ sport, color, userId }) {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-user-id': userId,
    },
    body: JSON.stringify({ sport, color }),
  })
  return res
}

export async function updateSport({ sportId, sport, color, userId }) {
  const res = await fetch(`${BASE_URL}/${sportId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'x-user-id': userId,
    },
    body: JSON.stringify({ sport, color }),
  })
  return res
}

export async function deleteSport({ sportId, userId }) {
  const url = new URL(`${BASE_URL}/${sportId}`)

  const res = await fetch(url, {
    method: 'DELETE',
    headers: {
      'x-user-id': userId,
    },
  })

  return res
}
