const user = {
  name: '',
  password: '',
  roles: ['admin'],
  courses: [],
  history: [],
  isBlocked: false,
}

const roles = [
  // { label: 'Projektleiter', value: 'superadmin' },
  { label: 'Admin', value: 'admin' },
  { label: 'Trainer', value: 'trainer' },
]

const userState = [
  { label: 'Frei geschaltet', value: 'unblocked' },
  { label: 'Blockiert', value: 'blocked' },
]

const days = [
  { label: 'Montag', value: 1 },
  { label: 'Dienstag', value: 2 },
  { label: 'Mittwoch', value: 3 },
  { label: 'Donnerstag', value: 4 },
  { label: 'Freitag', value: 5 },
  { label: 'Samstag', value: 6 },
  { label: 'Sonntag', value: 0 },
]

const coursesWidgets = {
  'LMI Step': { color: '#00959B', icon: 'fa-solid fa-shoe-prints' },
  'Body Pump': { color: '#EE444D', icon: 'fa-solid fa-dumbbell' },
  'Body Combat': { color: '#706D2A', icon: 'fa-solid fa-hand-fist' },
  HIIT: { color: '#FFA500', icon: 'fa-solid fa-bolt' },
  Core: { color: '#000000', icon: 'fa-solid fa-circle-notch' },
  'Body Balance': { color: '#B8D674', icon: 'fa-solid fa-leaf' },
  'Body Attack': { color: '#FCB239', icon: 'fa-solid fa-person-running' },
  'Strength meets HIIT': { color: '#800080', icon: 'fa-solid fa-fire' },
  'Defense Männer': { color: '#000000', icon: 'fa-solid fa-shield-halved' },
  'Defense Frauen': { color: '#000000', icon: 'fa-solid fa-shield-halved' },
  'HIIT Cardio': { color: '#FFA500', icon: 'fa-solid fa-bolt' },
  'HIIT Strength': { color: '#FFA500', icon: 'fa-solid fa-bolt' },
}

const status = [
  { label: 'Regulär', value: 'regular' },
  { label: 'Vertretung', value: 'represent' },
  { label: 'Ausfall', value: 'cancelled' },
  { label: 'Änderung', value: 'change' },
  { label: 'Special', value: 'special' },
  { label: 'Gelöscht', value: 'deleted' },
]

const courses = [
  { label: 'LMI Step', value: 'LMI Step' },
  { label: 'Strength meets HIIT', value: 'Strength meets HIIT' },
  { label: 'HIIT', value: 'HIIT' },
  { label: 'HIIT Cardio', value: 'HIIT Cardio' },
  { label: 'HIIT Strength', value: 'HIIT Strength' },
  { label: 'Body Pump', value: 'Body Pump' },
  { label: 'Body Combat', value: 'Body Combat' },
  { label: 'Body Balance', value: 'Body Balance' },
  { label: 'Body Attack', value: 'Body Attack' },
  { label: 'Core', value: 'Core' },
  { label: 'Defense Männer', value: 'Defense Männer' },
  { label: 'Defense Frauen', value: 'Defense Frauen' },
]

const coursesHome = [
  { label: 'LMI Step', value: 'LMI Step' },
  { label: 'Pump', value: 'Body Pump' },
  { label: 'Combat', value: 'Body Combat' },
  { label: 'HIIT', value: 'HIIT' },
  { label: 'Core', value: 'Core' },
  { label: 'Balance', value: 'Body Balance' },
  { label: 'Attack', value: 'Body Attack' },
  { label: 'Strength meets HIIT', value: 'Strength meets HIIT' },
  // { label: 'Defense', value: 'Defense' },
]

const groups = [
  { label: 'Die NextReper - CF Kurse', value: 'main' },
  { label: 'NextRep Admins', value: 'admins' },
  { label: 'NextRep Demo', value: 'demo' },
]

export const userFormat = user
export const userStateList = userState
export const userRoles = roles
export const weekDays = days
export const coursesWidgetsList = coursesWidgets
export const statusList = status
export const coursesList = courses
export const coursesHomeList = coursesHome
export const navArrowForward = '&#10230'
export const navArrowBackward = '&#10229'
export const whatsAppGroups = groups
