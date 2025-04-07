<template>

  <!-- <el-radio-group v-model="isCollapse" default-active="1">
    <el-radio-button :value="false">功能列表</el-radio-button>
    <el-radio-button :value="true">隐藏</el-radio-button>
  </el-radio-group> -->

<logo></logo>
<el-menu
  router
  background-color="#FAFAD2"
  default-active="1"
  class="el-menu-vertical-demo"
  :collapse="menu_status"
>

  <el-menu-item index="/user_manage">
    <el-icon> <Tools /> </el-icon>
    <template #title>用户管理</template>
  </el-menu-item>
   <el-menu-item index="/category">
    <el-icon><Menu /></el-icon>
    <template #title>菜品分类</template>
  </el-menu-item>
  <el-menu-item index="/dish_manage">
    <el-icon><Menu /></el-icon>
    <template #title>菜品管理</template>
  </el-menu-item>
  <el-menu-item index="/order_manage">
    <el-icon><Monitor /></el-icon>
    <template #title>订单管理</template>
  </el-menu-item>
  <el-menu-item index="/statistic">
    <el-icon><Histogram /></el-icon>
    <template #title>统计分析</template>
  </el-menu-item>
  <el-menu-item index="/comment_manage">
    <el-icon><Edit /></el-icon>
    <template #title>评论管理</template>
  </el-menu-item>
</el-menu>


</template>

<script setup lang="ts">
import { computed } from 'vue';
import logo from './logo.vue';
import {collapseStore} from '../store/flexmenu/index'
import { Menu } from '@element-plus/icons-vue';
import { Monitor } from '@element-plus/icons-vue';
import { Edit } from '@element-plus/icons-vue';
import { Tools } from '@element-plus/icons-vue';
import { Histogram } from '@element-plus/icons-vue';

//菜单收缩
const temp_status = collapseStore()
const menu_status = computed(()=>{
  return temp_status.getCollapse
})
</script>

<style scoped>

/* 为 Radio Group 添加样式 */

.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
    background-color: rgb(250, 250, 210); /* 菜单背景色 */
}

.el-menu {
    border-right: none;
}

.el-menu .el-menu-item {
    color: black; /* 黑色文字 */
    font-size: 15px;
    font-weight: bold;
}

.el-menu-item.is-active {
    color: black; /* 选中时的文字颜色 */
    background-color: rgb(220, 220, 180) !important; /* 选中时背景颜色加深 */
}

/* 鼠标移到菜单的颜色 */
:deep(.el-menu-item:hover) {
    background-color: rgb(220, 220, 180) !important; /* 鼠标悬停时背景颜色加深 */
}

</style>
