<template lang="html">
    <div v-if="showPlaceHolder" class="flexed-container">
        <CCard v-for="index in 6" :key="index" class="flexed-content">
            <CCardBody>
                <content-placeholders>
                <content-placeholders-heading :img="true" />
                <content-placeholders-text :lines="5" />
                </content-placeholders>
            </CCardBody>
        </CCard>

    </div>
</template>

<script>
export default {
    props:['show'],
    data(){
        return{
            showPlaceHolder:true,
            type:'jobs'
        }
    },
    watch:{
        show(newVal,oldVal){
            let data = JSON.parse(newVal)
            this.showPlaceHolder = data.isShown;
            this.type = data.type
        }
    }
}
</script>

<style lang="css" scoped>
    .flexed-container{
        display: flex;
        justify-content: center;
        flex-wrap: wrap;

    }
    .flexed-content{
        flex:0 0 25%;
        margin:30px;
    }
</style>
