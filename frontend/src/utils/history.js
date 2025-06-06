export function filterHistoryEntries(entries, searchTerm) {
  if (!searchTerm || !searchTerm.trim()) return entries

  const term = searchTerm.trim().toLowerCase()

  return entries.filter((entry) => {
    const userName = entry.userName?.trim().toLowerCase() || ''
    const message = entry.message?.trim().toLowerCase() || ''
    const date = new Date(entry.createdAt)
      .toLocaleDateString('de-DE', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })
      .toLowerCase()

    return userName.includes(term) || message.includes(term) || date.includes(term)
  })
}
