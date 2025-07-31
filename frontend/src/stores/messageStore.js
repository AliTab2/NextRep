import { defineStore } from 'pinia'

const useMessageStore = defineStore('message', {
  state: () => {
    return {
      course: { msg: '', status: '' },
      user: { msg: '', status: '' },
      history: { msg: '', status: '' },
      billing: { msg: '', status: '' },
      sport: { msg: '', status: '' },
    }
  },
  actions: {
    setMessage(area, status, msg) {
      this[area].msg = msg
      this[area].status = status
    },
    clearMessage(area = 'all') {
      if (area === 'all') {
        this.course = { msg: '', status: '' }
        this.user = { msg: '', status: '' }
        this.history = { msg: '', status: '' }
        this.billing = { msg: '', status: '' }
        this.sport = { msg: '', status: '' }
      } else {
        this[area] = { msg: '', status: '' }
      }
    },
  },
})

export default useMessageStore
