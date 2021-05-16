<template>
  <router-view></router-view>
</template>

<script>

export default {
  name: 'App',
}
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style lang="scss">
  // Import Main styles for this application
  @import 'assets/scss/style';
</style>

<style >
:root{
    --background :#f1f7fd;
    --dominant :#2577B5;
    --accent:#1E669E;
    --white:#fff;
    --lightgray:#8D9498;
    --darkgray:#595D60;
    --hover:#efefef;
    --acc1:#168AAD;
    --acc2:#6BBABC;

    --success:#5cb85c;
    --danger:#d9534f;

    --gradient1:linear-gradient(146deg, rgba(37,119,181,1) 0%, rgba(27,90,138,1) 87%);
}

.chatDiv{
    min-height: 260px;
    max-height: 250px;
    height: 100%;
    overflow-y: auto;
    position: relative;
}

.requiredSpan{
  color:red;
  font-weight: bold;
  font-size: 1rem;
}
</style>