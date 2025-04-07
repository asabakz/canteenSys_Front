<template>
  <div>
     <el-button type = "primary" size="default" @click="dia_display"> 新增 </el-button>
  </div>

  <m_dia
  :title="m_dia_set.title"
  :visible="m_dia_set.visible"
  :height="m_dia_set.height"
  :width="m_dia_set.width"
  @onClose="onClose"
  @onConfirm="onConfirm">


    <template v-slot:content>
      测试
    </template>
  </m_dia>

  
</template>

<script setup lang="ts">
//弹窗
import add_user from '../user_manage/add_user.vue';
import m_dia from '../../components/Dialog_item.vue';
import m_Dialog from '../../hooks/m_Dialog.ts';
const {m_dia_set,onClose,onConfirm,dia_display} = m_Dialog();

</script>

<style scoped>
</style>
