<template>
    <CCard>
        <CCardHeader>
                TItle
        </CCardHeader>
        <CCardBody>
            <PlaceholderTb :show="JSON.stringify(show)"/>
            <table v-if="!show.isShown" class="table">
                <thead>
                    <th>Job ID</th>
                    <th>Job Title</th>
                    <th>Money Earned</th>
                    <th></th>
                </thead>
                <tbody v-if="hasData">
                    <tr v-for="(mJob, index) in myjobs" :key="index">
                        <td>{{mJob.title}}</td>
                        <td>{{mJob.totalHours}} hr(s)</td>
                        <th>&#8369; {{mJob.payment}}</th>
                        <th>
                            <button @click="manage(mJob.id)" class="btn btn-primary btn-sm">Manage Job</button>
                        </th>
                    </tr>
                </tbody>
                <tbody v-else>
                    <tr><td colspan="100" class="text-center">No Result</td></tr>
                </tbody>
            </table>
        </CCardBody>
    </CCard>
</template>
<script>
import globalMixins from '../../mixins/globalMixins'
export default {
    mixins:[globalMixins],
    data(){
        return{
            myjobs:[],
            hasData:false,
            show:{
                isShown:true,
                type:null
            },
        }
    },
    mounted(){
        this.getMyJob();
    },
    methods:{
        getMyJob(){
            let formdata = new FormData();
            formdata.append('id',this.$store.state.login.id);
            let callback = (data) => {
                this.show.isShown = false;
                this.myjobs = data;
                console.log(data.length);
                if (data.length != 0) {
                    this.hasData = true
                }
            };
            this.post(formdata, callback, 'freelancer/myJobs');
        },
        manage(jobId){
            this.$store.commit('assignJobId', { jobId });
            this.$router.push({ name: 'FreMyJob' })
        }
    }
}
</script>
<style scoped>

</style>