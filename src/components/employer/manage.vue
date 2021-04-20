<template>
    <CCard>
        <CCardHeader>
                TItle
        </CCardHeader>
        <CCardBody>
            <ul class="nav nav-tabs">
                <li class="nav-item">
                    <a class="nav-link" href="#" @click="tab = 0">Details</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#" @click="tab = 1">Applicants</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#" @click="tab = 2">Interview</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#" @click="tab = 3">Employee</a>
                </li>
            </ul>
            <div class="row">
                <div v-if="tab == 0" class="col-12 p-4"><JobDetail/></div>
                <div v-if="tab == 1" class="col-12 p-4"><Applicants/></div>
                <div v-if="tab == 2" class="col-12 p-4"><Interview/></div>
                <div v-if="tab == 3" class="col-12 p-4"><Employee/></div>
            </div>
        </CCardBody>
    </CCard>
</template>
<script>
import GlobalMixins from './../../mixins/globalMixins'

import JobDetail from './manage/jobDetail'
import Employee from './manage/employee'
import Interview from './manage/interview'
import Applicants from './manage/applicants'

export default {
    components:{
        JobDetail,Employee,Interview,Applicants
    },
    mixins:[GlobalMixins],
    beforeRouteEnter(to, from, next) {
        next(vm => {
            if (vm.$store.state.jobId == null) {
                next({name:"EmpJobList"});
            }else {
                next({name:'EmpManage'});
            }
        });
    },
    beforeRouteLeave(to, from, next){
        var jobId = null;
        this.$store.commit('assignJobId', { jobId });
        next();
    },
    data(){
        return{
            tab:0
        }
    },  
    methods:{
        
    }
}
</script>
<style scoped>

</style>