<template>
    <div v-if="showPlaceHolder" class="p-4">
            <content-placeholders>
            <content-placeholders-heading/>
            <content-placeholders-text :lines="5" />
            </content-placeholders>
    </div>
</template>
<script>
export default {
    props:['show'],
    data(){
        return{
            showPlaceHolder:true,
            type:null
        }
    },
    watch:{
        show(newVal,oldVal){
            let data = JSON.parse(newVal)
            this.showPlaceHolder = data.isShown;
            this.type = data.type
            console.log(this.type);
        }
    }
}
</script>
<style scoped>

</style>