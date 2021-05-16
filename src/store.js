import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

const state = {
  sidebarShow: 'responsive',
  sidebarMinimize: false,
  login:{
    isLoggedIn:false,
    token:'',
    role:'',
    id:'',
    name:'',
    profileStatus:0
  },
  userSetting:{
    manual:0,
    profileStat:[],
    profileProgress:0
  },
  jobId:null,
  notificationCount:0,
  jobStatus:0,
  profile:'',
}

const mutations = {
  toggleSidebarDesktop (state) {
    const sidebarOpened = [true, 'responsive'].includes(state.sidebarShow)
    state.sidebarShow = sidebarOpened ? false : 'responsive'
  },
  toggleSidebarMobile (state) {
    const sidebarClosed = [false, 'responsive'].includes(state.sidebarShow)
    state.sidebarShow = sidebarClosed ? true : 'responsive'
  },
  set (state, [variable, value]) {
    state[variable] = value
  },
  activateLogin(state, payload){
    state = Object.assign(state,payload)
  },
  logout(state){
    Object.keys(state).forEach(key => {
      state[key] = null; // or = initialState[key]
    });
  },
  assignJobId(state,payload){
      state = Object.assign(state,payload)
  },
  countNotification(state,payload){
    state = Object.assign(state,payload)
  },
  updateJobStatus(state,payload){
    state = Object.assign(state,payload)
  },
  updateProfile(state,payload){
    state = Object.assign(state,payload)
  },
  updateSetting(state,[name, value]){
    state = Object.assign(state[name],value)
  }
}

export default new Vuex.Store({
  plugins: [createPersistedState({
    storage: window.sessionStorage,
  })],
  state,
  mutations
})