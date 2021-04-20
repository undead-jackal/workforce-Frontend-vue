<template>
    <div>
        <PlaceholderDet :show="JSON.stringify(show)"/>
        <div v-if="!show.isShown">
            <pre >
                {{jobDetail}}
            </pre>
        </div>
    </div>
</template>
<script>
import GlobalMixins from './../../../mixins/globalMixins'

export default {
    mixins:[GlobalMixins],
    data(){
        return{
            jobDetail:[],
            show:{
                isShown:true,
                type:null
            }
        }
    },
    mounted(){
        this.getJobDetail()
    },
    methods:{
        getJobDetail(){
            let vm = this;
            let formdata = new FormData();
            formdata.append('jobId',this.$store.state.jobId);
            var callback= (data) =>{
                vm.show.isShown = false;
                vm.show.type="details";
                vm.jobDetail = data[0];
            }
            this.post(formdata, callback,'employee/getJobDetail')
        }
    }
}
</script>
<style scoped>

</style>