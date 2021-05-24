<template>
  <div class="d-flex align-items-center min-vh-100">
    <CContainer fluid>
      <CRow class="justify-content-center">
        <CCol md="6">
          <CCard class="mx-4 mb-0">
            <CCardBody class="p-4">

              <CForm>
                <h1>Register </h1>
                <p class="text-muted">Create your account</p>
                <p class="requiredSpan">{{form.fname.error_msg[0]}}</p>
                <CInput
                  placeholder="Firstname"
                  v-model="form.fname.val"
                >
                  <template #prepend-content><CIcon name="cil-user"/></template>
                </CInput>
                <p class="requiredSpan">{{form.lname.error_msg[0]}}</p>
                <CInput
                  placeholder="Lastname"
                  v-model="form.lname.val"
                >
                  <template #prepend-content><CIcon name="cil-user"/></template>
                </CInput>
                <p class="requiredSpan">{{form.username.error_msg[0]}}</p>
                <CInput
                  placeholder="Username"
                  v-model="form.username.val"
                >
                  <template #prepend-content><CIcon name="cil-user"/></template>
                </CInput>
                <p class="requiredSpan">{{form.email.error_msg[0]}}</p>
                <CInput
                  placeholder="Email"
                  prepend="@"
                  v-model="form.email.val"
                />
                <p class="requiredSpan">{{form.password.error_msg[0]}}</p>
                <CInput
                  placeholder="Password"
                  type="password"
                  v-model="form.password.val"
                >
                  <template #prepend-content><CIcon name="cil-lock-locked"/></template>
                </CInput>
                <p class="requiredSpan">{{form.conpass.error_msg[0]}}</p>

                <CInput
                  placeholder="Repeat password"
                  type="password"
                  v-model="form.conpass.val"
                  class="mb-4"
                >
                  <template #prepend-content><CIcon name="cil-lock-locked"/></template>
                </CInput>
                <div class="pb-4">
                  <label for="">Role</label>
                  <select v-model="form.role.val"  class="form-control">
                    <option value="" selected="selected" hidden="hidden"> Please select </option>
                    <option value="0"> Freelancer </option>
                    <option value="1"> Coordinator </option>
                    <option value="2"> Employer </option>
                  </select>
                </div>
                <p class="requiredSpan">{{form.role.error_msg[0]}}</p>

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
              username:{
                val:null,
                    error:false,
                    error_msg:[],
                    rules:{
                        required:true,
                    }
              },
              password:{
                val:null,
                    error:false,
                    error_msg:[],
                    rules:{
                        required:true,
                    }
              },
              conpass:{
                val:null,
                    error:false,
                    error_msg:[],
                    rules:{
                        required:true,
                        isMatch:"password"
                    }
              },
              email:{
                val:null,
                    error:false,
                    error_msg:[],
                    rules:{
                        required:true,
                    }
              },
              role:{
                val:null,
                    error:false,
                    error_msg:[],
                    rules:{
                        required:true,
                    }
              }
          },
      }
  },
  methods:{
      register(){
          this.isLoading=true;
          let formdata = new FormData();
          formdata.append('username',this.form.username.val);
          formdata.append('password',this.form.password.val);
          formdata.append('email',this.form.email.val);
          formdata.append('fname',this.form.fname.val);
          formdata.append('lname',this.form.lname.val);
          formdata.append('role',this.form.role.val);
          
          if (this.validate(this.form).status) {
            this.isLoading=false;
            this.form = this.validate(this.form).obj_ret;
            console.log(this.form);
          }else{
            var vm = this;
            let callback = (data) =>{
                if (data.status) {
                    vm.login(this.form.username,this.form.password);
                }
            }
            this.post(formdata,callback,'register');
          }

          console.log(this.form.fname.error_msg[0]);
      },
      login(){
          this.globalLogin(this.form.username.val,this.form.password.val);
      },
  }
}
</script>
