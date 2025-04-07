

<template>
  <el-container class="layout">
    <el-aside :class="menu_status ? 'collapsed' : 'expanded'">
      <m_menu></m_menu>
    </el-aside>
    <el-container>
      <el-header class="header">
        <m_header></m_header>
      </el-header>
      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { collapseStore } from "../store/flexmenu/index";
import m_menu from "./menu.vue";
import m_header from "./header/header.vue";

// 菜单收缩状态
const temp_status = collapseStore();
const menu_status = computed(() => temp_status.getCollapse);
</script>

<style scoped lang="scss">
.layout {
  height: 100%;
}

.aside {
  background-color: #fafad2;
  transition: width 0.1s ease-in-out; /* 添加过渡动画 */
}

.collapsed {
  width: 60px; /* 折叠后的宽度，匹配 Logo 宽度 */
  background-color: #fafad2;
}

.expanded {
  width: 200px; /* 展开的正常宽度 */
  background-color: #fafad2;
}

.header {
  background-color: rgb(250,250,210);
  display: flex;
  align-items: center;
  border-bottom: 1px solid #d8dce5 !important;
  justify-content: space-between;
}

.main {
  background-color: #f2f2efe1;
}
</style>


