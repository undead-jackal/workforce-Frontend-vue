<template>
  <CDropdown
    inNav
    class="c-header-nav-items"
    placement="bottom-end"
    add-menu-classes="pt-0"
  >
    <template #toggler>
      <CHeaderNavLink>
        <div class="c-avatar">
          <img
            :src="$store.state.profile"
            class="c-avatar-img "
          />
        </div>
      </CHeaderNavLink>
    </template>
    <CDropdownHeader tag="div" class="text-center" color="light">
      <strong>Account</strong>
    </CDropdownHeader>
    <CDropdownItem href="messenger">
      <CIcon name="cil-envelope-open" /> Messages
      <CBadge color="success" class="mfs-auto">{{ itemsCount }}</CBadge>
    </CDropdownItem>
    <CDropdownHeader
      tag="div"
      class="text-center"
      color="light"
    >
      <strong>Settings</strong>
    </CDropdownHeader>
    <CDropdownItem href="profile">
      <CIcon name="cil-user" /> Profile
    </CDropdownItem>
    
    <CDropdownDivider/>
    <CDropdownItem @click.prevent="logout()">
      <CIcon name="cil-lock-locked" /> Logout
    </CDropdownItem>
  </CDropdown>
</template>

<script>
import globalMixins from '../mixins/globalMixins';
export default {
  mixins:[globalMixins],
  name: 'TheHeaderDropdownAccnt',

  data () {
    return { 
      itemsCount: 42,
      myrole:this.$store.state.login.role
    }
  },
  methods:{
    logout(){
            var login = {}
            this.$store.commit('activateLogin', { login });
            this.$store.commit('updateSetting', ['userSetting',{manual:null}]);
            this.$store.commit('updateSetting', ['userSetting',{profileStat:null}]);
            this.$store.commit('updateSetting', ['userSetting',{profileProgress:null}]);
            this.$router.push({ name: 'Login' })
        },
  }
}
</script>

<style scoped>
  .c-icon {
    margin-right: 0.3rem;
  }
</style>