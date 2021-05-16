<template>
    <CModal
      :show.sync="dontShow"
      :no-close-on-backdrop="true"
      title="Workforce Manual"
      size="lg"
      color="dark"
    >
      <CTabs>
          <CTab title="Dashboard">
            N/A
          </CTab>
          <CTab title="Find Job">
            <p>
              On this page you can check the jobs been posted by employers
            </p>
            <div class="image-help">
              <img src="https://cdn.image4.io/jackal/f_auto/workforce/system/f1e4ebf2-4526-4336-8d64-05fd171a5c6e.png" alt="">
            </div>
            <p>
              by clicking the "View job" button you can view the job detail and submit your proposal.
              the image below shows the details tab all detail about the job is listed below
            </p>
            <div class="image-help">
              <img src="https://cdn.image4.io/jackal/f_auto/workforce/system/f8d05d9a-71b0-44a2-b618-2ae5196fe003.png" alt="">
            </div>
            <p>
              the image below shows where you can enter your proposal for the job then clic submit
            </p>
            <div class="image-help">
              <img src="https://cdn.image4.io/jackal/f_auto/workforce/system/e8263714-0e70-43f4-8c7e-5137f267f6e1.png" alt="">
            </div>
          </CTab>
          <CTab title="My Application">
            <p>
              The My applicationpage shows the list of all job youve been invited and all job you submitted 
            </p>
            <div class="image-help">
              <img src="https://cdn.image4.io/jackal/f_auto/workforce/system/ac572556-b225-494f-9414-a934e643cb27.png" alt="">
            </div>
          </CTab>
          <CTab title="My Jobs">
            <p>
              Here you manage all your job and view your earning
            </p>
            <div class="image-help">
              <img src="https://cdn.image4.io/jackal/f_auto/workforce/system/cd6083b5-dff3-4a20-a37a-dd7f3d763f2b.png" alt="">
            </div>
            <p>
              clicking on manage job here you can start the timer when your working all of your log will be seen by your Employer
            </p>
            <div class="image-help">
              <img src="https://cdn.image4.io/jackal/f_auto/workforce/system/d8379031-b0e6-4d59-8427-0412060d4ec7.png" alt="">
            </div>
          </CTab>
          <CTab title="Profile">
          </CTab>
          <CTab title="Messenger">
          </CTab>
          <CTab title="Transaction">
          </CTab>
      </CTabs>
      <template #header>
        <h6 class="modal-title">Workforce Manual</h6>
        <CButtonClose @click="closeModal" class="text-white"/>
      </template>
      <template #footer>
        <div class="form-check checkbox">
          <input class="form-check-input" @change="showMethod" type="checkbox" v-model="isCheck">
          <label class="form-check-label" for="check1">Dont show again</label>
        </div>
        <CButton @click="closeModal" color="danger">Close</CButton>
      </template>
    </CModal>
</template>
<script>
import globalMixins from '../../mixins/globalMixins'
export default {
    props:['data'],
    mixins:[globalMixins],
    watch:{
      data(newVal,oldVal){
            this.dontShow = newVal
      }
    },
    data(){
        return{
            dontShow:null,
            isCheck:false
        }
    },
    mounted(){
      this.isCheck = (this.$store.state.userSetting.manual == 0) ?false:true;
    },
    methods:{
      showMethod(){
        var manual = this.isCheck ? 1: 0;
        var formdata = new FormData();
        formdata.append('setting',"manual");
        formdata.append('manual',manual);
        formdata.append('user',this.$store.state.login.id);
        let callback = (data) =>{
          this.$store.commit('updateSetting', ['userSetting',{manual:manual}]);
        }
        this.post(formdata,callback,'userSetting')
      },
      closeModal(){
        this.$emit('close', true);
        this.dontShow = false;
      }
    }
}
</script>
<style scoped>
.image-help{
  position:relative;
  width: 60%;
  height: 200px;
}

.image-help img{
  position:absolute;
  top:0;left:0;
  width: 100%;
  height: 100%;
}
</style>