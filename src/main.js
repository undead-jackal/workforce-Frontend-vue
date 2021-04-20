import 'core-js/stable'
import Vue from 'vue'
import App from './App'
import router from './router'
import CoreuiVue from '@coreui/vue'
import { iconsSet as icons } from './assets/icons/icons.js'
import store from './store'

Vue.config.performance = true
Vue.use(CoreuiVue)

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
