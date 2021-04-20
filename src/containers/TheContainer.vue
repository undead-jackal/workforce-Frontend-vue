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
    let firebase_not = db.database().ref("workforce/realtime_notif");
        firebase_not.on('value',snapshot => {            
            const data = snapshot.val();
            Object.keys(data).forEach(keys => {
                var formdata = new FormData();
                formdata.append('id', data[keys][0].id);
                let callback = (data) =>{
                    if(data.length != 0){
                      if (data[0].owner == this.$store.state.login.id && data[0].type == "Application") {
                          this.$toast.open({
                          message: data[0].fname + " " + data[0].lname + " applied to: " + data[0].title,
                          type: 'success',
                        });
                        this.post(formdata, function(){}, 'updateNotification')
                      }

                      // if (data[0].user == this.$store.state.login.id && data[0].type == "SetInterview") {
                      //     this.$toast.open({
                      //     message: data[0].fname + " " + data[0].lname + " applied to: " + data[0].title,
                      //     type: 'success',
                      //   });
                      //   this.post(formdata, function(){}, 'updateNotification')
                      // }
                    }
                }
                this.post(formdata, callback, 'getNotification')
            })
        })
  },
  components: {
    TheSidebar,
    TheHeader,
    TheFooter
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
