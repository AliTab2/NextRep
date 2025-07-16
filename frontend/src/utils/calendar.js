export function groupCoursesByDay(courses, weekRange) {
  const grouped = Array.from({ length: 7 }, () => [])

  for (const course of courses) {
    const isRecurring = course.dateInfo.recurrencePattern.includes('weekly')

    const courseStart = new Date(course.dateInfo.creationWeekRange.start)
    const currentWeekStart = new Date(weekRange.start)
    currentWeekStart.setHours(0, 0, 0, 0)
    courseStart.setHours(0, 0, 0, 0)
    const sameWeek = courseStart.getTime() === currentWeekStart.getTime()
    const recurringButNotStartedYet = isRecurring && courseStart > currentWeekStart
    const dayIndex = course.dateInfo.dayIndex
    const actualDate = getDateFromWeekRange(weekRange.start, dayIndex)

    const courseExceptions = course.dateInfo.exceptions
    const exceptionToday = courseExceptions.find(
      (e) =>
        new Date(e.dateInfo.creationWeekRange.start).toDateString() ===
        weekRange.start.toDateString(),
    )

    if (!isRecurring && !sameWeek) continue
    if (recurringButNotStartedYet) continue
    if (exceptionToday?.status === 'deleted') continue

    grouped[dayIndex].push({
      ...course,
      ...exceptionToday,
      actualDate,
      exceptionDate: exceptionToday
        ? {
            weekRangeStart: exceptionToday.dateInfo.creationWeekRange.start,
            dayIndex: exceptionToday.dateInfo.dayIndex,
          }
        : false,
    })
  }
  return [...grouped.slice(1), grouped[0]]
}

/**
 *
 * @param {'first' | 'last'} pos whether to get first n or last n days
 * @param {number} num number of days to return
 * @param {Array<Array>} courses 2D Array containing all week days with the corresponding courses. Every day is an array containing objects.
 */
export function getCoursesNDaysRange(pos, num, courses) {
  if (pos === 'first') return courses.slice(0, num)
  if (pos === 'last') return courses.slice(courses.length - num)
  return []
}

export function getDateFromWeekRange(weekStart, dayIndex) {
  if (!(weekStart instanceof Date)) {
    weekStart = new Date(weekStart)
  }

  const moveDays = Number(dayIndex) === 0 ? 6 : Number(dayIndex) - 1

  const resultDate = new Date(weekStart)
  resultDate.setHours(0, 0, 0, 0)
  resultDate.setDate(resultDate.getDate() + moveDays)

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

export function generateRange(start, end) {
  return Array.from({ length: end - start + 1 }, (_, i) => ({ value: start + i, label: start + i }))
}
