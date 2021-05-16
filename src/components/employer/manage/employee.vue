<template>
    <div>
        <PlaceholderTb :show="JSON.stringify(show)"/>
        <table v-if="!show.isShown" class="table table-striped">
            <thead>
                <th>Name</th>
                <th>Employee Id</th>
                <th>Payment</th>
                <th>Hours Rendered</th>
                <th>Status</th>
                <th></th>
            </thead>
            <tbody v-if="hasData">
                <tr v-for="(emp, index) in employee" :key="index">
                    <td>{{emp.fname}} {{emp.lname}}</td>
                    <td>
                        {{emp.empId}}
                    </td>
                    <td>
                        &#8369; {{emp.payment}}
                    </td>
                    <td>
                        {{emp.totalHours}} hours(s)
                    </td>
                    <td>
                        <span v-if="emp.status == 0" class="badge badge-success">Employed</span>
                    <td>
                        <CButton @click="getLogs(emp.empId, emp.paymentType)" class="btn-sm" block color="primary">View Logs</CButton>
                    </td>
                </tr>
            </tbody>
            <tbody v-else>
                <tr><td colspan="100" class="text-center">No Result</td></tr>
            </tbody>
        </table>
        <CModal
            :show.sync="openModal"
            :no-close-on-backdrop="true"
            :centered="false"
            title="Modal title 2"
            size="lg"
            color="info">
            <PlaceholderTb :show="JSON.stringify(show1)"/>
            <table v-if="!show1.isShown" class="table table-striped">
                <thead>
                    <th>Started</th>
                    <th>Ended</th>
                    <th>Rendered Time</th>
                    <th v-if="paymentType == 1">Payout</th>
                </thead>
                <tbody v-if="hasData1">
                    <tr v-for="(log, index) in logs" :key="index">
                        <td>{{log.created_at | moment("dddd, MMMM Do YYYY, h:mm:ss a")}}</td>
                        <td>{{log.updated_at | moment("dddd, MMMM Do YYYY, h:mm:ss a")}}</td>
                        <td>{{log.time_stepped}} hour(s)</td>
                        <td v-if="paymentType == 1">&#8369; {{log.pays}}</td>
                    </tr>
                </tbody>
                <tbody v-else>
                    <tr><td colspan="100" class="text-center">No Result</td></tr>
                </tbody>
            </table>
            <template #header>
                <h6 class="modal-title">Custom smaller modal title</h6>
                <CButtonClose @click="openModal = false" class="text-white"/>
            </template>
            <template #footer>
                <CButton @click="openModal = false" color="danger">Discard</CButton>
                <CButton  color="success">End Contract</CButton>
            </template>
        </CModal>
    </div>
</template>
<script>
import db from '../../../db';
import globalMixins from '../../../mixins/globalMixins';

export default {
    mixins:[globalMixins],
    data(){
        return {
            hasData:false,
            hasData1:false,
            employee:[],
            show:{
                isShown:true,
                type:null
            },
            show1:{
                isShown:true,
                type:null
            },
            openModal:false,
            logs:[],
            logId:null,
            paymentType:null
        }
    },
    mounted(){
        this.getEmployee();
        let firebase_not = db.database().ref("workforce/realtime_notif").orderByKey().limitToLast(1);
        firebase_not.on('value',snapshot => {
            const firedata = snapshot.val();
            this.getEmployee();
            let formdata = new FormData();
            formdata.append('id',this.logId,);
            var callback= (data) =>{
                this.show1.isShown = false;
                this.logs = data;
            }
            this.post(formdata, callback,'employee/getLogs')
        })
    },
    methods:{
        getEmployee(){
            let vm = this;
            let formdata = new FormData();
            formdata.append('jobId',this.$store.state.jobId);
            var callback= (data) =>{
                vm.employee = data.employee;
                vm.show.isShown = false;
                if (vm.employee.length != 0) {
                    vm.hasData = true
                }
            }
            this.post(formdata, callback,'employee/getEmployee')
        },
        getLogs(logId, type){
            this.show1.isShown = true;
            this.paymentType = type;
            this.logId = logId;
            this.openModal = true;
            let vm = this;
            let formdata = new FormData();
            formdata.append('id',logId);
            var callback= (data) =>{
                vm.show1.isShown = false;
                this.logs = data;
                console.log(data.length);
                if (data.length != 0) {
                    vm.hasData1 = true
                }
            }
            this.post(formdata, callback,'employee/getLogs')
        }
    }
}
</script>
<style scoped>

</style>