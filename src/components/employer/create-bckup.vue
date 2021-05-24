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
                <li class="nav-item">
                    <a class="nav-link" href="#" @click="changeTab(2)">Job Settings</a>
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
                                label="Level"
                                :value.sync="form.level"
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
                <div v-if="tab == 2" class="col-12 p-4">
                    <div class="row p-3">
                        <div class="col-3">
                            <div class="form-group ">
                                <label class=" col-form-label" for="text-input">Job Type
                                    <span class="requiredSpan">*</span>
                                </label>
                                <select v-model="form.jobType" class="form-control">
                                    <option selected hidden>Please select</option>
                                    <option value="1">Fulltime</option>
                                    <option value="2">Contractual</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="row p-3">
                        <div class="col-md-3">
                            <div class="form-group row">
                                <label class="col-md-3 col-form-label">Work Days</label>
                                <div class="col-md-9 col-form-label">
                                    <div class="form-check">
                                    <input @click="workdaysChange(22)" v-model="form.workdays" value="22" class="form-check-input" checked="checked" type="radio" >
                                    <label class="form-check-label" for="radio1">Monday to Friday</label>
                                    </div>
                                    <div class="form-check">
                                    <input @click="workdaysChange(26)" v-model="form.workdays" value="26"   class="form-check-input" type="radio" >
                                    <label class="form-check-label" for="radio2">Monday To Saturday</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row p-3">
                        <div class="col-3">
                            <div v-if='form.jobType == 1' class="form-group ">
                                <label class=" col-form-label" for="text-input">Salary Type
                                    <span class="requiredSpan">*</span>
                                </label>
                                <select v-model="form.salaryType" class="form-control">
                                    <option selected hidden>Please select</option>
                                    <option value="1">Monthly Fixed Salary</option>
                                    <option value="2">Daily Basis Salary</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    
                    <div v-if="form.jobType == 1" class="row p-3">
                        <div v-if="form.salaryType == 2" class="col-3">
                            <div  class="form-group ">
                                <label class=" col-form-label" for="text-input">Minimum wage per Day
                                    <span class="requiredSpan">*</span>
                                </label>
                                <div class="">
                                    <input  class="form-control" id="text-input" type="number" min="534" name="text-input" v-model="form.minimum" placeholder="Enter Firstname">
                                    <span class="help-block"></span>
                                </div>
                            </div>
                        </div>
                        <div v-if="form.salaryType == 1" class="col-3">
                            <div class="form-group ">
                                <label class=" col-form-label" for="text-input">Minimum wage per Month (534 Manila Standard)
                                    <span class="requiredSpan">*</span>
                                </label>
                                <div class="">
                                    <input class="form-control" type="number" v-model="form.monthlyMin" placeholder="Enter Monthly Minimum ">
                                    <span class="help-block"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="row p-3">
                        <div class="col-3">
                            <div class="form-group ">
                                <label class=" col-form-label" for="text-input">Start Shift
                                    <span class="requiredSpan">*</span>
                                </label>
                                <div class="">
                                    <datetime type="time" format="hh:mm a"  v-model="form.startShift" use12-hour></datetime>
                                </div>
                            </div>
                        </div>
                        <div class="col-3">
                            <div class="form-group ">
                                <label class=" col-form-label" for="text-input">End Shift
                                    <span class="requiredSpan">*</span>
                                </label>
                                <div class="">
                                    <datetime type="time" format="hh:mm a" v-model="form.endShift" use12-hour></datetime>
                                </div>
                            </div>
                        </div>
                    </div>
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
                salaryType:null,
                monthlyMin:0,
                minimum:534,
                startShift:null,
                endShift:null,
                workDays:22
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
            settings:{
                minimum:534,
                monthlyMin:0,
            }
        }
    },
    methods:{
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
        },

        workdaysChange(value){
            this.form.workDays = value;
            this.form.monthlyMin = 534 * value
        },

        
    }
}
</script>
<style scoped>

</style>
