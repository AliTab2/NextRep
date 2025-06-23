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
)
import App from '@/App.vue'
import router from '@/router/router.js'

import BaseInput from '@/components/Base/BaseInput.vue'
import BaseOptions from '@/components/Base/BaseOptions.vue'
import BaseTimeHour from '@/components/Base/BaseTimeHour.vue'
import BaseTimeMinute from '@/components/Base/BaseTimeMinute.vue'
import BaseTimeGroup from './components/Base/BaseTimeGroup.vue'
import BaseButton from '@/components/Base/BaseButton.vue'
import BaseMessage from '@/components/Base/BaseMessage.vue'
import BaseForm from '@/components/Base/BaseForm.vue'
import BaseCheckboxGroup from '@/components/Base/BaseCheckboxGroup.vue'
import BaseSplitView from '@/components/Base/BaseSplitView.vue'
import BaseCheckbox from '@/components/Base/BaseCheckbox.vue'
import BaseLoader from '@/components/Base/BaseLoader.vue'
import BaseListItem from '@/components/Base/BaseListItem.vue'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.component('FontAwesomeIcon', FontAwesomeIcon)
app.component('BaseInput', BaseInput)
app.component('BaseOptions', BaseOptions)
app.component('BaseTimeHour', BaseTimeHour)
app.component('BaseTimeMinute', BaseTimeMinute)
app.component('BaseTimeGroup', BaseTimeGroup)
app.component('BaseForm', BaseForm)
app.component('BaseCheckboxGroup', BaseCheckboxGroup)
app.component('BaseSplitView', BaseSplitView)
app.component('BaseCheckbox', BaseCheckbox)
app.component('BaseButton', BaseButton)
app.component('BaseMessage', BaseMessage)
app.component('BaseLoader', BaseLoader)
app.component('BaseListItem', BaseListItem)

import '@/assets/styles/base.css' // base.css importiert automatisch variables.css

app.mount('#app')
