export const logTemplates = {
  course: {},
  admin: {
    create: '{target_role} {target_name} im System angelegt.',
    edit: '{target_role} {target_name} bearbeitet.',
    delete: '{target_role} {target_name} aus dem System gelöscht.',
    login: '{target_role} {target_name} angemeldet',
    logout: '{target_role} {target_name} abgemeldet',
  },
}

export function renderLogMessage(template, values) {
  return template.replace(/{(.*?)}/g, (_, key) => values[key] ?? `{${key}}`)
}

/**
 * @param {'add_one' | 'add_recurring' | 'edit_one' | 'edit_all' | 'delete_one' | 'delete_all'} actionKey
 * @param {String} adminId
 * @param {Object} course
 * @returns
 */

export function generateCourseLogObj(actionKey, targetCourse) {
  return {
    action_key: actionKey,
    target_course: targetCourse,
  }
}

export function generateAdminLogObj(actionKey) {
  return {
    action_key: actionKey,
  }
}
