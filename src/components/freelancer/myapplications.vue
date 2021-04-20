<template>
    <CCard>
        <CCardHeader>
                TItle
        </CCardHeader>
        <CCardBody>
            <div>
                <ul class="nav nav-tabs">
                    <li class="nav-item">
                        <a class="nav-link" href="#" @click.prevent="changeTab(0)">Details</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#" @click.prevent="changeTab(1)">Proposal</a>
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
                                        <span v-if="appl.application_stat == 0" class="badge badge-danger">Pending</span>
                                        <span v-if="appl.application_stat == 1" class="badge badge-info">Accepted Invitation</span>
                                        <span v-if="appl.application_stat == 2" class="badge badge-info">Proposal Submitted</span>
                                        <span v-if="appl.application_stat == 3" class="badge badge-warning">Interview Scheduled</span>
                                    </td>
                                    <td>
                                        <button type="button" class="btn btn-sm btn-primary" @click="openModal(appl.job_id, appl.application_id)">View Schedule</button>
                                    </td>
                                </tr>
                            </tbody>
                            <tbody v-else>
                                <tr><td colspan="100" class="text-center">No Result</td></tr>
                            </tbody>
                        </table>
                    </div>
                    <div v-if="tab==1" class="col-12 p-4">
                        <table class="table">
                            <thead>
                                <th>Application Id</th>
                                <th>Job Title</th>
                                <th>Status</th>
                                <th></th>
                            </thead>
                            <tbody v-if="hasData1">
                                <tr v-for="(appl, index) in application" :key="index">
                                    <td>{{appl.application_id}}</td>
                                    <td>{{appl.title}}</td>
                                    <td>
                                        <span v-if="appl.application_stat == 0" class="badge badge-danger">Pending</span>
                                        <span v-if="appl.application_stat == 1" class="badge badge-info">Accepted Invitation</span>
                                        <span v-if="appl.application_stat == 2" class="badge badge-info">Proposal Submitted</span>
                                        <span v-if="appl.application_stat == 3" class="badge badge-warning">Interview Scheduled</span>
                                    </td>
                                    <td>
                                        <button type="button" class="btn btn-sm btn-primary" @click="openModal(appl.job_id, appl.application_id)">View Invitation</button><button type="button" class="btn btn-sm">Declined</button>
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
            hasData:false,
            hasData1:false
        }
    },
    mixins:[GlobalMixins],
    mounted(){
        this.getApplicant();
    },
    methods:{
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
        openModal(id,app){
            this.showDialog = true;
            this.application_id = app;
            let formdata = new FormData();
            let vm = this;
            formdata.append('id',id);
            let callback = (data)=>{
                vm.jobDetails = data[0]
            }
            this.post(formdata, callback, 'freelancer/getJobDetail');
        },
        acceptInvite(){
            let formdata = new FormData();
            let vm = this;
            formdata.append('id',vm.application_id);
            let callback = (data)=>{
                console.log(data);
                vm.showDialog = false;
                vm.getInterview();
            }
            this.post(formdata, callback, 'freelancer/updateInvite');
        }
    }
}
</script>