export default class TimeInfo {
  /**
   * @property {number} hour
   * @property {number} minute
   * @property {number} duration
   */
  constructor(hour, minute = 0, duration) {
    this.hour = hour
    this.minute = minute
    this.duration = duration
  }
}
