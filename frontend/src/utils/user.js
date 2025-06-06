export function generateAdminPassword() {
  const randomNumber = Math.floor(100000 + Math.random() * 900000) // 6-stellig
  return randomNumber
}
