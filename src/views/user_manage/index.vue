<template>
  <el-main>
     <el-form :model="listParm" ref="form" label-width="80px" :inline="true" size="normal">
       <el-form-item label="">
         <el-input v-model="listParm.user_name" placeholder="用户名："></el-input>
       </el-form-item>
       <el-form-item label="">
         <el-input v-model="listParm.phone_number" placeholder="电话号码："></el-input>
       </el-form-item>
       <el-form-item>
         <el-button :icon="Search" @click="Search_slog" class="custom-btn">搜索</el-button>
         <el-button :icon="Place" @click="Reset" class="custom-btn1">重置</el-button>
         <el-button :icon="Plus" @click="Add" class="custom-btn">立即创建</el-button>
         <el-button  class="custom-btn1">取消</el-button>
       </el-form-item>
     </el-form>
   
    <!-- userlist -->
        <el-table :height="form_height" :data="user_tablelist" border stripe>
      <el-table-column label="用户id" prop="userId" align = "center"></el-table-column>    
      <el-table-column label="用户名" prop="userName" align = "center"></el-table-column>
      <el-table-column label="性别" prop="sex" align = "center">
        <template #default="scope">
          <div v-if="scope.row.sex == '1'" size="default">女</div>
          <div v-if="scope.row.sex == '0'" size="default">男</div>
        </template>
      </el-table-column>
      <el-table-column label="电话" prop="phoneNumber" align = "center"></el-table-column>
      <el-table-column label="邮箱" prop="email" align = "center"></el-table-column>
      <el-table-column label="UD"  align = "center">
      <template #default = "scope">
        <el-button class="custom-btn" link type="button" size="default" icon = "Edit" @click="Edit_btn(scope.row)">
           编辑
         </el-button>
         <el-button class="custom-btn1" link type="button" size="default" icon = "Delete" @click="Delete_btn(scope.row)">                        
           删除
         </el-button>
       </template>
       </el-table-column>
     </el-table>
     <!-- 分页器 -->
           <el-pagination
         @size-change="edgeDivide_slot0"
         @current-change="edgeDivide_slot1"
         :current-page.sync="listParm.currentPage"
         :page-sizes="[10, 20, 40, 80, 100]"
         :page-size="listParm.PageSize"
         layout="total, sizes, prev, pager, next, jumper"
         :total="listParm.total"
         background
         
       >
       </el-pagination>
    
    
  </el-main>
  <add_user ref="addRef" @updataForm="Getlist"></add_user>
  
</template>

<script setup lang="ts">
import '../../assets/m_button.scss';
import {Search,Place,Plus,Edit,Delete} from '@element-plus/icons-vue'
import add_user from './add_user.vue';
import m_UserTable from '../../sections/users/m_UserTable';
import m_UserCRUD from '../../sections/users/m_UserCRUD';
//表单控件操作
const {listParm,form_height,Getlist,Reset,Search_slog,user_tablelist,edgeDivide_slot0,edgeDivide_slot1} = m_UserTable()
//CRUD
const {Add,Edit_btn,Delete_btn,addRef} = m_UserCRUD(Getlist)
</script> 

<style scoped>
</style>
