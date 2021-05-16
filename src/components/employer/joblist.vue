<template>
    <div class="main-row">
        <CRow class="p-4">
            <CCol class="col-12">
                <CButton @click="$router.push({ name: 'EmpCreate' })" block color="primary">Create Job</CButton>
            </CCol>
        </CRow>
        <Placeholder :show="JSON.stringify(show)"/>
        <div v-if="!show.isShown" class="flexed-container">
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
                    <CButton @click="goto(jobs.id)" block color="primary">Manage</CButton>
                </CCardFooter>
            </CCard>
        </div>
    </div>
</template>
<script>
import GlobalMixins from './../../mixins/globalMixins'

export default {
    data(){
        return{
            jobs:[],
            show:{
                isShown:true,
                type:null
            }
        }
    },
    mounted(){
        this.getJobs()
    },
    mixins:[GlobalMixins],
    methods:{
        getJobs(){
            let formdata = new FormData();
            let vm = this;
            formdata.append('id',this.$store.state.login.id);
            let callback = (data)=>{
                vm.jobs = data;
                vm.show.isShown = false;
                vm.show.type="jobs"
            }
            this.post(formdata, callback, 'employee/getJobs');
        },
        goto(jobId){
            this.$store.commit('assignJobId', { jobId });
            this.$router.push({ name: 'EmpManage' })
        }
    }
}
</script>
<style scoped>
.flexed-container{
    display: flex;
    justify-content: center;
    flex-wrap:wrap;
}
.flexed-content{
    flex:0 0 25%;
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