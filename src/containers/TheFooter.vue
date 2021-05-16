<template>
  <CFooter :fixed="false">
    <div class="mr-3">
      <button @click="openManual" class="btn btn-sm btn-primary">Open Manual</button>
    </div>
    <div>
      <a href="" target="_blank">Workforce</a>
      <span class="ml-1">&copy; 2021 Dev Team.</span>
    </div>
    <div class="mfs-auto">
      <span class="mr-1" target="_blank"></span>
      <a href="www.centralityms.com">Centrality MS</a>
    </div>
    <TheManual :data="firstLogin" @close="firstLogin =false"/>

  </CFooter>
</template>

<script>
import { cilAccountLogout } from '@coreui/icons'
import globalMixins from '../mixins/globalMixins'
import TheManual from './../components/pages/manual'

export default {
  name: 'TheFooter',
  components:{
    TheManual
  },
  mixins:[globalMixins],
  data(){
    return{
      firstLogin:null,
    }
  },
  mounted(){
    this.firstLogin=(this.$store.state.userSetting.manual == 0) ? true : false
  },
  methods:{
    openManual(){
      this.firstLogin = true
    }
  }
  
}
</script>
