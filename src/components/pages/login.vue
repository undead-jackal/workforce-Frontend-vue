<template>
    <div class="c-app flex-row align-items-center">
        <CContainer>
            <CRow class="justify-content-center">
                <CCol md="8">
                    <CCardGroup>
                        <CCard class="p-4">
                            <CCardBody>
                                <CForm>
                                    <h1>Login</h1>
                                    <p class="text-muted">Sign In to your account</p>
                                    <CInput
                                    placeholder="Username"
                                    autocomplete="username email"
                                    v-model="form.username"
                                    >
                                    <template #prepend-content><CIcon name="cil-user"/></template>
                                    </CInput>
                                    <CInput
                                    placeholder="Password"
                                    type="password"
                                    autocomplete="curent-password"
                                    v-model="form.password"
                                    >
                                    <template #prepend-content><CIcon name="cil-lock-locked"/></template>
                                    </CInput>
                                    <CRow>
                                    <CCol col="6" class="text-left">
                                        <CButton color="primary" @click="login()" class="px-4">Login</CButton>
                                    </CCol>
                                    <CCol col="6" class="text-right">
                                        <CButton color="link" class="px-0">Forgot password?</CButton>
                                        <CButton color="link" class="d-lg-none">Register now!</CButton>
                                    </CCol>
                                    </CRow>
                                </CForm>
                            </CCardBody>
                        </CCard>
                        <CCard
                        color="primary"
                        text-color="white"
                        class="text-center py-5 d-md-down-none"
                        body-wrapper
                        >
                            <CCardBody>
                            <h2>Sign up</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                <CButton
                                color="light"
                                variant="outline"
                                size="lg"
                                @click="$router.push({ name: 'Register' })"
                                >
                                Register Now!
                                </CButton>
                            </CCardBody>
                        </CCard>
                    </CCardGroup>
                </CCol>
            </CRow>
        </CContainer>
    </div>
</template>

<script>
import GlobalMixins from './../../mixins/globalMixins'
export default {
    name: 'Login',
    data(){
        return{
            form:{
                username:'',
                password:''
            }
        }
    },
    beforeRouteEnter(to, from, next) {
        next(vm => {
            if (vm.$store.state.login.isLoggedIn) {
                next({name:'employer'});
            }else {
                next();
            }
        });
    },
    mixins:[GlobalMixins],
    methods:{
        login(){
            this.globalLogin(this.form.username,this.form.password);
            this.form.username = ''
            this.form.password = ''
        },
    }
}
</script>
