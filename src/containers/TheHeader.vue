<template>
  <CHeader fixed with-subheader light>
    <CToggler
      in-header
      class="ml-3 d-lg-none"
      @click="$store.commit('toggleSidebarMobile')"
    />
    <CToggler
      in-header
      class="ml-3 d-md-down-none"
      @click="$store.commit('toggleSidebarDesktop')"
    />
    <CHeaderBrand class="mx-auto d-lg-none" to="/">
      <CIcon name="logo" height="48" alt="Logo"/>
    </CHeaderBrand>
    <CHeaderNav class="d-md-down-none mr-auto">
      <CHeaderNavItem class="px-3">
        <CHeaderNavLink to="/dashboard">
          Dashboard
        </CHeaderNavLink>
      </CHeaderNavItem>

    </CHeaderNav>
    <CHeaderNav class="mr-4">
      <CHeaderNavItem class="d-md-down-none mx-2">
        <CDropdown
              in-nav
              placement="bottom-end"
              button-content=""
            >
            <template #toggler>
            <CHeaderNavLink>
              <CIcon name="cil-bell"/>
              <CBadge color="success" class="mfs-auto">{{ notificationCount }}</CBadge>

            </CHeaderNavLink>
          </template>
              <CDropdownItem>one</CDropdownItem>
              <CDropdownItem>two</CDropdownItem>
              <CDropdownDivider/>
              <CDropdownItem>
                <a href="">View All</a>
              </CDropdownItem>
        </CDropdown>
      </CHeaderNavItem>
      <TheHeaderDropdownAccnt/>
    </CHeaderNav>
    <CSubheader class="px-3">
      <CBreadcrumbRouter class="border-0 mb-0"/>
    </CSubheader>
  </CHeader>
</template>

<script>
import TheHeaderDropdownAccnt from './TheHeaderDropdownAccnt'

import db from './../db'
import globalMixins from '../mixins/globalMixins';
export default {
  name: 'TheHeader',
  components: {
    TheHeaderDropdownAccnt
  },
  data(){
    return{
      
    }
  },
  mixins:[globalMixins],
  mounted(){
    let firebase_not = db.database().ref("workforce/realtime_notif");
    firebase_not.on('value',snapshot => {
      this.countNotification()
    })
  }
}
</script>
