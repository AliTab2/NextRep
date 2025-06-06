const user = {
  name: '',
  password: '',
  roles: ['admin'],
  courses: [],
  history: [],
  isBlocked: false,
}

const historyLog = {
  message: '',
  userId: null,
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

const course = {
  sport: '',
  trainer: '',
  time: {
    hour: 0,
    minutes: 0,
    duration: 0,
  },
  date: {
    weekRange: {}, // at creation time!
    weekDayName: '',
    weekDay: null,
    recurring: null,
    actualDate: null,
    exceptions: [], // list of dates where not to show!
    repeatUntil: null, // changed internaly, not from the user!
  },
  status: '',
}

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
  'LMI Step': { color: '#FF7F50', icon: 'fa-shoe-prints' },
  'Body Pump': { color: '#DC143C', icon: 'fa-dumbbell' },
  'Body Combat': { color: '#8B0000', icon: 'fa-hand-fist' },
  HIIT: { color: '#FFA500', icon: 'fa-bolt' },
  Core: { color: '#4682B4', icon: 'fa-circle-notch' },
  'Body Balance': { color: '#2E8B57', icon: 'fa-leaf' },
  'Body Attack': { color: '#FF4500', icon: 'fa-running' },
  Sandmann: { color: '#800080', icon: 'fa-fire' },
  'Defense Männer': { color: '#222222', icon: 'fa-shield-halved' },
  'Defense Frauen': { color: '#222222', icon: 'fa-shield-halved' },
  Defense: { color: '#222222', icon: 'fa-shield-halved' },
}

const status = [
  { label: 'Regulär', value: 'regular' },
  { label: 'Vertretung', value: 'represent' },
  { label: 'Ausfall', value: 'cancelled' },
  { label: 'Änderung', value: 'change' },
]

const courses = [
  { label: 'LMI Step', value: 'LMI Step' },
  { label: 'Body Pump', value: 'Body Pump' },
  { label: 'Body Combat', value: 'Body Combat' },
  { label: 'HIIT', value: 'HIIT' },
  { label: 'Core', value: 'Core' },
  { label: 'Body Balance', value: 'Body Balance' },
  { label: 'Body Attack', value: 'Body Attack' },
  { label: 'Sandmann', value: 'Sandmann' },
  { label: 'Defense Männer', value: 'Defense Männer' },
  { label: 'Defense Frauen', value: 'Defense Frauen' },
]

const coursesHome = [
  { label: 'LMI Step', value: 'LMI Step' },
  { label: 'Body Pump', value: 'Body Pump' },
  { label: 'Body Combat', value: 'Body Combat' },
  { label: 'HIIT', value: 'HIIT' },
  { label: 'Core', value: 'Core' },
  { label: 'Body Balance', value: 'Body Balance' },
  { label: 'Body Attack', value: 'Body Attack' },
  { label: 'Sandmann', value: 'Sandmann' },
  // { label: 'Defense', value: 'Defense' },
]

export const userFormat = user
export const userStateList = userState
export const historyLogFormat = historyLog
export const userRoles = roles
export const courseFormat = course
export const weekDays = days
export const coursesWidgetsList = coursesWidgets
export const statusList = status
export const coursesList = courses
export const coursesHomeList = coursesHome
export const navArrowForward = '&#10230'
export const navArrowBackward = '&#10229'
