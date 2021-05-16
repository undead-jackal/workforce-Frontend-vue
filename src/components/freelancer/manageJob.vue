<template>
    <div>
        <CRow>
            <CCol col="12" sm="6" lg="3">
                <div class="card">
                    <div class="card-body p-3 d-flex align-items-center">
                      <div class="bg-warning px-2 py-1 mfe-3" style="font-size:1.3rem">
                        <i class="fas fa-wallet"></i>
                      </div>
                      <div>
                        <div class="text-value text-primary">&#8369; {{details['payment']}}</div>
                        <div class="text-muted text-uppercase font-weight-bold small">Total Payout</div>
                      </div>
                    </div>
                </div>
            </CCol>
            <CCol col="12" sm="6" lg="3">
                <div class="card">
                    <div class="card-body p-3 d-flex align-items-center">
                      <div class="bg-warning px-2 py-1 mfe-3" style="font-size:1.3rem">
                        <i class="fas fa-clock"></i>
                      </div>
                      <div>
                        <div class="text-value text-primary">{{details.totalHours}} hour(s)</div>
                        <div class="text-muted text-uppercase font-weight-bold small">Total Hour(s)</div>
                      </div>
                    </div>
                </div>
            </CCol>
            <CCol col="12" sm="6" lg="3">
                <div class="card">
                    <div class="card-body p-3 d-flex align-items-center">
                      <div class="bg-warning px-2 py-1 mfe-3" style="font-size:1.3rem">
                        <i class="fas fa-stopwatch"></i>
                      </div>
                      <div>
                        <div class="text-value text-primary">{{time}}</div>
                        <div class="text-muted text-uppercase font-weight-bold small">Rendering Time</div>
                      </div>
                    </div>
                </div>
            </CCol>
        </CRow>
        <CRow>
            <CCol col="12" sm="12">
                    <CCard>
                        <CCardHeader>
                                TItle
                                <div class="card-header-actions">
                                    <button v-if="tab==0" @click="start(1)" class="btn btn-primary btn-sm">Start</button>
                                    <button v-if="tab==1" @click="stop(0)" class="btn btn-danger btn-sm">Stop</button>
                                </div>
                        </CCardHeader>
                        <CCardBody>
                            <PlaceholderTb :show="JSON.stringify(show)"/>
                            <table v-if="!show.isShown" class="table table-striped">
                                <thead>
                                    <th>Started</th>
                                    <th>Ended</th>
                                    <th>Rendered Time</th>
                                    <th v-if="details.paymentType == 1">Payout</th>
                                </thead>
                                <tbody v-if="hasData">
                                    <tr v-for="(log, index) in logs" :key="index">
                                        <td>{{log.created_at | moment("dddd, MMMM Do YYYY, h:mm:ss a")}}</td>
                                        <td>{{log.updated_at | moment("dddd, MMMM Do YYYY, h:mm:ss a")}}</td>
                                        <td>{{log.time_stepped}} hour(s)</td>
                                        <td v-if="details.paymentType == 1">&#8369; {{log.pays}}</td>
                                    </tr>
                                </tbody>
                                <tbody v-else>
                                    <tr><td colspan="100" class="text-center">No Result</td></tr>
                                </tbody>
                            </table>
                        </CCardBody>
                    </CCard>
            </CCol>
        </CRow>
    </div>
</template>
<script>
import db from '../../db'
import globalMixins from '../../mixins/globalMixins'
export default {
    mixins:[globalMixins],
    data(){
        return{
            hasData:false,
            selectChangeStatus: [
                { value: 0, label: 'Break'},
                { value: 1, label: 'Inprogress'},
                { value: 2, label: 'End Day'},
            ],
            form:{
                status:null
            },
            show:{
                isShown:true,
                type:null
            },
            logs:[],
            tab:this.$store.state.jobStatus,
            timeBegan : null,
            timeStopped : null,
            stoppedDuration : 0,
            started : null,
            running : false,
            time:'00:00:00.000',
            logId:null,
            details:[]
        }
    },
    beforeRouteEnter(to, from, next) {
        next(vm => {
            if (vm.$store.state.jobId == null) {
                next({name:"FreJob"});
            }else {
                next({name:'FreMyJob'});
            }
        });
    },
    beforeRouteLeave(to, from, next){
        var jobId = null;
        this.$store.commit('assignJobId', { jobId });
        next();
    },
    mounted(){
        this.getLogs();
    },
    methods:{
        getLogs(){
            var formdata = new FormData();
            formdata.append('job',this.$store.state.jobId);
            formdata.append('user',this.$store.state.login.id);
            let call = (data) =>{
                this.logs = data.logs;
                this.show.isShown = false;
                if (this.logs.length != 0) {
                    this.hasData = true;
                }
                this.details=data.details[0];
            }
            this.post(formdata, call, 'freelancer/getLogs');
        },

        start(num) {
            this.tab =num;
            var jobStatus = num;
            if(this.running) return;
            
            if (this.timeBegan === null) {
                this.reset();
                this.timeBegan = new Date();
            }

            if (this.timeStopped !== null) {
                this.stoppedDuration += (new Date() - this.timeStopped);
            }

            this.started = setInterval(this.clockRunning, 10);	
            this.running = true;

            this.$store.commit('updateJobStatus', { jobStatus });
            var formdata = new FormData();
            formdata.append('job',this.$store.state.jobId);
            formdata.append('user',this.$store.state.login.id);
            formdata.append('status', this.$store.state.jobStatus);
            formdata.append('time_stepped', null);
            let call = (data) =>{
                this.logId = data.id
            }
            this.post(formdata, call, 'freelancer/addLogStatus');
        },

        stop(num){
            this.tab= num;
            var jobStatus = num;
            this.$store.commit('updateJobStatus', { jobStatus });
            var formdata = new FormData();
            formdata.append('id',this.logId);
            formdata.append('status', this.$store.state.jobStatus);
            formdata.append('time_stepped', this.getRenderedTime(this.time));
            formdata.append('total_payout', (this.getRenderedTime(this.time) * this.details.hourlyRate).toFixed(2));
            formdata.append('empId',this.details.id);

            let call = (data) =>{
                this.getLogs();
                let notif = db.database().ref("workforce/realtime_notif");
                    var updates = [
                        {
                            id:data
                        },
                    ];
                    notif.push(updates);
            }
            this.post(formdata, call, 'freelancer/updateLog');
            this.reset();
        },

        getRenderedTime(time){
            var data = time.split('.')[0].split(':');
            var hours = parseInt(data[0]) + ((parseInt(data[1]) * 1)/60) + (parseInt(data[2])/3600);
            return hours.toFixed(4);
        },

        reset() {
            this.running = false;
            clearInterval(this.started);
            this.stoppedDuration = 0;
            this.timeBegan = null;
            this.timeStopped = null;
            this.time = "00:00:00.000";
        },
        clockRunning(){
        var currentTime = new Date()
        , timeElapsed = new Date(currentTime - this.timeBegan - this.stoppedDuration)
        , hour = timeElapsed.getUTCHours()
        , min = timeElapsed.getUTCMinutes()
        , sec = timeElapsed.getUTCSeconds()
        , ms = timeElapsed.getUTCMilliseconds();

        this.time = 
            this.zeroPrefix(hour, 2) + ":" + 
            this.zeroPrefix(min, 2) + ":" + 
            this.zeroPrefix(sec, 2) + "." + 
            this.zeroPrefix(ms, 3);
        },

        zeroPrefix(num, digit) {
            var zero = '';
            for(var i = 0; i < digit; i++) {
                zero += '0';
            }
            return (zero + num).slice(-digit);
        },

    }
}
</script>
<style scoped>

</style>