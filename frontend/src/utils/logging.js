import { getDateFromWeekRange } from '@/utils/calendar.js'

export const logTemplates = {
  course: {
    add_once: 'Kurstermin {course} einmalig für {target_day} {target_date} hinzugefügt.',
    add_recurring:
      'Kurstermin {course} als wiederkehrend hinzugefügt (wöchentlich am {target_day}).',
    edit_single: 'Kurstermin {course} bearbeitet - betroffen: {target_day} {target_date}',
    edit_all:
      'Kurstermin {course} bearbeitet - betroffen: {target_day} {target_date} und alle weiteren Termine',
    delete_single: 'Kurstermin {course} gelöscht - betroffen: {target_day} {target_date}',
    delete_all:
      'Kurstermin {course} gelöscht - betroffen: {target_day} {target_date} und alle weiteren Termine',
  },
  admin: {
    create: '{target_role} {target_name} im System angelegt.',
    edit: '{target_role} {target_name} bearbeitet.',
    delete: '{target_role} {target_name} aus dem System gelöscht.',
    login: '{target_role} {target_name} angemeldet',
    logout: '{target_role} {target_name} abgemeldet',
  },
  system: {
    homepage_edit: 'Homepage-Text bearbeitet.',
  },
}

export function renderLogMessage(template, values) {
  return template.replace(/{(.*?)}/g, (_, key) => values[key] ?? `{${key}}`)
}

/**
 * Needed for course:
 * course
 * target_day
 * target_date
 *
 * Nedded for admin:
 * target_role
 * target_name
 */

export function generateCourseLogObj(actionKey, courseObj = {}, weekRange = null) {
  const weekRangeToUse = weekRange ? weekRange?.start : courseObj.date?.weekRange?.start
  const weekDay = courseObj.date?.weekDay

  // console.log(weekRangeToUse, weekDay)

  return {
    actionKey,
    course: courseObj.sport,
    target_day: courseObj.date.weekDayName,
    target_date: getDateFromWeekRange(weekRangeToUse, weekDay),
  }
}

export function generateAdminLogObj(actionKey, { target_role, target_name }) {
  return {
    actionKey,
    target_role,
    target_name,
  }
}
