<template>
  <el-breadcrumb class="m_bred" separator="/">
    <!-- 遍历动态生成面包屑项 -->
    <el-breadcrumb-item
      v-for="(item, index) in breadcrumbs"
      :key="index"
    >
      {{ item.meta.title }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>


<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";

// 获取当前路由
const route = useRoute();

// 计算面包屑数据
const breadcrumbs = computed(() => {
  // 返回包含 meta 数据的匹配路由
  return route.matched.filter((item) => item.meta && item.meta.title);
});
</script>




<style scoped lang="scss">

  :deep(.el-breadcrumb__inner) {
    color: black !important;
  }
  .m_bred {
    margin-left: 15px;
  }

</style>


