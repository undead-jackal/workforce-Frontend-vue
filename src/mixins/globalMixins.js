import axios from './../axios-instance'
export default{
    data(){
        return{
            baseUrl:"",
            chatMixin:[],
            listChatsMixin:[],
            triggerMe:true,
        }
    },
    methods:{
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
    }
}
