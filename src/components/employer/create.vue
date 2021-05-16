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
            <ul class="nav nav-tabs">
                <li class="nav-item">
                    <a class="nav-link" href="#" @click="changeTab(0)">Job Details</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#" @click="changeTab(1)">Invite Freelancer</a>
                </li>
            </ul>
            <div class="row">
                <div v-if="tab == 0" class="col-12 p-4">
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
                            <CSelect
                                label="Job Type"
                                :value.sync="form.jobType"
                                :options="selectType"
                                placeholder="Please select"
                            />
                        </CCol>
                        <CCol sm="3">
                            <CSelect
                                label="Level"
                                :value.sync="form.level"
                                :options="selectOptions"
                                placeholder="Please select"
                            />
                        </CCol>
                    </CRow>
                    <CRow class="p-3">
                        <CCol sm="3">
                            <CSelect
                                label="Payment Type"
                                :value.sync="form.payType"
                                :options="selectPaytype"
                                placeholder="Please select"
                            />
                        </CCol>
                        <CCol sm="3">
                            <CInput
                                v-if="form.payType == 0"
                                label="Fixed Price Offer"
                                placeholder="Fixed Price"
                                description="Required"
                                v-model="form.fixedRate"
                            />
                            <CInput
                                v-if="form.payType == 1"
                                label="Hourly Rate"
                                placeholder="Hourly Amount"
                                description="Required"
                                v-model="form.hourlyRate"
                            />
                        </CCol>
                        <CCol sm="3">
                            <CInput
                                v-if="form.payType == 1"
                                label="Min Hour per Day"
                                placeholder="Daily minimum"
                                description="Required"
                                v-model="form.minHours"
                            />
                        </CCol>
                        <CCol sm="3">
                            <CInput
                                v-if="form.payType == 1"
                                label="Max Hour per Day"
                                placeholder="Daily maximum"
                                description="Required"
                                v-model="form.maxHours"
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
                    <CRow class="p-3">
                        <CCol sm="12">
                            <multiselect v-model="form.value" tag-placeholder="Add this as new tag" placeholder="Search or add a tag" label="name" track-by="code" :options="options" :multiple="true" :taggable="true" @tag="addTag"></multiselect>
                        </CCol>
                    </CRow>
                </div>
                <div v-if="tab == 1" class="col-12 p-4">
                    <PlaceholderTb :show="JSON.stringify(show)"/>
                    <table v-if="!show.isShown"  class="table table-striped">
                        <thead>
                            <th>Freelancer Name</th>
                            <th>Level</th>
                            <th>Rating</th>
                            <th></th>
                        </thead>
                        <tbody>
                            <tr v-for="(app, index) in freelancer" :key="index" class="">
                                <td>{{app.fname}} {{app.lname}}</td>
                                <td>
                                    <span v-if="app.level == 0" class="badge badge-info">No Experience</span>
                                    <span v-if="app.level == 1" class="badge badge-info">Entry Level</span>
                                    <span v-if="app.level == 2" class="badge badge-info">Junior Level</span>
                                    <span v-if="app.level == 3" class="badge badge-info">Senior Level</span>
                                </td>
                                <td>N/A</td>
                                <td>
                                    <span v-if="form.freelancer.includes(app.credential)" class="badge badge-success"><i class="fa fa-check"></i> Invitation Ready</span>
                                    <button  type="button" @click="showProfileModal(app.credential)" class="btn btn-sm btn-info">
                                        <i class="fas fa-eye"></i> Invite 
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </CCardBody>
        <CModal
            :show.sync="showProfile"
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
                <CButtonClose @click="showProfile = false" class="text-white"/>
            </template>
            <template #footer>
                <CButton color="danger">Discard</CButton>
                <CButton @click="inviteFreelancer(profile.credential)" color="success">Send Invite</CButton>
            </template>
        </CModal>
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
                { value: 0, label: 'No Experience'},
                { value: 1, label: 'Entry Level'},
                { value: 2, label: 'Junior Level'},
                { value: 3, label: 'Senior Level'}
            ],
            selectType: [
                { value: 0, label: 'Full-Time'},
                { value: 1, label: 'Part-Time'},
            ],
            selectPaytype:[
                { value: 0, label: 'Fixed'},
                { value: 1, label: 'Hourly'},
            ],
            form:{
                id:this.$store.state.login.id ,
                value: [
                    { name: 'Javascript', code: 'js' }
                ],
                title:'',
                desc:'',
                req:'',
                level:'',
                freelancer:[],
                id:this.$store.state.login.id,
                role:this.$store.state.login.role,
                payType:null,
                hourlyRate:0,
                fixedRate:0,
                minHours:0,
                maxHours:0,
                jobType:null,
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
            profile:[],
            isLoading:false,
            show1:{
                isShown:true,
                type:null
            },
            show:{
                isShown:false,
                type:null
            },
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
                vm.show.isShown = true;
                var formdata = new FormData();
                var level = (this.form.level == '')?0:this.form.level;
                formdata.append('level',level);
                formdata.append('skill',JSON.stringify(this.form.value));
                var callback= (data) =>{
                    vm.show.isShown = false;
                    vm.freelancer = data.user
                }
                this.post(formdata, callback,'employee/filteredFreelancer');
            }
        },
        payChange(){
            console.log(this.form.payType);
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
                    },2000)
                    
                }
            }
            this.post(this.form,callback,'employee/create_job')
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
            this.show1.isShown = true;
            let vm = this;
            let formdata = new FormData();
            formdata.append('id', id);
            formdata.append('single', true);
            var callback= (data) =>{
                vm.show1.isShown = false;
                vm.profile = data.data[0]
            }
            this.post(formdata, callback,'employee/getFreelancer');
            this.showProfile = true
        }
    }
}
</script>
<style scoped>

</style>
