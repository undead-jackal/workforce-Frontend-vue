<template>
    <div>
        <PlaceholderTb :show="JSON.stringify(show)"/>
        <table v-if="!show.isShown" class="table table-striped">
            <thead>
                <th>Name</th>
                <th>Apllication Type</th>
                <th>Status</th>
                <th></th>
            </thead>
            <tbody v-if="hasData">
                <tr v-for="(app, index) in applicants" :key="index">
                    <td>{{app.fname}} {{app.lname}}</td>
                    <td>
                        <span v-if="app.type == 0" class="badge badge-info">Invited</span>
                        <span v-if="app.type == 1" class="badge badge-info">Applied</span>
                    </td>
                    <td>
                        <span v-if="app.status == 0" class="badge badge-info">Invitation Sent</span>
                        <span v-if="app.status == 1" class="badge badge-warning">Pending</span>
                        <span v-if="app.status == 2" class="badge badge-success">Invite Accepted</span>
                    </td>
                    <td>
                        <CButton class="btn-sm" @click="openModal(app.applicant, app.title, app.id,app.job)" block color="primary">View Profile</CButton>
                    </td>
                </tr>
            </tbody>
            <tbody v-else>
                <tr><td colspan="100" class="text-center">No Result</td></tr>
            </tbody>
        </table>
        <CModal
            :show.sync="profileModal"
            :no-close-on-backdrop="true"
            :centered="false"
            title="Modal title 2"
            size="lg"
            color="info">
                <PlaceholderDet :show="JSON.stringify(show1)"/>
                <div v-if="!show1.isShown">
                    <pre>
                        {{profile}}
                    </pre>
                </div>
            <template #header>
                <h6 class="modal-title">Custom smaller modal title</h6>
                <CButtonClose @click="profileModal = false" class="text-white"/>
            </template>
            <template #footer>
                <datetime type="datetime" v-model="interview.sched" use12-hour></datetime>
                <CButton @click="profileModal = false" color="danger">Discard</CButton>
                <CButton @click="setInterview()" color="success">Set Interview</CButton>

            </template>
        </CModal>
        <Loader :show="isLoading"/>
    </div>
    
</template>
<script>
import GlobalMixins from './../../../mixins/globalMixins'
import db from './../../../db'

export default {
    mixins:[GlobalMixins],
    data(){
        return{
            applicants:[],
            profileModal:false,
            profile:[],
            isLoading:false,
            interview:{
                sched:null,
                applicant:null,
                title:null,
                user:null,
                job:null
            },
            show:{
                isShown:true,
                type:null
            },
            show1:{
                isShown:true,
                type:null
            },
            hasData:false
        }
    },

    mounted(){
        this.getApplicants();
        let firebase_not = db.database().ref("workforce/realtime_notif").orderByKey().limitToLast(1);
        firebase_not.on('value',snapshot => {
            const firedata = snapshot.val();
            this.getApplicants()
        })
    },
    methods:{
        setInterview(){
            let vm = this;
            vm.isLoading=true;
            let callback = (data) =>{
                vm.isLoading=false;
                vm.$toast.open({
                    message: 'Interview Set',
                    type: 'success',
                });
                let formMeData = new FormData();

                formMeData.append('job',id);
                formMeData.append('user',this.$store.state.login.id);
                formMeData.append('type',"SetInterview");

                var call = (data) =>{
                    let notif = db.database().ref("workforce/realtime_notif");
                    var updates = [
                        {
                            id:data
                        },
                    ];
                    notif.push(updates);
                }
                vm.post(formMeData, call, 'createNotification');
            }
            this.post(this.interview,callback,'employee/setInterview');
            this.profileModal = false;
            this.getApplicants();
        },
        getApplicants(){
            let vm = this;
            let formdata = new FormData();
            formdata.append('jobId',this.$store.state.jobId);
            var callback= (data) =>{
                vm.applicants = data.applicant;
                vm.show.isShown = false;
                if (vm.applicants.length != 0) {
                    vm.hasData = true
                }else {
                    vm.hasData = false
                }
            }
            this.post(formdata, callback,'employee/getApplicants');
        },
        openModal(id,title,application,job){
            this.show1.isShown = true;
            this.profileModal=true;
            this.interview.applicant=application,
            this.interview.title=title,
            this.interview.user=id,
            this.interview.job=job
            let vm = this;
            let formdata = new FormData();
            formdata.append('id', id);
            formdata.append('single', true);
            var callback= (data) =>{
                vm.show1.isShown = false;
                vm.profile = data.data[0];
            }
            this.post(formdata, callback,'employee/getFreelancer');
        }
    }
}
</script>
<style scoped>

</style>