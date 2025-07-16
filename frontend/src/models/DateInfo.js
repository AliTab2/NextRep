export default class DateInfo {
  /**
   * @param {{ start: Date, end: Date }} creationWeekRange
   * @param {string} dayName
   * @param {number} dayIndex
   * @param {'once' | 'weekly'} recurrencePattern
   */
  constructor(creationWeekRange, dayIndex, recurrencePattern) {
    this.creationWeekRange = creationWeekRange
    this.dayIndex = dayIndex
    this.recurrencePattern = recurrencePattern

    this.exceptions = []
  }
}
