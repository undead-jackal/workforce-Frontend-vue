<template>
    <CCard>
        <CCardHeader>
            My Profile
            <div class="card-header-actions">
                <a @click.prevent="saveProfile()" href="#">
                    <i class="fas fa-save"></i>
                    Update
                </a>
                <a @click.prevent="" href="#">
                    <i class="fas fa-eye"></i>
                    View as resume
                </a>
            </div>
        </CCardHeader>
        <CCardBody>
            <CAlert v-if="this.$store.state.userSetting.profileProgress != 100"  show color="warning">
                <h4 class="alert-heading">Almost Finish</h4>
                <p>
                    Current Profile Progress {{this.$store.state.userSetting.profileProgress + " %"}}
                </p>
            </CAlert>
            <CTabs>
                <CTab title="Cover Letter">
                    <vue-editor :editorToolbar="customToolbar" v-model="form.cover.val"></vue-editor>
                </CTab>
                <CTab title="Profile Picture">
                    <div class="c-avatar preview">
                        <img :src="image" class="c-avatar-img ">
                    </div>
                    <CInputFile
                        label="File input"
                        @change="upload"
                    />
                    <button @click="saveProfileImage">save profile</button>
                </CTab>
                <CTab title="Personal Information" >
                    <CRow class="p-3">
                        <CCol sm="6">
                            <div class="form-group ">
                                <label class=" col-form-label" for="text-input">Firstname
                                    <span class="requiredSpan">*</span>
                                </label>
                                <div class="">
                                    <input v-model="form.fname.val" class="form-control" id="text-input" type="text" name="text-input" placeholder="Enter Firstname">
                                    <span class="help-block"></span>
                                </div>
                            </div>
                        </CCol>
                        <CCol sm="6">
                            <div class="form-group ">
                                <label class=" col-form-label" for="text-input">Lastname
                                    <span class="requiredSpan">*</span>
                                </label>
                                <div class="">
                                    <input v-model="form.lname.val" class="form-control" id="text-input" type="text" name="text-input" placeholder="Enter Lastname">
                                    <span class="help-block"></span>
                                </div>
                            </div>
                        </CCol>
                    </CRow>

                    <CRow class="p-3">
                        <CCol sm="12">
                            <div class="form-group ">
                                <label class=" col-form-label" for="text-input">Enter Address
                                    <span class="requiredSpan">*</span>
                                </label>
                                <div class="">
                                    <input v-model="form.address.val" class="form-control" id="text-input" type="text" name="text-input" placeholder="Enter Full Address">
                                    <span class="help-block"></span>
                                </div>
                            </div>
                        </CCol>
                    </CRow>

                    <CRow class="p-3">
                        <CCol sm="3">
                            <div class="form-group ">
                                <label class=" col-form-label" for="text-input">Enter SSS</label>
                                <div class="">
                                    <input v-model="form.sss.val" class="form-control" id="text-input" type="text" name="text-input" placeholder="Enter SSS #">
                                    <span class="help-block"></span>
                                </div>
                            </div>
                        </CCol>
                        <CCol sm="3">
                            <div class="form-group ">
                                <label class=" col-form-label" for="text-input">Enter PhilHealth</label>
                                <div class="">
                                    <input v-model="form.phi.val" class="form-control" id="text-input" type="text" name="text-input" placeholder="Enter PhilHealth #">
                                    <span class="help-block"></span>
                                </div>
                            </div>
                        </CCol>
                        <CCol sm="3">
                            <div class="form-group ">
                                <label class=" col-form-label" for="text-input">Enter TIN</label>
                                <div class="">
                                    <input v-model="form.tin.val" class="form-control" id="text-input" type="text" name="text-input" placeholder="Enter tin #">
                                    <span class="help-block"></span>
                                </div>
                            </div>
                        </CCol>
                        <CCol sm="3">
                            <div class="form-group ">
                                <label class=" col-form-label" for="text-input">Enter Pagibig</label>
                                <div class="">
                                    <input v-model="form.pag.val" class="form-control" id="text-input" type="text" name="text-input" placeholder="Enter Pagibig #">
                                    <span class="help-block"></span>
                                </div>
                            </div>
                        </CCol>
                    </CRow>
                    <hr>

                    <CRow class="p-3">
                        <CCol sm="4">
                            <div class="form-group ">
                                <label class=" col-form-label" for="text-input">Contact</label>
                                <div class="">
                                    <input v-model="form.contacts.val" class="form-control" id="text-input" type="text" name="text-input" placeholder="Enter Phone number">
                                    <span class="help-block"></span>
                                </div>
                            </div>
                        </CCol>
                        <CCol sm="4">
                            <div class="form-group ">
                                <label class=" col-form-label" for="text-input">Email</label>
                                <div class="">
                                    <input v-model="form.emails.val" class="form-control" id="text-input" type="text" name="text-input" placeholder="Enter Email">
                                    <span class="help-block"></span>
                                </div>
                            </div>
                        </CCol>
                    </CRow>
                    <hr>
                </CTab>
                <CTab title="Employement History">
                    <CRow>
                        <CCol col="12">{{this.form.employment.val}}</CCol>
                    </CRow>
                    <CRow class="p-3">
                        <CCol col="2">
                            <div class="form-group ">
                                <label class=" col-form-label" for="text-input">Company
                                    <span class="requiredSpan">*</span>
                                </label>
                                <div class="">
                                    <input v-model="history.company" class="form-control" id="text-input" type="text" name="text-input" placeholder="Enter Firstname">
                                    <span class="help-block"></span>
                                </div>
                            </div>
                        </CCol>
                        <CCol col="2">
                            <div class="form-group ">
                                <label class=" col-form-label" for="text-input">Duration
                                    <span class="requiredSpan">*</span>
                                </label>
                                <div class="">
                                    <input v-model="history.duration" class="form-control" id="text-input" type="text" name="text-input" placeholder="Enter Firstname">
                                    <span class="help-block"></span>
                                </div>
                            </div>
                        </CCol>
                        <CCol col="2">
                            <div class="form-group ">
                                <label class=" col-form-label" for="text-input">Position
                                    <span class="requiredSpan">*</span>
                                </label>
                                <div class="">
                                    <input v-model="history.position" class="form-control" id="text-input" type="text" name="text-input" placeholder="Enter Firstname">
                                    <span class="help-block"></span>
                                </div>
                            </div>
                        </CCol>
                        <CCol col="2">
                            <button @click="addEmployment" style="margin: 10% 0rem;" class="btn btn-primary">Add Employment</button>
                        </CCol>
                    </CRow>
                </CTab>
                <CTab title="Skill">
                    <CRow class="p-3">
                        <CCol class="" col="12">
                            <multiselect v-model="form.skills.val" tag-placeholder="Add this as new tag" placeholder="Search or add a tag" label="name" track-by="code" :options="options" :multiple="true" :taggable="true" @tag="addTag"></multiselect>
                        </CCol>
                    </CRow>
                </CTab>
                <CTab title="Work History">
                    N/A
                </CTab>
                <CTab title="Training And Certificate">
                    N/A
                </CTab>
                <CTab title="Resume">
                    <CRow class="p-3">
                        <CCol col="3">
                            <CRow>
                                <CCol col="12">
                                    {{}}
                                </CCol>
                            </CRow>
                            <CRow>
                                <CCol col="12">
                                    Address Adresss Adresss
                                </CCol>
                            </CRow>
                            <CRow>
                                <CCol col="12">
                                    092137123123
                                </CCol>
                            </CRow>
                            <CRow>
                                <CCol col="12">
                                    enricke@gmail
                                </CCol>
                            </CRow>
                        </CCol>
                    </CRow>
                    <CRow class="pl-3">
                        <CCol col="5">
                            <CRow>
                                <CCol col="2">
                                    Birthdate :
                                </CCol>
                                <CCol col="4" class="text-left" >
                                    Jan 31 1998
                                </CCol>
                            </CRow>
                            <CRow>
                                <CCol col="2">
                                    Age :
                                </CCol>
                                <CCol col="4" class="text-left" >
                                    23 yrs old
                                </CCol>
                            </CRow>
                            <CRow>
                                <CCol col="2">
                                    Religion :
                                </CCol>
                                <CCol col="4" class="text-left" >
                                    Roman Catholic
                                </CCol>
                            </CRow>
                            <!-- <CRow>
                                <CCol col="2">
                                    Religion :
                                </CCol>
                                <CCol col="4" class="text-left" >
                                    Roman Catholic
                                </CCol>
                            </CRow> -->
                        </CCol>
                    </CRow>
                    <CRow class="pl-3 mt-4">
                        <CCol col="6">
                            <CRow>
                                <CCol col="2">
                                    <b>Skills</b>
                                </CCol>
                            </CRow>
                            <CRow>
                                <CCol col="2">
                                    Vuejs
                                </CCol>
                                <CCol col="4">
                                    
                                </CCol>
                            </CRow>
                            <CRow>
                                <CCol col="2">
                                    Vuejs
                                </CCol>
                                <CCol col="4">
                                    
                                </CCol>
                            </CRow>
                        </CCol>
                    </CRow>

                    <CRow class="pl-3 mt-4">
                        <CCol col="6">
                            <CRow>
                                <CCol col="2">
                                    <b>Employement</b>
                                </CCol>
                            </CRow>
                            <CRow>
                                <CCol col="12">
                                    Centraliy
                                    <CRow>
                                        <CCol col="12">
                                            Backend Programmer - 2years
                                        </CCol>
                                    </CRow>
                                </CCol>
                            </CRow>
                            <CRow>
                                <CCol col="12">
                                    Centraliy
                                    <CRow>
                                        <CCol col="12">
                                            Backend Programmer - 2years
                                        </CCol>
                                    </CRow>
                                </CCol>
                            </CRow>
                        </CCol>
                    </CRow>

                </CTab>
            </CTabs>
        </CCardBody>
        <Loader :show="isLoading"/>
        
    </CCard>
</template>
<script>
import GlobalMixins from './../../mixins/globalMixins'
import { VueEditor } from "vue2-editor";
export default {
    components:{
        VueEditor,
    },
    mounted(){
        this.getProfile();
        this.checkCompleted();
    },
    mixins:[GlobalMixins],
    data(){
        return{
            customToolbar: [[{ list: "ordered" }, { list: "bullet" }]],
            isLoading:true,
            tab:0,
            profile:[],
            isFirstTime:false,
            form:{
                cover:{
                    val:null,
                    error:false,
                    error_msg:[],
                    rules:{
                        required:true,
                    }
                },
                level:{
                    val:null,
                    error:false,
                    error_msg:[],
                    rules:{
                        required:true,
                    }
                },
                fname:{
                    val:null,
                    error:false,
                    error_msg:[],
                    rules:{
                        required:true,
                    }
                },
                lname:{
                    val:null,
                    error:false,
                    error_msg:[],
                    rules:{
                        required:true,
                    }
                },
                contacts:{
                    val:'',
                    error:false,
                    error_msg:[],
                    rules:{
                        required:true,
                    }
                },
                emails:{
                    val:'',
                    error:false,
                    error_msg:[],
                    rules:{
                        required:true,
                    }
                },
                address:{
                    val:'',
                    error:false,
                    error_msg:[],
                    rules:{
                        required:true,
                    }
                },
                sss:{
                    val:null,
                    error:false,
                    error_msg:[],
                    rules:{
                        required:true,
                    }
                },
                pag:{
                    val:null,
                    error:false,
                    error_msg:[],
                    rules:{
                        required:true,
                    }
                },
                tin:{
                    val:null,
                    error:false,
                    error_msg:[],
                    rules:{
                        required:true,
                    }
                },
                phi:{
                    val:null,
                    error:false,
                    error_msg:[],
                    rules:{
                        required:true,
                    }
                },
                education:{
                    val:[],
                    error:false,
                    error_msg:[],
                    rules:{
                        required:true,
                    }
                },
                language:{
                    val:[],
                    error:false,
                    error_msg:[],
                    rules:{
                        required:true,
                    }
                },
                employment:{
                    val:[],
                    error:false,
                    error_msg:[],
                    rules:{
                        required:true,
                    }
                },
                training:{
                    val:[],
                    error:false,
                    error_msg:[],
                    rules:{
                        required:true,
                    }
                },
                skills: {
                    val:[],
                    error:false,
                    error_msg:[],
                    rules:{
                        required:true,
                    }
                },
                value: [
                    { name: 'Javascript', code: 'js' }
                ],
            },
            profileWarnings:[],
            // input:{
            //     contact:null,
            //     email:null,
            // },
            edu:{
                university:'',
                course:''
            },
            lang:{
                name:'',
                lvl:''
            },
            history:{
                company:'',
                duration:'',
                position:'',
            },
            options: [
                { name: 'Vue.js', code: 'vu' },
                { name: 'Javascript', code: 'js' },
                { name: 'Open Source', code: 'os' }
            ],
            image:this.$store.state.profile,
            imagePost:null,
            profileProgress:(this.$store.state.userSetting.profileProgress == null) ? 0 : this.$store.state.userSetting.profileProgress
        }
    },
    methods:{
        testForm(){
            console.log(this.$store.state.login.id);
        },
        
        upload(e){
            var files = e;
            if (!files.length)
                return;
            var reader = new FileReader();
            var vm = this;
            reader.onload = (e) => {
                vm.image = e.target.result;
            };
            reader.readAsDataURL(files[0]);
            this.imagePost=files[0];
        },
        saveProfileImage() {
            var formData = new FormData();
            console.log(this.$store.state.userSetting.profileStat);
            formData.append("file", this.imagePost);
            formData.append("id", this.$store.state.login.id);
            formData.append("profileSet", this.$store.state.userSetting.profileStat)
            var vm = this;
            let callback = (data) => {
                var profile = data.data
                vm.$store.commit('updateProfile', { profile });
                vm.$store.commit('updateSetting', ['userSetting',{profileStat:data.newUserSet}]);
                vm.checkCompleted();
            }
            this.postImage(formData, callback,"uploadImage");
        },
        openModal(id){
            this.$bvModal.show(id)
        },
        changeTab(num){
            this.tab = num
        },
        saveProfile(){
            var vm = this;
            vm.isLoading=true;
            var formdata = new FormData();
            formdata.append("id", this.$store.state.login.id)
            formdata.append("profileSet", this.$store.state.userSetting.profileStat)

            Object.keys(vm.form).map(function(key, index) {
                if (key == 'skills' || key == 'employment') {
                    formdata.append(key,JSON.stringify(vm.form[key].val))
                }else{
                    formdata.append(key, vm.form[key].val)
                }
            });
            let callback = (data) => {
                console.log(data);
                if (data.status) {
                    vm.isFirstTime=false;
                    vm.getProfile();
                }
                vm.isLoading=false;
                vm.$store.commit('updateSetting', ['userSetting',{profileStat:data.newUserSet}]);
                vm.checkCompleted();
                vm.$toast.open({
                    message: 'Profile Updated',
                    type: 'success',
                });
            }
            this.post(formdata,callback,'updateProfile');
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
        getProfile(){
            this.isLoading = true;
            let formdata = new FormData();
            let vm = this;
            formdata.append('id',this.$store.state.login.id);
            let callback = (data)=>{
                vm.profile = data.data;
                Object.keys(vm.form).map(function(key, index) {
                    var value = data.data[key];
                    if (value == undefined ) {
                        if (key == "cover") {
                            value = data.data["description"];
                        }else if(key == "id"){
                            value = data.data["credential"]
                        }
                    }
                    if (value == null) {
                        if (key == "skills" || key == "employment") {
                            value = [];
                        }else{
                            value =''
                        }
                    }else if(key == "skills" || key == "employment"){
                        value = JSON.parse(data.data[key])
                    }
                    vm.form[key].val = value;
                });
            }
            vm.isLoading=false;
            console.log(vm.form);
            this.post(formdata,callback,'profile')
        },

        insertEducat(){
            var data = {
                name:this.edu.university,
                cour:this.edu.course
            };
            this.form.education.push(data);
            this.edu.university = "";
            this.edu.course="";
        },

        insertLang(){
            var data = {
                name:this.lang.name,
                level:this.lang.lvl
            };
            this.form.language.push(data);
            this.lang.name = "";
            this.lang.lvl="";
        },

        addEmployment(){
            var data = {
                company:this.history.company,
                duration:this.history.duration,
                position:this.history.position,
            };
            this.form.employment.val.push(data);
            this.history.company =  '';
            this.history.duration =  '';
            this.history.position =  '';
        },
        resumeView(){
            
        }
    }
}
</script>
<style scoped>
.preview{ 
    width: 150px;
    height: 150px;
}
</style>