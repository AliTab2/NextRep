export async function handleApiResponse(res, defaultErrorMessage = 'Fehler') {
  try {
    const data = await res.json()
    if (res.ok) return { error: false, data }

    return { error: true, message: data.message || defaultErrorMessage, data: null }
  } catch (err) {
    console.error('API Response Fehler:', err)
    return { error: true, message: defaultErrorMessage, data: null }
  }
}
export function buildErrorResponse(message = 'Ein Fehler ist aufgetreten') {
  return {
    error: true,
    message,
    data: null,
  }
}
