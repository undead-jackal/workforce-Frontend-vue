import Vue from 'vue'
import Router from 'vue-router'
import Store from './../store'

// Containers
const TheContainer = () => import('@/containers/TheContainer')

//Locals
const Login =() => import('@/components/pages/login') 
const Register =() => import('@/components/pages/register') 
const Home =() => import('@/components/Home') 

//Employer
const EmpDashboard =() => import('@/components/employer/dashboard') 
const EmpJobList =() => import('@/components/employer/joblist') 
const EmpManage =() => import('@/components/employer/manage') 
const EmpProfile =() => import('@/components/employer/profile') 
const EmpCreate =() => import('@/components/employer/create') 

//Freelancer
const FreDashboard =() => import('@/components/freelancer/dashboard') 
const FreFindJob =() => import('@/components/freelancer/findjob') 
const FreMyApplication =() => import('@/components/freelancer/myapplications') 
const FreProfile =() => import('@/components/freelancer/profile') 
const FreMessengers =() => import('@/components/freelancer/messenger') 

//Coordinator
const CorDashboard =() => import('@/components/coordinator/dashboard') 

Vue.use(Router)

export default new Router({
  mode: 'history', // https://router.vuejs.org/api/#mode
  linkActiveClass: 'active',
  scrollBehavior: () => ({ y: 0 }),
  routes: configRoutes()
})

function navGuard(role, designated, next){
  if (Store.state.login.isLoggedIn) {
      if(role == designated){
        next()
      }else if(role == 0){
        next({name:'freelancer'})
      }else if(role == 1){
        next({name:'coordinator'})
      }else if(role == 2){
        next({name:'employer'})
      };
  }else{
      next({name:'Login'})
  }
}

function configRoutes () {
  return [
    {
      path: '/e',
      redirect: '/e/dashboard',
      name: 'employer',
      component: TheContainer,
      beforeEnter(to, from, next){navGuard(Store.state.login.role,2,next);},
      children: [
        {
          path: 'dashboard',
          name: 'EmpDashboard',
          component: EmpDashboard,
        },
        {
          path: 'job',
          name: 'EmpJobList',
          component: EmpJobList,
        },
        {
          path: 'manage',
          name: 'EmpManage',
          component: EmpManage,
        },
        {
          path: 'create',
          name: 'EmpCreate',
          component: EmpCreate,
        },
        {
          path: 'profile',
          name: 'EmpProfile',
          component: EmpProfile,
        },
      ]
    },
    {
      path: '/f',
      redirect: '/f/dashboard',
      name: 'freelancer',
      component: TheContainer,
      beforeEnter(to, from, next){navGuard(Store.state.login.role,0,next);},
      children: [
        {
          path: 'dashboard',
          name: 'FreDashboard',
          component: FreDashboard,
        },
        {
          path: 'findjob',
          name: 'FreFindJob',
          component: FreFindJob,
        },
        {
          path: 'application',
          name: 'FreMyApplication',
          component: FreMyApplication,
        },
        {
          path: 'profile',
          name: 'FreProfile',
          component: FreProfile,
        },
        {
          path: 'messenger',
          name: 'FreMessengers',
          component: FreMessengers,
        },
      ]
    },
    {
      path: '/c',
      redirect: '/c/dashboard',
      name: 'coordinator',
      component: TheContainer,
      beforeEnter(to, from, next){navGuard(Store.state.login.role,1,next);},
      children: [
        {
          path: 'dashboard',
          name: 'CorDashboard',
          component: CorDashboard,
        },

      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },

    {
      path: '/register',
      name: 'Register',
      component: Register,
    },
    {
      path: '/',
      name: 'Home',
      component: Home,
    }
  ]
}

