export function groupCoursesByDay(courses, weekRange) {
  const grouped = Array.from({ length: 7 }, () => [])

  for (const course of courses) {
    const isRecurring = course.date.recurring === true

    const courseStart = new Date(course.date.weekRange.start)
    courseStart.setHours(0, 0, 0, 0)

    const currentWeekStart = new Date(weekRange.start)
    currentWeekStart.setHours(0, 0, 0, 0)

    const courseEnd = course.date.repeatUntil ? new Date(course.date.repeatUntil) : null

    if (courseEnd) {
      courseEnd.setHours(0, 0, 0, 0)
    }

    const sameWeek = courseStart.getTime() === currentWeekStart.getTime()
    const recurringButNotStartedYet = isRecurring && courseStart > currentWeekStart
    const recurringButAlreadyExpired = isRecurring && courseEnd && courseEnd <= currentWeekStart

    const dayIndex = course.date.weekDay
    const actualDate = getDateFromWeekRange(weekRange.start, dayIndex)

    const internalExceptions = course.date.exceptions || []
    const isExcluded = internalExceptions.some(
      (date) => new Date(date).toDateString() === actualDate.toDateString(),
    )

    if (!isRecurring && !sameWeek) continue
    if (recurringButNotStartedYet || isExcluded || recurringButAlreadyExpired) continue

    grouped[dayIndex].push({
      ...course,
      actualDate,
    })
  }
  return [...grouped.slice(1), grouped[0]]
}

export function getDateFromWeekRange(weekStart, weekDay) {
  if (!(weekStart instanceof Date)) {
    weekStart = new Date(weekStart)
  }

  // days number to jump from the start (from mo).
  const moveDays = {
    0: 6, // su: jump 6 days.
    1: 0, // mo: jump 0 days, already at mo!
    2: 1, // tu: jump 1 days
    3: 2, // we: jump 2 days
    4: 3, // th: jump 3 days
    5: 4, // fr: jump 4 days
    6: 5, // sa: jump 5 days
  }

  const resultDate = new Date(weekStart)
  resultDate.setHours(0, 0, 0, 0)
  resultDate.setDate(resultDate.getDate() + moveDays[weekDay])

  return resultDate
}

export function calcStartTime(minutes, hour) {
  if (minutes && minutes < 10) {
    return `${hour}:0${minutes}`
  } else if (minutes && minutes >= 10) {
    return `${hour}:${minutes}`
  } else {
    return `${hour}:00`
  }
}

export function calcEndTime(minutes, hour, duration) {
  const h = parseInt(hour) || 0
  const m = parseInt(minutes) || 0
  const durationTime = parseInt(duration) || 0

  const totalMinutes = h * 60 + m + durationTime

  const endHoure = Math.floor(totalMinutes / 60)
  const endMinutes = totalMinutes % 60

  const formattedHoure = String(endHoure).padStart(2, '0')
  const formattedMinutes = String(endMinutes).padStart(2, '0')

  return `${formattedHoure}:${formattedMinutes}`
}

export function calcBaseStartDate() {
  const today = new Date()
  const monthDay = today.getDate()
  const weekDay = today.getDay()

  // how many days from today should I jump back to start at monday?
  // if sundy (0), then 6 days back -> 0 - 6 = -6 ---> back one week to last sunday
  // if another, monday minus current day -> 1 - current day (e.g. 1 - 2)

  const daysBack = weekDay === 0 ? -6 : 1 - weekDay
  today.setDate(monthDay + daysBack)

  return today
}

export function calcEndOfWeek(baseStartDate) {
  const end = new Date(baseStartDate)
  end.setDate(baseStartDate.getDate() + 7)
  return end
}

export function formatDate(date) {
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  return `${day}.${month}`
}

export function calcWeekRange(baseStartDate, weekOffset, formatDateFn) {
  const start = new Date(baseStartDate)
  start.setDate(baseStartDate.getDate() + weekOffset * 7)

  const end = new Date(start)
  end.setDate(start.getDate() + 6)

  const startFormatted = formatDateFn(start)
  const endFormatted = formatDateFn(end)

  return `${startFormatted} - ${endFormatted}`
}

export function calcCurrentMonthAndYear(baseStartDate, weekOffset) {
  const date = new Date(baseStartDate)
  date.setDate(date.getDate() + weekOffset * 7) // start of week

  const options = { month: 'long', year: 'numeric' }
  return date.toLocaleDateString('de-DE', options) // -> "Month Year"
}

export function calcStoreWeekRange(baseStartDate, weekOffset) {
  const start = new Date(baseStartDate)
  start.setDate(baseStartDate.getDate() + weekOffset * 7)

  const end = new Date(start)
  end.setDate(start.getDate() + 6)

  return { start, end }
}
