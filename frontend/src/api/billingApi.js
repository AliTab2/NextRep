const BASE_URL = import.meta.env.VITE_BILLING_BASE_URL

export async function createBilling({ courses, month, userId, vacationDates }) {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-user-id': userId,
    },
    body: JSON.stringify({ courses, month, vacationDates }),
  })
  return res
}
