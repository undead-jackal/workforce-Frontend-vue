<template>
    <div v-if="isLoading" class="onload">
            <fade-loader :loading="'loading'" :color="'#2577B5'"></fade-loader>
    </div>
</template>
<script>
import FadeLoader from 'vue-spinner/src/FadeLoader.vue'

export default {
    props:['show'],
    data(){
        return{
            isLoading:false
        }
    },
    components:{
        FadeLoader
    },
    watch:{
        show(newVal,oldVal){
            this.isLoading = newVal
        }
    }
}
</script>
<style scoped>
    .onload{
        position: sticky;
        bottom: 0;
        left: 0;
        background: #24242479;
        width: 100%;
        height: 100px;
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>