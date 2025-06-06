export function generateAdminPassword(name) {
  const prefix = name.slice(0, 2).toLowerCase()
  const randomNumber = Math.floor(100000 + Math.random() * 900000) // 6-stellig
  return `${prefix}${randomNumber}`
}
