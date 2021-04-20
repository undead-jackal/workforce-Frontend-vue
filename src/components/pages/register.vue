<template>
  <div class="d-flex align-items-center min-vh-100">
    <CContainer fluid>
      <CRow class="justify-content-center">
        <CCol md="6">
          <CCard class="mx-4 mb-0">
            <CCardBody class="p-4">
              <CForm>
                <h1>Register</h1>
                <p class="text-muted">Create your account</p>
                <CInput
                  placeholder="Firstname"
                  v-model="form.fname"
                >
                  <template #prepend-content><CIcon name="cil-user"/></template>
                </CInput>
                <CInput
                  placeholder="Lastname"
                  v-model="form.lname"
                >
                  <template #prepend-content><CIcon name="cil-user"/></template>
                </CInput>
                <CInput
                  placeholder="Username"
                  v-model="form.username"
                >
                  <template #prepend-content><CIcon name="cil-user"/></template>
                </CInput>
                <CInput
                  placeholder="Email"
                  prepend="@"
                  v-model="form.email"
                />
                <CInput
                  placeholder="Password"
                  type="password"
                  autocomplete="new-password"
                  v-model="form.password"
                >
                  <template #prepend-content><CIcon name="cil-lock-locked"/></template>
                </CInput>
                <CInput
                  placeholder="Repeat password"
                  type="password"
                  autocomplete="new-password"
                  class="mb-4"
                >
                  <template #prepend-content><CIcon name="cil-lock-locked"/></template>
                </CInput>
                <div class="pb-4">
                  <label for="">Role</label>
                  <select v-model="form.role"  class="form-control">
                    <option value="" selected="selected" hidden="hidden"> Please select </option>
                    <option value="0"> Freelancer </option>
                    <option value="1"> Coordinator </option>
                    <option value="2"> Employer </option>
                  </select>
                </div>
               
                <CButton @click="register" color="success" block>Create Account</CButton>
              </CForm>
            </CCardBody>
            <CCardFooter class="p-4">
              <!-- <CRow>
                <CCol col="6">
                  <CButton block color="facebook">
                    Facebook
                  </CButton>
                </CCol>
                <CCol col="6">
                  <CButton block color="twitter">
                    Twitter
                  </CButton>
                </CCol>
              </CRow> -->
            </CCardFooter>
          </CCard>
        </CCol>
      </CRow>
      <Loader :show="isLoading"/>
    </CContainer>
  </div>
</template>
<script>
import globalMixins from '../../mixins/globalMixins';

export default {
  name: 'Register',
  mixins:[globalMixins],
  data(){
      return{
          isLoading:false,
          selectOptions: [
                { 
                value: 0, 
                label: 'Freelancer'
                },
                { 
                value: 1, 
                label: 'Coordinator'
                },
                { 
                value: 2, 
                label: 'Employer'
                },
            ],
          form:{
              fname:'',
              lname:'',
              username:'',
              password:'',
              conpass:'',
              email:'',
              role:''
          },
      }
  },
  methods:{
      register(){
          this.isLoading=true;
          let formdata = new FormData();
          formdata.append('username',this.form.username);
          formdata.append('password',this.form.password);
          formdata.append('email',this.form.email);
          formdata.append('fname',this.form.fname);
          formdata.append('lname',this.form.lname);
          formdata.append('role',this.form.role);
          var vm = this;
          let callback = (data) =>{
              if (data.status) {
                  vm.login(this.form.username,this.form.password);
              }
          }
          this.post(formdata,callback,'register');
      },
      login(user,pass){
          let formdata = new FormData();
          formdata.append('username',user);
          formdata.append('password',pass);
          let callback = (data) =>{
              var vm = this;
              if(data.status){
                  var login = {
                      token:data.data.logintoken,
                      role:data.data.role,
                      id:data.data.id,
                      isLoggedIn:true,
                      name:data.data.fname +" "+data.data.lname
                  }
                  
                  vm.$store.commit('activateLogin', { login });
                  if (data.data.role == 0) {vm.isLoading = false;vm.$router.push({ name: 'freelancer' })}
                  if (data.data.role == 1) {vm.isLoading = false;vm.$router.push({ name: 'coordinator' })}
                  if (data.data.role == 2) {vm.isLoading = false;vm.$router.push({ name: 'EmpProfile' })}
              }
          };
          this.post(formdata,callback,'login');
      },
  }
}
</script>
