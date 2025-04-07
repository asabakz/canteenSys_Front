<!-- <template>
  <el-icon style="cursor: pointer" :size="26" @click = "on_iconclick" >
    <component :is="status2 ? Fold: Expand "></component>
  </el-icon>
</template>

<script setup lang="ts">
import { computed } from "vue";
import {Expand} from '@element-plus/icons-vue'
import {Fold} from '@element-plus/icons-vue'
import { collapseStore } from '../../store/flexmenu/index';

const status1 = collapseStore()
const status2 = computed(()=>{
  return status1.getCollapse
})

const on_iconclick = ()=>{
  status1.setCollapse(!status1.collapse)
}
</script>

<style scoped>
</style> -->

<template>
  <el-icon style="cursor: pointer" :size="26" @click="toggleMenu">
    <component :is="menu_status ? Fold : Expand"></component>
  </el-icon>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { Expand, Fold } from "@element-plus/icons-vue";
import { collapseStore } from "../../store/flexmenu/index";

// 获取菜单折叠状态
const store = collapseStore();
const menu_status = computed(() => store.getCollapse);

const toggleMenu = () => {
  store.setCollapse(!store.getCollapse);
};
</script>
