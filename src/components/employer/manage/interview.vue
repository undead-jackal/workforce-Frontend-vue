<template>
    <div>
        <PlaceholderTb :show="JSON.stringify(show)"/>
        <table v-if="!show.isShown" class="table table-striped">
            <thead>
                <th>Name</th>
                <th>Schedule</th>
                <th>Status</th>
                <th></th>
            </thead>
            <tbody v-if="hasData">
                <tr v-for="(int, index) in interview" :key="index">
                    <td>{{int.fname}} {{int.lname}}</td>
                    <td>
                        {{ int.sched | moment("dddd, MMMM Do YYYY, h:mm a") }}
                    </td>
                    <td>
                        <span v-if="int.status == 3" class="badge badge-info">Interview Set</span>
                        <span v-if="int.status == 4" class="badge badge-warning">Pending</span>
                        <span v-if="int.status == 5" class="badge badge-success">Invite Accepted</span>
                    </td>
                    <td>
                        <CButton v-if="(getTimeForm(dateToday) > getTimeForm(int.sched))" class="btn-sm" @click="openModal(int.applicant, int.job, int.app_id)" block color="primary">Start Interview</CButton>
                        {{msToTime(getTimeForm(dateToday),getTimeForm(int.sched)) + "left"}}
                    </td>
                </tr>
            </tbody>
            <tbody v-else>
                <tr><td colspan="100" class="text-center">No Result</td></tr>
            </tbody>
        </table>
        <CModal
            :show.sync="chatMe"
            :no-close-on-backdrop="true"
            :centered="false"
            title="Modal title 2"
            color="info">
            <PlaceholderCh :show="JSON.stringify(showCh)"/>
            <div v-if="!showCh.isShown" class="chatDiv" v-chat-scroll>
                <div v-for="(ch,index) in chatMixin" :key="index" class="">
                    <div v-if="ch.user != id" class="">
                        <span class="badge badge-info">{{ch.fname}} {{ch.lname}} : </span>
                        <span><p>{{ch.message}}</p></span>
                    </div>
                    <div v-else  class="">
                        <span class="badge badge-warning">{{ch.fname}} {{ch.lname}} : </span>
                        <span><p>{{ch.message}}</p></span>
                    </div>
                </div>
                
                <LoaderCh :show="isLoading"/>
                
            </div>
            <template #header>
                <h6 class="modal-title">Custom smaller modal title</h6>
                <CButtonClose @click="chatMe = false" class="text-white"/>
            </template>
            <template #footer>
                <CInput
                    v-model="message"
                />
                <CButton @click="chatMe = false" color="danger">Discard</CButton>
                <CButton @click="stateSend" color="warning">Send</CButton>
                <CButton @click="hire()" color="success">Hire</CButton>

            </template>
        </CModal>
    </div>
</template>
<script>
import GlobalMixins from './../../../mixins/globalMixins'
import db from './../../../db'

export default {
    mixins:[GlobalMixins],
    data(){
        return{
            isLoading:true,
            interview:[],
            chatData:{
                applicant:null,
                job:null,
                applicationId:null,
                chatKey:null
            },
            show:{
                isShown:true,
                type:null
            },
            showCh:{
                isShown:true,
                type:null
            },
            hasData:false,
            chatMe:false,
            message:null,
            id:this.$store.state.login.id,
            isChated:false,
        }
    },
    mounted(){
        this.getInterviews();
        let firebase_rel = db.database().ref("workforce/realtime_notif").orderByKey().limitToLast(1);
        firebase_rel.on('value',snapshot => {
            const firedata = snapshot.val();
            this.getInterviews()
        })
        let firebase_not = db.database().ref("workforce/notify").orderByKey().limitToLast(1);
        firebase_not.on('value',snapshot => {
            const data = snapshot.val();
            Object.keys(data).forEach(keys => {
                if(this.chatData.chatKey == data[keys][0].key){
                    this.getChat(data[keys][0].key);
                    this.showCh.isShown = false;
                }
            })
        })
    },
    methods:{
        getInterviews(){
            let vm = this;
            let formdata = new FormData();
            formdata.append('jobId',this.$store.state.jobId);
            var callback= (data) =>{
                vm.interview = data;
                vm.show.isShown = false;
                if (vm.interview.length != 0) {
                    vm.hasData = true
                }else {
                    vm.hasData = false
                }
            }
            this.post(formdata, callback,'employee/getInterviews')
        },
        openModal(id,job,app){
            this.showCh.isShown = true;
            this.chatData.applicant = id;
            this.chatData.job=job;
            this.chatData.applicationId = app;
            let vm = this;
            let formdata = new FormData();
            formdata.append('jobId',this.$store.state.jobId);
            formdata.append('user',id);
            var callback= (data) =>{
                vm.showCh.isShown = false;
                vm.chatData.chatKey = data[0].key;
                vm.getChat(data[0].key);
            }
            this.post(formdata, callback,'employee/getSolokey');
            this.chatMe = true;
        },
        stateSend(){
            this.showCh.isShown = true;
            this.send(this.chatData.chatKey, this.message, this.id);
            this.message="";
            let notif = db.database().ref("workforce/notify");
                var updates = [
                    {changes:true,key:this.chatData.chatKey},
                ];
            notif.push(updates);
        },
        hire(){
            let formdata = new FormData();
            formdata.append('employee',this.chatData.applicant);
            formdata.append('application',this.chatData.applicationId);
            formdata.append('job',this.chatData.job);
            let vm = this;
            var callback= (data) =>{
                vm.chatMe = false
                let notif = db.database().ref("workforce/realtime_notif");
                    var updates = [
                        {
                            id:data
                        },
                    ];
                notif.push(updates);
                vm.$toast.open({
                    message: 'Applicant Hired',
                    type: 'success',
                });
            }
            this.post(formdata, callback,'employee/hire');
        },
        msToTime(duration2, duration1) {
            var duration = duration2-duration1;
            var milliseconds = parseInt((Math.abs(duration) % 1000) / 100), 
                seconds = Math.floor((Math.abs(duration) / 1000) % 60),
                minutes = Math.floor((Math.abs(duration) / (1000 * 60)) % 60),
                hours = Math.floor((Math.abs(duration) / (1000 * 60 * 60)) % 24);
            hours = (hours < 10) ? "0" + hours : hours;
            minutes = (minutes < 10) ? "0" + minutes : minutes;
            seconds = (seconds < 10) ? "0" + seconds : seconds;
            return hours + "hr " + minutes + "min ";
        }
    }
}
</script>
<style scoped>

</style>