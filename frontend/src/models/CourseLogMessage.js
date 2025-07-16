import { calcStartTime, getDateFromWeekRange } from '@/utils/calendar'
import { weekDays } from '@/utils/base'

export default class CourseLogMessage {
  constructor({ sport, release, trainer, dateInfo, timeInfo }, action) {
    this.sport = sport
    this.release = release
    this.trainer = trainer.map((t) => t.name).join(', ')
    this.action = action
    this.duration = timeInfo?.duration

    const dayIndex = dateInfo?.dayIndex
    const weekStart = dateInfo?.creationWeekRange?.start

    this.day = weekDays.find((d) => d.value.toString() === dayIndex.toString()).label
    this.date = getDateFromWeekRange(weekStart, dayIndex).toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
    })
    this.time = calcStartTime(timeInfo?.minute, timeInfo?.hour)
  }
  courseEvent() {
    return `Kurstermin ${this.sport}`
  }
  courseSeries() {
    return `Kursserie ${this.sport}`
  }
  courseAction() {
    return {
      add_one: 'hinzugefügt',
      add_recurring: 'hinzugefügt',
      edit_one: 'bearbeitet',
      edit_all: 'bearbeitet',
      delete_one: 'gelöscht',
      delete_all: 'gelöscht',
    }[this.action]
  }
  courseDate() {
    return `am ${this.day}, den ${this.date} um ${this.time} Uhr`
  }
  courseDuration() {
    return `(${this.duration} Minuten)`
  }
  log() {
    return {
      add_one: this.add_one(),
      add_recurring: this.add_recurring(),
      edit_one: this.edit_one(),
      edit_all: this.edit_all(),
      delete_one: this.delete_one(),
      delete_all: this.delete_all(),
    }[this.action]
  }
  add_one() {
    return {
      short: `${this.sport} ${this.courseAction()}.`,
      full: `${this.courseEvent()} (Release ${this.release}) ${this.courseAction()}. Kurstermin: ${this.courseDate()} mit ${this.trainer} ${this.courseDuration()}.`,
    }
  }
  add_recurring() {
    return {
      short: `${this.sport} ${this.courseAction()}.`,
      full: `${this.courseSeries()} ${this.courseAction()}. Kurstermine: wöchentlich am ${this.day} um ${this.time} Uhr mit ${this.trainer} ${this.courseDuration()}. Erster Kurstermin ${this.courseDate()}.`,
    }
  }
  edit_one() {
    return {
      short: `${this.sport} ${this.courseAction()}.`,
      full: `${this.courseEvent()} am ${this.day}, den ${this.date} ${this.courseAction()}. Neuer Kurstermin (Release ${this.release}) ${this.courseDate()} mit ${this.trainer} ${this.courseDuration()}.`,
    }
  }
  edit_all() {
    return {
      short: `${this.sport} ${this.courseAction()}.`,
      full: `${this.courseSeries()} (wöchentlich am ${this.day}) ${this.courseAction()}. Die neuen Kurstermine finden jetzt jeweils ${this.courseDate()} mit ${this.trainer} ${this.courseDuration()} statt.`,
    }
  }
  delete_one() {
    return {
      short: `${this.sport} ${this.courseAction()}.`,
      full: `${this.courseEvent()} (am ${this.day}, den ${this.date}) ${this.courseAction()}.`,
    }
  }
  delete_all() {
    return {
      short: `${this.sport} ${this.courseAction()}.`,
      full: `${this.courseSeries()} (wöchentlich am ${this.day}) ${this.courseAction()}.`,
    }
  }
}
