import axios from './../axios-instance'
import {Cloudinary} from 'cloudinary-core';

export default{
    data(){
        return{
            baseUrl:"",
            chatMixin:[],
            listChatsMixin:[],
            triggerMe:true,
            notificationCount:0,
            firstLogin:false,
            profileProgressMixin:0,
            dateToday:new Date()
        }
    },
    methods:{
        checkCompleted(){
            var calcProgress = JSON.parse(this.$store.state.userSetting.profileStat);
            var vm = this;
            var total = 0;
            Object.keys(calcProgress).map(function(key, index) {
                if (calcProgress[key] == 1) {
                    total = total + 25;
                }
            });
            this.profileProgressMixin= total;
            vm.$store.commit('updateSetting', ['userSetting',{profileProgress:this.profileProgressMixin}]);

        },
        postImage(data, callback, to){
            axios.post(this.baseUrl+to, data, data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then((response) => {
                callback(response.data);
            }, (error) => {
                console.log(error);
            });
        },
        post(data, callback, to){
            axios.post(this.baseUrl+to, data)
            .then((response) => {
                callback(response.data);
            }, (error) => {
                console.log(error);
            });
        },

        role(role){
            if (role === 0) {
                this.$router.push({ name: 'freelancer' })
            }
            if (role === 1) {
                this.$router.push({ name: 'coordinator' })
            }
            if (role === 2) {
                this.$router.push({ name: 'employer' })
            }
        },
        send(key, message, id){
            let formdata = new FormData();
            formdata.append('key',key);
            formdata.append('message',message);
            formdata.append('id',id);

            let vm = this;
            let callback = (data) =>{
                vm.getChat(key);
                vm.triggerMe=false;
            }
            this.post(formdata,callback,'recordChat');
        },
        getChat(key){
            let formdata = new FormData();
            formdata.append('key',key);
            let vm = this;
            let callback = (data) =>{
                vm.chatMixin = data;
                vm.triggerMe=false;
            }
            this.post(formdata,callback,'getChat');
        },
        getListChats(id){
            let formdata = new FormData();
            let vm = this;
            formdata.append('id',id);
            let callback = (data)=>{
                vm.listChatsMixin = data
            }
            this.post(formdata, callback, 'getListChats');
        },
        countNotification(){
            var formdata = new FormData();
            formdata.append('isLatest', true);
            formdata.append('id', this.$store.state.login.id);
            let callback = (data)=>{
                var notificationCount = data.length;
                this.$store.commit('countNotification', { notificationCount });
                this.notificationCount = this.$store.state.notificationCount;
            }
            this.post(formdata, callback, 'getNotification');
        },
        getNotification(id){
            var returnData = [];
            var formdata = new FormData();
            formdata.append('id', id);
            let callback = (data)=>{
                returnData = data;
            }
            this.post(formdata, callback, 'getNotification');
            return returnData;
        },
        checkSchedules(){
            
        },
        getSchedules(job){
            var formdata = new FormData();
            formdata.append('user', this.$store.state.login.id);

            let callback = (data)=>{
                console.log(data);
            }
            this.post(formdata, callback, 'checkSchedule');
        },
        getTimeForm(dateY){
            var date = new Date(dateY); 
            return date.getTime(); 
        },
        globalLogin(user,pass){
            let formdata = new FormData();
                formdata.append('username',user);
                formdata.append('password',pass);
                let callback = (data) =>{
                    var vm = this;
                    console.log(data);
                    if(data.status){
                        var login = {
                            token:data.data.logintoken,
                            role:data.data.role,
                            id:data.data.id,
                            isLoggedIn:true,
                            name:data.data.fname +" "+data.data.lname,
                            profileStatus:data.data.profileStatus,
                        }
                        var profile = data.data.profile;
                        vm.$store.commit('activateLogin', { login });
                        vm.$store.commit('updateProfile', { profile });
                        console.log(data.data.manual + " " +data.data.profileStats);
                        vm.$store.commit('updateSetting', ['userSetting',{manual:data.data.manual}]);
                        vm.$store.commit('updateSetting', ['userSetting',{profileStat:data.data.profileStats}]);
                        vm.checkCompleted();
                        if (data.data.role == 0) {
                            if(this.$store.state.userSetting.profileStats !=100 ){
                                vm.$router.push({ name: 'FreProfile' })
                            }else{
                                vm.$router.push({ name: 'freelancer' })
                            }
                        }
                        if (data.data.role == 1) {
                            if(data.data.profileStatus !=3 ){
                                // vm.$router.push({ name: 'CoorProfile' })
                            }else{
                                vm.$router.push({ name: 'coordinator' })
                            }
                        }
                        if (data.data.role == 2) {
                            if(data.data.profileStatus !=3 ){
                                console.log("lol");
                                vm.$router.push({ name: 'EmpProfile' })
                            }else{
                                vm.$router.push({ name: 'employer' })
                            }
                        }
                    }
                };
                this.post(formdata,callback,'login');
        },
        validate(form){
            console.log(form);
            let obj = form;
            var ret = false;
            var returner = [];
            Object.keys(obj).map(function(key, index) {
                obj[key].error_msg = [];
                Object.keys(obj[key].rules).map(function(ruleName, ruleIndex) {
                    switch (ruleName) {
                        case "required":
                            if (obj[key].rules[ruleName] == true) {
                                if (obj[key].val == null) {
                                    ret = true;
                                    obj[key].error = true;
                                    obj[key].error_msg.push("This Field must not be empty");
                                }else{
                                    if(obj[key].val.length == 0){
                                        ret = true;
                                        obj[key].error = true;
                                        obj[key].error_msg.push("This Field must not be empty");
                                    }
                                }
                            }
                            break;
                        case "min":
                            if (obj[key].val != null) {
                                if (obj[key].val.length<=obj[key].rules[ruleName]) {
                                    ret = true;
                                    obj[key].error = true;
                                    obj[key].error_msg.push("This Field must not be less than" +obj[key].rules[ruleName]);
                                }
                            }
                            break;
                        case "max":
                            if (obj[key].val != null) {
                                if (obj[key].val.length>=obj[key].rules[ruleName]) {
                                    ret = true;
                                    obj[key].error = true;
                                    obj[key].error_msg.push("This Field must not exceed" +obj[key].rules[ruleName]);
                                }
                            }
                            break;
                        case "isAlphaNumeric":
                            if (obj[key].rules[ruleName] == true) {
                                var letter = /[a-zA-Z]/; 
                                var number = /[0-9]/;
                                var valid = number.test(obj[key].val) && letter.test(obj[key].val);
                                if (!valid) {
                                    ret = true;
                                    obj[key].error = true;
                                    obj[key].error_msg.push("This Field must contain Numbers and Letter");
                                }
                            }
                            break;
                        case "hasUpperCase":
                            if (obj[key].rules[ruleName] == true) {
                                var hasCaps = /[A-Z]/; 
                                var valid = hasCaps.test(obj[key].val);
                                if (!valid) {
                                    ret = true;
                                    obj[key].error = true;
                                    obj[key].error_msg.push("This Field must contain an Uppercase");
                                }
                            }
                            break;
                        case "isMatch":
                            var valueName = String(obj[key].rules[ruleName]);
                            if (obj[valueName].val != obj[key].val) {
                                ret = true;
                                obj[key].error = true;
                                obj[key].error_msg.push("This Field must contain match " + valueName);
                            }
                            break;
                        case "hasSpecChar":
                            var regex = /[!@#$%^&*]/;
                            if (obj[key].rules[ruleName] == "required") {
                                if (!regex.test(obj[key].val)) {
                                    ret = true;
                                    obj[key].error = true;
                                    obj[key].error_msg.push("This Field must contain one special characters");
                                }
                            }else if(obj[key].rules[ruleName] == "not_allowed"){
                                if (regex.test(obj[key].val)) {
                                    ret = true;
                                    obj[key].error = true;
                                    obj[key].error_msg.push("This Field must not contain any special characters");
                                }
                            }
                            break;
                        default:
                            break;
                    }
                })
            });
            return returner = {
                obj_ret:obj,
                status:ret
            };
        }
    }
}
