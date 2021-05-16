<template>
    <div class="main-row">
        <div class="flexed-container">
            <CCard v-for="(jobs,index) in jobs" :key="index" class="flexed-content">
                <CCardHeader>
                    {{jobs.title}}
                    <div class="card-header-actions">
                        <CBadge color="success" class="float-right mx-1">{{jobs.salary}}</CBadge>
                        <CBadge color="info" v-if="jobs.level == 0" class="float-right">No Experience</CBadge>
                        <CBadge color="info" v-if="jobs.level == 1" class="float-right">Entry Level</CBadge>
                        <CBadge color="info" v-if="jobs.level == 2" class="float-right">Junior Level</CBadge>
                        <CBadge color="info" v-if="jobs.level == 3" class="float-right">Senior Level</CBadge>
                    </div>
                </CCardHeader>
                <CCardBody >
                    <div class="maxed-div" v-html="jobs.description"></div>
                </CCardBody>
                <CCardFooter>
                    <CButton @click="getJob(jobs.id)" block color="primary">View Job</CButton>
                </CCardFooter>
            </CCard>
        </div>
        <Placeholder :show="JSON.stringify(show)"/>
        <CModal
            :show.sync="showDialog"
            :no-close-on-backdrop="true"
            :centered="false"
            title="Modal title 2"
            size="lg"
            color="info">
                <ul class="nav nav-tabs">
                    <li class="nav-item">
                        <a class="nav-link" href="#" @click="changeTab(0)">Details</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#" @click="changeTab(1)">Proposal</a>
                    </li>
                </ul>
                <div class="row">
                    <div v-if="tab == 0" class="col-12 p-4">
                        <PlaceholderDet :show="JSON.stringify(show1)"/>
                        <pre v-if="!show1.isShown">
                            {{jobDetails}}
                        </pre>
                    </div>
                    <div v-if="tab == 1" class="col-12 p-4">
                        <CAlert v-if="this.$store.state.userSetting.profileProgress != 100"  show color="warning">
                            <h4 class="alert-heading">Please complete your profile</h4>
                            <p>
                                <a href="profile" class="btn btn-sm btn-primary">Complete profile</a>
                            </p>
                        </CAlert>
                        <vue-editor v-else :editorToolbar="customToolbar" v-model="proposal"></vue-editor>
                    </div>
                </div>
                
            <template #header>
                <h6 class="modal-title">Job Proposal</h6>
                <CButtonClose @click="showDialog = false" class="text-white"/>
            </template>
            <template #footer>
                <CButton @click="showDialog = false" color="danger">Discard</CButton>
                <CButton v-if="tab == 1" @click="sendProposal(jobDetails.id)" color="success">Send Proposal</CButton>
            </template>
        </CModal>
    </div>
</template>
<script>
import GlobalMixins from './../../mixins/globalMixins'
import db from '../../db'
import { VueEditor } from "vue2-editor";

export default {
    mixins:[GlobalMixins],
    components:{
        VueEditor
    },
    data(){
        return{
            jobs:[],
            showDialog:false,
            onward:{
                snackbar: false,
                message:""
            },
            showSnackbar:false,
            jobDetails:[],
            customToolbar: [[{ list: "ordered" }, { list: "bullet" }]],
            proposal:"",
            triggerPlaceholder:true,
            tab:0,
            show:{
                isShown:true,
                type:null
            },
            show1:{
                isShown:true,
                type:null
            },
            jobId:null
        }
    },
    mounted(){
        this.fetchJob();
    },
    methods:{
        fetchJob(){
            let formdata = new FormData();
            formdata.append('id',this.$store.state.login.id);
            let callback = (data)=>{
                this.jobs = data;
                this.show.isShown = false;
            }
            this.post(formdata, callback, 'freelancer/fetchJobs');
        },
        changeTab(num){
            this.tab = num;
            if (this.tab == 1) {
                this.show1.isShown = !this.show1.isShown;
            }else{
                let formdata = new FormData();
                formdata.append('id',this.jobId);
                let vm = this;
                let callback = (data)=>{
                    vm.show1.isShown = false;
                    vm.jobDetails = data[0]
                }
                this.post(formdata, callback, 'freelancer/getJobDetail');
            }
        },
        getJob(jobId){
            this.showDialog = true;
            this.jobId = jobId;
            let formdata = new FormData();
            formdata.append('id',jobId);
            let vm = this;
            let callback = (data)=>{
                vm.show1.isShown = false;
                vm.jobDetails = data[0]
            }
            this.post(formdata, callback, 'freelancer/getJobDetail');
        },

        sendProposal(id){
            let formdata = new FormData();
            let vm = this;
            formdata.append('id',this.$store.state.login.id);
            formdata.append('proposal',this.proposal);
            formdata.append('job',id);
            formdata.append('role',this.$store.state.login.role);
            let callback = (data)=>{
                vm.showDialog = false;
                vm.jobs = data.jobs;
                vm.proposal = "";
                vm.$toast.open({
                    message: 'Proposal Submitted',
                    type: 'success',
                });
                let formMeData = new FormData();

                formMeData.append('to',id);
                formMeData.append('from',this.$store.state.login.id);
                formMeData.append('type',"Application");

                var call = (data) =>{
                    console.log(data);
                    let notif = db.database().ref("workforce/realtime_notif");
                    var updates = [
                        {
                            id:data,
                            type:"Application",
                            target:id
                        },
                    ];
                    notif.push(updates);
                }
                vm.post(formMeData, call, 'createNotification');
            }
            this.post(formdata, callback, 'freelancer/submitProposal');
        }
    }
}
</script>
<style scoped>
.flexed-container{
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
}
.flexed-content{
    flex:0 0 26%;
    margin:30px;
}
.maxed-div{
    display: -webkit-box!important;
    -webkit-line-clamp: 5!important;
    -webkit-box-orient: vertical!important;
    height: 110px!important;
    text-align: justify;
    overflow: hidden!important;
}
</style>