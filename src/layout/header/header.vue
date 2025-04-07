
<template>
  <div class="header_style">
    <flexmenu></flexmenu>
    <Naviinfo></Naviinfo>
  </div>
  <rightside></rightside>
</template>

<script setup lang="ts">
import Naviinfo from './navitag.vue'
import flexmenu from './flexmenu.vue';
import rightside from './rightside.vue';
</script>

<style scoped>
.header_style{
  background-color: rgb(250,250,210);
    display: flex;
    align-items: center;
}
</style>