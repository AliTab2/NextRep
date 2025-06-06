export const ROLE_PERMISSIONS = {
  superadmin: [
    'add:course',
    'edit:course',
    'delete:course',
    // 'create:system-course',
    // 'edit:system-course',
    // 'delete:system-course',
    'create:admin',
    'edit:admin',
    'delete:admin',
    // 'assign-trainer:admin',
    // 'unassign-trainer:admin',
    'view:registered-courses',
    'view:registered-admins',
    'view:admin-details',
    // 'view:admin-password',
    'view:admin-history',
    'view:all-history',
    'edit:homepage-text',
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
  viewer: [
    'view:registered-courses',
    'view:registered-admins',
    'view:admin-details',
    // 'view:admin-password',
    // 'view:admin-history',
  ],
}

export function hasPermission(userRoles, permission) {
  return userRoles.some((role) => {
    const allowedPermissions = ROLE_PERMISSIONS[role]
    return allowedPermissions?.includes(permission)
  })
}
