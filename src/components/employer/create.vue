<template>
    <CCard>
        <CCardHeader>
            Create Job

            <div class="card-header-actions">
                <a @click.prevent="saveJob()" href="#">
                    <i class="fas fa-save"></i>
                    Create Job
                </a>
            </div>
        </CCardHeader>
        <CCardBody>
            <CTabs>
                <CTab title="Job Details" >
                    <CRow class="p-3">
                        <CCol sm="6">
                            <CInput
                            label="Job Title"
                            placeholder="Title"
                            description="Required"
                            v-model="form.title"
                            />
                        </CCol>
                        <CCol sm="3">
                            <CInput
                            label="Payment"
                            placeholder="Payment"
                            description="Required"
                            v-model="form.pay"
                            />
                        </CCol>
                        <CCol sm="3">
                            <CSelect
                                label="Level"
                                size="lg"
                                v-model="form.level"
                                horizontal
                                :options="selectOptions"
                                placeholder="Please select"
                            />
                        </CCol>
                        
                    </CRow>

                    <hr>

                    <CRow class="p-3">
                        <CCol sm="12">
                            <label for="">Description</label>
                            <vue-editor :editorToolbar="customToolbar" v-model="form.desc"></vue-editor>
                        </CCol>
                    </CRow>
                    <CRow class="p-3">
                        <CCol sm="12">
                            <label for="">Requirements</label>
                            <vue-editor :editorToolbar="customToolbar" v-model="form.req"></vue-editor>
                        </CCol>
                    </CRow>
                </CTab>
                <CTab title="Invite Freelancers">
                    <h4>ERROR - no css found</h4>
                </CTab>
            </CTabs>
        </CCardBody>
        <Loader :show="isLoading"/>
    </CCard>
</template>
<script>
import { VueEditor } from "vue2-editor";
import globalMixins from '../../mixins/globalMixins';


export default {
    
    components:{
        VueEditor,
    },
    mixins:[globalMixins],
    data(){
        return{
            selectOptions: [
                { 
                value: 0, 
                label: 'No Experience'
                },
                { 
                value: 1, 
                label: 'Entry Level'
                },
                { 
                value: 2, 
                label: 'Junior Level'
                },
                { 
                value: 3, 
                label: 'Senior Level'
                }
                
            ],
            form:{
                id:this.$store.state.login.id ,
                value: [
                    { name: 'Javascript', code: 'js' }
                ],
                title:'',
                pay:'',
                desc:'',
                req:'',
                level:'',
                freelancer:[],
                id:this.$store.state.login.id,
                role:this.$store.state.login.role
            },
            freelancer:[],
            options: [
                { name: 'Vue.js', code: 'vu' },
                { name: 'Javascript', code: 'js' },
                { name: 'Open Source', code: 'os' }
            ],
            customToolbar: [[{ list: "ordered" }, { list: "bullet" }]],
            tab:0,
            showProfile:false,
            freelancerModal:[],
            isLoading:false,
        }
    },
    methods:{
        showTheError(){
            this.show = true;
            let vm = this;
            setTimeout(function () {
                vm.show = false
            }, 4500);
        },
        addTag(newTag) {
            const tag = {
                name: newTag,
                code: newTag.substring(0, 2) + Math.floor((Math.random() * 10000000)),
                rating:0
            }
            this.options.push(tag)
            this.form.value.push(tag)
        },
        changeTab(num){
            this.tab = num;
            if (this.tab==1) {
                let vm = this;
                var formdata = new FormData();
                var level = (this.form.level == '')?0:this.form.level;
                formdata.append('level',level);
                formdata.append('skill',JSON.stringify(this.form.value));
                let callback = (data)=>{
                    console.log(data.user);
                    vm.freelancer = data.user
                }
                this.post(formdata,callback,'employee/filteredFreelancer')
            }
        },
        saveJob(){
            this.isLoading= true;
            let vm = this;
            let callback = (data)=>{
                if (data.data.length != 0 || data. data.length != null) {
                    vm.isLoading= false;
                    vm.$toast.open({
                        message: 'Job Created',
                        type: 'success',
                    });
                    setTimeout(function(){
                    vm.$router.push({ name: 'EmpJobList' })
                    },3000)
                    
                }
            }
            this.post(this.form,callback,'employee/create_job')
        },
        getFreelancer(){
            let vm = this;
            var callback= (data) =>{
                vm.freelancer = data.data
            }
            this.post([], callback,'employee/getFreelancer');
        },
        inviteFreelancer(id){
            this.form.freelancer.push(id);
            this.showProfile = false
        },
        cancelInvite(id){
            let index = this.form.freelancer.indexOf(id);
            this.form.freelancer.splice(index, 1);
            this.showProfile = false
        },
        showProfileModal(id){
            let vm = this;
            let formdata = new FormData();
            formdata.append('id', id);
            formdata.append('single', true);
            var callback= (data) =>{
                vm.freelancerModal = data.data[0]
            }
            this.post(formdata, callback,'employee/getFreelancer');
            this.showProfile = true
        }
    }
}
</script>
<style scoped>

</style>
