<template>
    <CCard>
        <CCardHeader>
                TItle
        </CCardHeader>
        <CCardBody>
            <div class="row">
                <div class="col-4">
                    <ul>
                        <li>
                            <a v-for="(intchat,index) in listChatsMixin" :key="index" @click.prevent="openModal('chatMessenger',intchat.key)" class="btn btn-sm btn-primary" type="button" href="#">{{intchat.key}}</a>
                        </li>
                    </ul>
                </div>
                <div class="col-8">
                    <div class="chat-header">

                    </div>
                    <div class="chat-body">
                        <div class="chatDiv" v-chat-scroll>
                            <div v-for="(ch,index) in chatMixin" :key="index" class="">
                                <div v-if="ch.user != user" class="">
                                    <span class="badge badge-info">{{ch.user}} : </span>
                                    <span><p>{{ch.message}}</p></span>
                                </div>
                                <div v-else  class="">
                                    <span class="badge badge-warning">{{ch.user}} : </span>
                                    <span><p>{{ch.message}}</p></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="chat-footer">
                        <CInput
                            placeholder="Send Message"
                            v-model="message"
                            description="Enter atleast 1"
                            >
                                    <template #append>
                                        <CButton type="submit" @click="stateSend()" color="primary">Send</CButton>
                                    </template>         
                        </CInput>
                    </div>
                </div>
            </div>
        </CCardBody>
    </CCard>
</template>
<script>
import GlobalMixins from './../../mixins/globalMixins'
import db from './../../db'

export default {
    data(){
        return{
            message:'',
            keyChat:'',
            user:this.$store.state.login.id
        }
    },
    mounted(){
        this.getListChats(this.$store.state.login.id);
        let firebase_not = db.database().ref("workforce/notify").orderByKey().limitToLast(1);
        firebase_not.on('value',snapshot => {
            console.log(this.triggerMe);
            console.log('firebase_updated');
            const data = snapshot.val();
            Object.keys(data).forEach(keys => {
                this.getChat(data[keys][0].key);
            })
        })
    },
    mixins:[GlobalMixins],
    methods:{
        openModal(id, key){
            // this.$bvModal.show(id);
            this.keyChat = key;
            this.getChat(this.keyChat);
        },
        stateSend(){
            console.log(this.keyChat);
            this.send(this.keyChat, this.message, this.user);
            this.message="";
            let notif = db.database().ref("workforce/notify");
                var updates = [
                    {changes:true,key:this.keyChat},
                ];
            notif.push(updates);
        },
    }
}
</script>
<style scoped>
.chat-header{
    
}
.chat-body{
    min-height: 300px;
    max-height: 300px;
    overflow: auto;
}
.chat-footer{

}
</style>