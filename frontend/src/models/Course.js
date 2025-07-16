import { validateCourse } from '@/utils/validate'

export default class Course {
  /**
   * @param {string} sport
   * @param {string} trainer
   * @param {string} status
   * @param {TimeInfo} timeInfo
   * @param {DateInfo} dateInfo
   */
  constructor(sport, release, trainer, status, timeInfo, dateInfo) {
    this.sport = sport
    this.release = release
    this.trainer = trainer
    this.status = status
    this.timeInfo = timeInfo
    this.dateInfo = dateInfo
  }

  isValid() {
    return validateCourse(this)
  }
}
