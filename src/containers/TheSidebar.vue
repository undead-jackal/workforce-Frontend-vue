<template>
  <CSidebar 
    fixed 
    :minimize="minimize"
    :show="show"
    @update:show="(value) => $store.commit('set', ['sidebarShow', value])"
  >
    <CSidebarBrand class="d-md-down-none" to="/">
      <CIcon 
        class="c-sidebar-brand-full" 
        name="logo" 
        size="custom-size" 
        :height="35" 
        viewBox="0 0 556 134"
      />
      <CIcon 
        class="c-sidebar-brand-minimized" 
        name="logo" 
        size="custom-size" 
        :height="35" 
        viewBox="0 0 110 134"
      />
    </CSidebarBrand>

    <CRenderFunction v-if="role == 2" flat :content-to-render="$options.employerNav"/>
    <CRenderFunction v-if="role == 0" flat :content-to-render="$options.freelancerNav"/>
    <CRenderFunction v-if="role == 1" flat :content-to-render="$options.cooridnatorNav"/>

    <CSidebarMinimizer
      class="d-md-down-none"
      @click.native="$store.commit('set', ['sidebarMinimize', !minimize])"
    />
  </CSidebar>
</template>

<script>
import nav from './_nav'
import employerNav from './navs/_enav'
import freelancerNav from './navs/_fnav'
import cooridnatorNav from './navs/_cnav'


export default {
  name: 'TheSidebar',
  nav,employerNav,freelancerNav,cooridnatorNav,
  data(){
    return{
      role:this.$store.state.login.role
    }
  },
  computed: {
    show () {
      return this.$store.state.sidebarShow 
    },
    minimize () {
      return this.$store.state.sidebarMinimize 
    }
  }
}
</script>
