<template>
    <CCard>
        <CCardHeader>
            My Profile

            <div class="card-header-actions">
                <a @click.prevent="saveProfile()" href="#">
                    <i class="fas fa-save"></i>
                    Update
                </a>
            </div>
        </CCardHeader>
        <CCardBody>
            <CTabs>
                <CTab title="Personal Information" >
                    <CRow class="p-3">
                        <CCol sm="6">
                            <CInput
                            label="Firstname"
                            placeholder="Firstname"
                            description="Required"
                            v-model="form.fname"
                            />
                        </CCol>
                        <CCol sm="6">
                            <CInput
                            label="Lastname"
                            placeholder="Lastname"
                            description="Required"
                            v-model="form.lname"
                            />
                        </CCol>
                    </CRow>

                    <CRow class="p-3">
                        <CCol sm="12">
                            <CInput
                            label="Address"
                            placeholder="Enter Full Address"
                            description="Required"
                            v-model="form.address"
                            />
                        </CCol>
                    </CRow>

                    <CRow class="p-3">
                        <CCol sm="3">
                            <CInput
                            label="SSS"
                            placeholder="Enter SSS #"
                            description="Required"
                            v-model="form.sss"
                            />
                        </CCol>
                        <CCol sm="3">
                            <CInput
                            label="PhilHealth"
                            placeholder="Enter PhilHealth #"
                            description="Required"
                            v-model="form.phi"
                            />
                        </CCol>
                        <CCol sm="3">
                            <CInput
                            label="TIN"
                            placeholder="Enter tin #"
                            description="Required"
                            v-model="form.tin"
                            />
                        </CCol>
                        <CCol sm="3">
                            <CInput
                            label="Pagibig"
                            placeholder="Enter Pagibig #"
                            description="Required"
                            v-model="form.pag"
                            />
                        </CCol>
                    </CRow>
                    <hr>

                    <CRow class="p-3">
                        <CCol sm="4">
                            <div class="py-2">
                                <span v-for="(cont,index) in form.contact" :key="index" class="badge badge-info">{{cont}} <a href="#"> <i class="fas fa-times-circle"></i> </a> </span>
                            </div>
                            <div>
                                <CInput
                                    placeholder="Contact Number"
                                    v-model="input.contact"
                                    description="Enter atleast 1"
                                    >
                                    <template #append>
                                        <CButton type="submit" @click="addContact(true)" color="primary">Add</CButton>
                                    </template>
                                </CInput>
                            </div>
                        </CCol>
                        <CCol sm="4">
                            <div class="py-2">
                                <span v-for="(cont,index) in form.email" :key="index" class="badge badge-info">{{cont}} <a href="#"> <i class="fas fa-times-circle"></i> </a> </span>
                            </div>
                            <div>
                                <CInput
                                placeholder="Email Address"
                                description="Enter atleast 1"
                                v-model="input.email"
                                >
                                <template #append>
                                    <CButton type="submit" @click="addEmail(true)" color="primary">Add</CButton>
                                </template>
                            </CInput>
                            </div>
                        </CCol>
                    </CRow>

                    <hr>

                    
                </CTab>
                <CTab title="Employement History">
                    
                </CTab>
                <CTab title="Work History">
                    N/A
                </CTab>
                <CTab title="Training And Certificate">
                    
                </CTab>
            </CTabs>
        </CCardBody>
        <Loader :show="isLoading"/>
    </CCard>
</template>
<script>
import GlobalMixins from './../../mixins/globalMixins'

export default {
    mounted(){
        this.getProfile()
    },
    mixins:[GlobalMixins],
    data(){
        return{
            isLoading:true,
            tab:0,
            profile:[],
            isFirstTime:false,
            form:{
                level:'',
                fname:'',
                lname:'',
                contact:[],
                email:[],
                address:'',
                sss:'',
                pag:'',
                tin:'',
                phi:'',
                education:[],
                language:[],
                employment:[],
                training:[],
                skills: [
                ],
                id:this.$store.state.login.id
            },
            input:{
                contact:null,
                email:null,
            },
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
        }
    },
    methods:{
        openModal(id) {
            this.$bvModal.show(id)
        },
        changeTab(num){
            this.tab = num
        },
        saveProfile(){
            var vm = this;
            vm.isLoading=true;
            let callback = (data) => {
                if (data == 1) {
                    vm.isFirstTime=false;
                    vm.getProfile();
                }
                vm.isLoading=false;
                vm.$toast.open({
                    message: 'Profile Updated',
                    type: 'success',
                });
            }
            this.post(this.form,callback,'employee/updateProfile');
        },

        getProfile(){
            this.isLoading = true;
            let formdata = new FormData();
            let vm = this;
            formdata.append('id',this.$store.state.login.id);
            let callback = (data)=>{
                console.log(data);
                vm.profile = data.data;

                if (data.data.status == 0) {
                    vm.isFirstTime = true;
                    vm.form.fname = data.data.fname;
                    vm.form.lname = data.data.lname;
                }else {
                    vm.form.fname = data.data.fname;
                    vm.form.lname = data.data.lname;
                    vm.form.contact = JSON.parse(data.data.contacts);
                    vm.form.email = JSON.parse(data.data.emails);
                    vm.form.address = data.data.address;
                    vm.form.company_name = data.data.company;
                    vm.form.company_address = data.data.company_address;
                    vm.form.company_contact = JSON.parse(data.data.company_contact);
                    vm.form.company_email = JSON.parse(data.data.company_email);
                }
            }
            vm.isLoading=false;
            this.post(formdata,callback,'profile')
        },

        addContact(){
            this.form.contact.push(this.input.contact);
            this.input.contact = null;
        },

        addEmail(){
            this.form.email.push(this.input.email);
            this.input.email = null;
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
            this.form.employment.push(data);
            this.history.company =  '';
            this.history.duration =  '';
            this.history.position =  '';
        },
    }
}
</script>
<style scoped>

</style>