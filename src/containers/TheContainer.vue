<template>
  <div class="c-app">
    <TheSidebar/>
    <CWrapper>
      <TheHeader/>
      <div class="c-body">
        <main class="c-main">
          <CContainer fluid>
            <transition name="fade" mode="out-in">
              <router-view :key="$route.path"></router-view>
            </transition>
          </CContainer>
        </main>
      </div>
      <TheFooter/>
    </CWrapper>
  </div>
</template>

<script>
import TheSidebar from './TheSidebar'
import TheHeader from './TheHeader'
import TheFooter from './TheFooter'
import db from './../db'
import globalMixins from '../mixins/globalMixins'

export default {
  name: 'TheContainer',
  mixins:[globalMixins],

  mounted(){
    var vm = this;
    let firebase_not = db.database().ref("workforce/realtime_notif");
        firebase_not.on('value',snapshot => {
          // alert("changes");  
            console.log("changes");     
             vm.$toast.open({
                    message: 'Check notify',
                    type: 'success',
                });     
            const fireData = snapshot.val();
            this.countNotification();
          })
  },
  components: {
    TheSidebar,
    TheHeader,
    TheFooter,
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
