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
                </CTab>
                <CTab title="Company Info">
                    <CRow class="p-3">
                        <CCol sm="6">
                            <CInput
                            label="Company Name"
                            placeholder="Enter Company Name"
                            v-model="form.company_name"
                            />
                        </CCol>
                        <CCol sm="6">
                            <CInput
                            label="Company Address"
                            placeholder="Enter Company Address"
                            v-model="form.company_address"
                            />
                        </CCol>
                    </CRow>
                    <CRow class="p-3">
                        <CCol sm="4">
                            <div class="py-2">
                                <span v-for="(cc,index) in form.company_contact" :key="index" class="badge badge-info">{{cc}} <a href="#"> <i class="fas fa-times-circle"></i> </a> </span>
                            </div>
                            <div>
                                <CInput
                                    placeholder="Contact Number"
                                    description="Enter atleast 1"
                                    v-model="input.company_contact"
                                    >
                                    <template #append>
                                        <CButton type="submit" @click="addContact()" color="primary">Add</CButton>
                                    </template>
                                </CInput>
                            </div>
                        </CCol>
                        <CCol sm="4">
                            <div class="py-2">
                                <span v-for="(cc,index) in form.company_email" :key="index" class="badge badge-info">{{cc}} <a href="#"> <i class="fas fa-times-circle"></i> </a> </span>
                            </div>
                            <div>
                                <CInput
                                placeholder="Email Address"
                                description="Enter atleast 1"
                                v-model="input.company_email"
                                >
                                <template #append>
                                    <CButton type="submit" @click="addEmail()" color="primary">Add</CButton>
                                </template>
                            </CInput>
                            </div>
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

export default {
    mounted(){
        this.getProfile()
    },
    mixins:[GlobalMixins],
    data(){
        return{
            tab:0,
            isLoading:true,
            profile:[],
            onLoad:false,
            isFirstTime:false,
            form:{
                fname:'',
                lname:'',
                contact:[],
                email:[],
                address:'',
                company_name:'',
                company_address:'',
                company_contact:[],
                company_email:[],
                id:this.$store.state.login.id
            },
            input:{
                contact:null,
                email:null,
                company_name:null,
                company_contact:null
            }
        }
    },
    methods:{
        changeTab(num){
            this.tab = num
        },
        saveProfile(){
            this.isLoading = true;
            var vm = this;
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

                vm.isLoading=false;
            }
            this.post(formdata,callback,'profile')
        },

        addContact(isPersonal = false){
            if (isPersonal) {
                this.form.contact.push(this.input.contact);
                this.input.contact = null;
            }else{
                this.form.company_contact.push(this.input.company_contact)
                this.input.company_contact = null;
            }
        },

        addEmail(isPersonal = false){
            if (isPersonal) {
                this.form.email.push(this.input.email);
                this.input.email = null;
            }else{
                this.form.company_email.push(this.input.company_email)
                this.input.company_email = null;
            }
        }
    }
}
</script>
<style scoped>

</style>