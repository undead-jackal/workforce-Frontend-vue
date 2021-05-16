import 'core-js/stable'
import Vue from 'vue'
import App from './App'
import router from './router'
import CoreuiVue from '@coreui/vue'
import { iconsSet as icons } from './assets/icons/icons.js'
import store from './store'

Vue.config.performance = true
Vue.use(CoreuiVue)
Vue.use(require('vue-moment'));

// import Toasted from 'vue-toasted';
// Vue.use(Toasted)
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
Vue.use(VueToast);

import VueContentPlaceholders from 'vue-content-placeholders'
Vue.use(VueContentPlaceholders)

import Loader from '@/components/placeholders/loader'
Vue.component('Loader', Loader)

import Placeholder from '@/components/placeholders/placeholder'
Vue.component('Placeholder', Placeholder)

import VueChatScroll from 'vue-chat-scroll'
Vue.use(VueChatScroll)

import PlaceholderCh from '@/components/placeholders/placeholderChat'
Vue.component('PlaceholderCh', PlaceholderCh)

import PlaceholderTb from '@/components/placeholders/placeholderTb'
Vue.component('PlaceholderTb', PlaceholderTb)

import PlaceholderDet from '@/components/placeholders/placeholderDet'
Vue.component('PlaceholderDet', PlaceholderDet)

import LoaderCh from '@/components/placeholders/loaderChat'
Vue.component('LoaderCh', LoaderCh)

import Multiselect from 'vue-multiselect'
Vue.component('multiselect', Multiselect)

// import Calendar from 'v-calendar/lib/components/calendar.umd'
// import DatePicker from 'v-calendar/lib/components/date-picker.umd'
// Vue.component('calendar', Calendar)
// Vue.component('date-picker', DatePicker)

import { Datetime } from 'vue-datetime'
import 'vue-datetime/dist/vue-datetime.css'

Vue.component('datetime', Datetime);

Vue.prototype.$log = console.log.bind(console)

new Vue({
  el: '#app',
  router,
  store,
  icons,
  template: '<App/>',
  components: {
    App
  },
})
