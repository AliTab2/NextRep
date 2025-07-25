const BASE_URL = 'https://nextrep-gjus.onrender.com/api/billing'
// const BASE_URL = 'http://localhost:3000/api/billing'

export async function createBilling({ courses, month, userId }) {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-user-id': userId,
    },
    body: JSON.stringify({ courses, month }),
  })
  return res
}
