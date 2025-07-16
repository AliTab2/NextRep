import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { register } from 'swiper/element/bundle'
register()
import {
  faPen,
  faPlus,
  faShoePrints,
  faDumbbell,
  faHandFist,
  faBolt,
  faCircleNotch,
  faLeaf,
  faRunning,
  faStar,
  faFire,
  faClock,
  faSpa,
  faShieldHalved,
  faCalendar,
  faCircleUser,
  faArrowsRotate,
  faEnvelope,
  faPaperPlane,
  faClockRotateLeft,
  faUsers,
  faUser,
  faUserCheck,
  faUserLock,
  faGear,
  faArrowUpFromBracket,
  faExclamationCircle,
  faHome,
  faUpRightAndDownLeftFromCenter,
  faMaximize,
  faExpand,
  faArrowRightToBracket,
  faArrowRightFromBracket,
  faSquarePlus,
  faCalendarPlus,
  faSliders,
  faLightbulb,
  faTurnUp,
  faTrash,
  faUserPlus,
  faReceipt,
  faCoins,
} from '@fortawesome/free-solid-svg-icons'

import { faCalendarDays } from '@fortawesome/free-regular-svg-icons'

import { faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons'

library.add(
  faPen,
  faPlus,
  faShoePrints,
  faDumbbell,
  faHandFist,
  faBolt,
  faCircleNotch,
  faLeaf,
  faRunning,
  faStar,
  faFire,
  faClock,
  faSpa,
  faShieldHalved,
  faCalendar,
  faCircleUser,
  faArrowsRotate,
  faEnvelope,
  faInstagram,
  faWhatsapp,
  faPaperPlane,
  faClockRotateLeft,
  faUsers,
  faUser,
  faCalendarDays,
  faUserCheck,
  faUserLock,
  faGear,
  faArrowUpFromBracket,
  faExclamationCircle,
  faHome,
  faUpRightAndDownLeftFromCenter,
  faMaximize,
  faExpand,
  faArrowRightToBracket,
  faArrowRightFromBracket,
  faSquarePlus,
  faPlus,
  faCalendarPlus,
  faSliders,
  faLightbulb,
  faTurnUp,
  faTrash,
  faUserPlus,
  faReceipt,
  faCoins,
)
import App from '@/App.vue'
import router from '@/router/router.js'

import BaseInput from '@/components/base/form/BaseInput.vue'
import BaseOptions from '@/components/base/select/BaseOptions.vue'
import BaseHourPicker from '@/components/base/form/BaseHourPicker.vue'
import BaseMinutePicker from '@/components/base/form/BaseMinutePicker.vue'
import BaseButton from '@/components/base/interactive/BaseButton.vue'
import BaseMessage from '@/components/base/feedback/BaseMessage.vue'
import BaseForm from '@/components/base/form/BaseForm.vue'
import BaseCheckbox from '@/components/base/select/BaseCheckbox.vue'
import BaseLoader from '@/components/base/feedback/BaseLoader.vue'
import BaseModal from './components/base/interactive/BaseModal.vue'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.component('FontAwesomeIcon', FontAwesomeIcon)
app.component('BaseInput', BaseInput)
app.component('BaseOptions', BaseOptions)
app.component('BaseHourPicker', BaseHourPicker)
app.component('BaseMinutePicker', BaseMinutePicker)
app.component('BaseForm', BaseForm)
app.component('BaseCheckbox', BaseCheckbox)
app.component('BaseButton', BaseButton)
app.component('BaseMessage', BaseMessage)
app.component('BaseLoader', BaseLoader)
app.component('BaseModal', BaseModal)

import '@/assets/styles/base.css' // base.css importiert automatisch variables.css

app.mount('#app')
