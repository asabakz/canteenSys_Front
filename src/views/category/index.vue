<template>
  <el-main>
    <el-form :model="listParm" :inline="true" size="default">
        <el-form-item>
            <el-input v-model="listParm.categoryName" placeholder="菜品分类名称："></el-input>
        </el-form-item>

        <el-form-item>
               <el-button :icon="Search" @click="Search_slog" class="custom-btn">搜索</el-button>
         <el-button :icon="Place" @click="Reset" class="custom-btn1">重置</el-button>
         <el-button :icon="Plus" @click="Add" class="custom-btn">立即创建</el-button>
         <el-button  class="custom-btn1">取消</el-button>
        </el-form-item>
    </el-form>
    <!-- 表格内容 -->
    <el-table :height = "form_height" :data="cate_data" border stripe>
         <el-table-column prop="categoryName" label="分类名称"></el-table-column>
         <el-table-column prop="orderNum" label="序号"></el-table-column>
         <el-table-column label="UD" width="160" align="center">
          <template #default ="scope">
         <el-button class="custom-btn" link type="button" size="defult" icon = "Edit" @click="Edit_btn(scope.row)">
          编辑
         </el-button>
         <el-button class="custom-btn1" link type="button" size="defult" icon = "Delete" @click="Delete_btn(scope.row)">
          删除                        
         </el-button>
       </template>
    </el-table-column>
    </el-table>

        <el-pagination
         @size-change="edgeDivide_slot0"
         @current-change="edgeDivide_slot1"
         :current-page.sync="listParm.currentPage"
         :page-sizes="[10, 20, 40, 80, 100]"
         :page-size="listParm.pageSize"
         layout="total, sizes, prev, pager, next, jumper"
         :total="listParm.total"
         background
         
       >
       </el-pagination>
    
  </el-main>

  <add_category ref="addRef"  @updataForm="Getlist"></add_category>
</template>

<script setup lang="ts">
import '../../assets/m_button.scss';
import add_category from './add_category.vue';
import { Edit,Place,Delete,Search, Plus } from '@element-plus/icons-vue';
import m_CategoryTable from '../../sections/category/m_CategoryTable'
import m_categoryCRUD from '../../sections/category/m_CategoryCRUD'

const {listParm,Getlist,form_height,Search_slog,Reset,cate_data,edgeDivide_slot0,edgeDivide_slot1} = m_CategoryTable()
const {Add,Edit_btn,Delete_btn,addRef} = m_categoryCRUD(Getlist)
</script>

<style scoped>


</style>
