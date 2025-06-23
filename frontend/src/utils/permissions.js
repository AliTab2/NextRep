export const ROLE_PERMISSIONS = {
  superadmin: [
    'add:course',
    'edit:course',
    'delete:course',
    'create:admin',
    'edit:admin',
    'delete:admin',
    'view:registered-courses',
    'view:registered-admins',
    'view:admin-details',
    'view:admin-history',
    'view:all-history',
    'access:settings',
  ],
  admin: [
    'add:course',
    'edit:course',
    'delete:course',
    'view:admin-details',
    'view:admin-history',
    'access:settings',
  ],
}

export function hasPermission(userRoles, permission) {
  return userRoles.some((role) => {
    const allowedPermissions = ROLE_PERMISSIONS[role]
    return allowedPermissions?.includes(permission)
  })
}
