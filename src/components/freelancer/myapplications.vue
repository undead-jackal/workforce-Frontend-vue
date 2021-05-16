<template>
    <CCard>
        <CCardHeader>
                TItle
        </CCardHeader>
        <CCardBody>
            <div>
                <ul class="nav nav-tabs">
                    <li class="nav-item">
                        <a class="nav-link" href="#" @click.prevent="changeTab(0)">Applications</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#" @click.prevent="changeTab(1)"></a>
                    </li>
                </ul>
                <div class="row">
                    <div v-if="tab==0" class="col-12 p-4">
                        <PlaceholderTb :show="JSON.stringify(show)"/>
                        <table v-if="!show.isShown" class="table">
                            <thead>
                                <th>Application Id</th>
                                <th>Job Title</th>
                                <th>Status</th>
                                <th></th>
                            </thead>
                            <tbody v-if="hasData">
                                <tr v-for="(appl, index) in application" :key="index">
                                    <td>{{appl.application_id}}</td>
                                    <td>{{appl.title}}</td>
                                    <td>
                                        <span v-if="appl.application_stat == 0" class="badge badge-danger">Unread Invitation</span>
                                        <span v-if="appl.application_stat == 1" class="badge badge-info">Accepted Invitation</span>
                                        <span v-if="appl.application_stat == 2" class="badge badge-info">Proposal Submitted</span>
                                        <span v-if="appl.application_stat == 3" class="badge badge-warning">Interview Scheduled</span>
                                        <span v-if="appl.application_stat == 4" class="badge badge-success">Interview is Today</span>
                                        <span v-if="appl.application_stat == 7" class="badge badge-danger">Interview is Missed</span>
                                    </td>
                                    <td>
                                        <button type="button" @click="getJob(appl.job_id,appl.application_id)" v-if="appl.application_stat == 0" class="btn btn-sm btn-primary">
                                            View Invite
                                        </button>
                                        <button type="button" v-if="appl.application_stat !=0 && appl.application_stat !=10" :disabled="appl.application_stat != 3" class="btn btn-sm btn-primary" @click="openModal(appl.application_id)">View Schedule</button>
                                    </td>
                                </tr>
                            </tbody>
                            <tbody v-else>
                                <tr><td colspan="100" class="text-center">No Result</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <CModal
                :show.sync="modalSync"
                :no-close-on-backdrop="true"
                :centered="false"
                title="Modal title 2"
                color="info">
                <CAlert show color="warning">
                    <h5 class="alert-heading">Reminder!</h5>
                    <p>
                        Please be prepared for your interview if you are not available for this schedule Please click the request a Resched button
                    </p>
                </CAlert>
                <hr>
                <strong>Your Schedule</strong>
                <p>
                    {{ schedule | moment("dddd, MMMM Do YYYY") }}
                </p>
                <div v-if="showRequest" class="row px-4">
                    <div class="col-12 text-center">
                        <b class="mb-3">Tell the employer what time are you available</b>
                        <datetime type="datetime" v-model="date.from" use12-hour></datetime> 
                        <div class="px-4">To</div>
                        <datetime :min-datetime="date.from" type="datetime" v-model="date.to" use12-hour></datetime>
                    </div>
                </div>
                <template #header>
                    <h6 class="modal-title">Custom smaller modal title</h6>
                    <CButtonClose @click="modalSync = false" class="text-white"/>
                </template>
                <template #footer>
                    <CButton @click="modalSync = false; onRequest(true)" color="danger">Discard</CButton>
                    <CButton v-if="showRequest != true" @click="onRequest(false)" color="warning">Request Resched</CButton>
                    <CButton v-if="showRequest == true" color="success">Send Request</CButton>
                    <CButton v-if="showRequest == true" @click="onRequest(true)" color="warning">Cancel</CButton>
                </template>
            </CModal>

            <CModal
                :show.sync="modalSyncInvite"
                :no-close-on-backdrop="true"
                :centered="false"
                size="lg"
                title="Modal title 2"
                color="info">
                <CAlert show color="info">
                    <h5 class="alert-heading">Youve been invited!</h5>
                    <p>
                        An Employer saw your profile and sent you an invitation to apply for this job
                    </p>
                </CAlert>
                <div class="row">
                    <div class="col-12 p-4">
                        <pre>{{jobDetails}}</pre>
                        
                    </div>
                </div>
                <template #header>
                    <h6 class="modal-title">Custom smaller modal title</h6>
                    <CButtonClose @click="modalSync = false" class="text-white"/>
                </template>
                <template #footer>
                    <CButton @click="declined()" color="danger">Discard</CButton>
                    <CButton @click="acceptInvite()" color="success">Accept Invite</CButton>
                </template>
            </CModal>
        </CCardBody>
    </CCard>

</template>
<script>
import GlobalMixins from './../../mixins/globalMixins'

export default {
    data(){
        return{
            application:[],
            tab:0,
            showDialog:false,
            jobDetails:[],
            application_id:null,
            tab:0,
            show:{
                isShown:true,
                type:null
            },
            modalSync:false,
            modalSyncInvite:false,
            hasData:false,
            hasData1:false,
            schedule:null,
            showRequest:false,
            jobDetails:[],
            date:{
                from:null,
                to:null
            }
        }
    },
    mixins:[GlobalMixins],
    mounted(){
        this.getApplicant();
        this.getSchedules();
    },
    methods:{
        getJob(jobId, application){
            this.application_id = application;
            this.tab = 0;
            this.modalSyncInvite = true;
            let formdata = new FormData();
            formdata.append('id',jobId);
            let vm = this;
            let callback = (data)=>{
                vm.jobDetails = data[0]
            }
            this.post(formdata, callback, 'freelancer/getJobDetail');
        },
        onRequest(isClose){
            if (isClose) {
                this.date.to = null;
                this.date.from = null;
                this.showRequest = false;
            }else{
                this.showRequest = true
            }
        },  
        changeTab(num){
            this.tab = num;
            this.application = [];
            if(this.tab == 0){
                this.show.isShown = true;
                this.getApplicant()
            }

            if(this.tab == 1){
                this.show.isShown = true;
                this.getInterview()
            }
        },
        getApplicant(){
            let formdata = new FormData();
            formdata.append('id',this.$store.state.login.id);
            formdata.append('role',this.$store.state.login.role);
            let vm = this;
            let callback = (data)=>{
                vm.application = data
                vm.show.isShown = false;
                if (vm.application.length != 0) {
                    vm.hasData = true
                }else {
                    vm.hasData = false
                }
            }
            this.post(formdata, callback, 'freelancer/getApplication');
        },
        getInterview(){
            let formdata = new FormData();
            formdata.append('id',this.$store.state.login.id);
            formdata.append('role',this.$store.state.login.role);
            formdata.append('invited',true);
            let vm = this;
            let callback = (data)=>{
                vm.application = data;
                vm.show.isShown = false;
                if (vm.application.length != 0) {
                    vm.hasData1 = true
                }else {
                    vm.hasData1 = false
                }
            }
            this.post(formdata, callback, 'freelancer/getApplication');
        },
        openModal(id){
            let formdata = new FormData();
            let vm = this;
            this.schedule = null;
            this.modalSync = true;
            formdata.append('id',id);
            formdata.append('onlySched',true);
            let callback = (data)=>{
                this.schedule = data[0];
            }
            this.post(formdata, callback, 'freelancer/getInterview');
        },
        acceptInvite(){
            let formdata = new FormData();
            let vm = this;
            formdata.append('id',vm.application_id);
            let callback = (data)=>{
                console.log(data);
                vm.modalSyncInvite = false;
                vm.$toast.open({
                    message: 'Invitaion Accepted',
                    type: 'success',
                });
                vm.getApplicant();
            }
            this.post(formdata, callback, 'freelancer/updateInvite');
        }
    }
}
</script>
<style scoped>

</style>