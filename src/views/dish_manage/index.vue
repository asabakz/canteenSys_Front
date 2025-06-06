<template>
  <el-main>
    <el-form :model="listParm" :inline="true" size="default">
        <el-form-item>
            <el-input v-model="listParm.dishName" placeholder="菜品名称："></el-input>
        </el-form-item>

        <el-form-item>
                <el-button :icon="Search" @click="Search_slog" class="custom-btn">搜索</el-button>
         <el-button :icon="Place" @click="Reset" class="custom-btn1">重置</el-button>
         <el-button :icon="Plus" @click="Add" class="custom-btn">立即创建</el-button>
         <el-button  class="custom-btn1">取消</el-button>
        </el-form-item>
    </el-form>
    
    <!-- 表格内容 -->
     <el-table row-key="dishId" :height = "form_height" :data="dish_data" border stripe>

      <!-- 规格子表，扩展显示 -->
          <el-table-column type="expand">
            <template #default="scope">
              <el-table :data="scope.row.specs" border stripe>
                <el-table-column label="名称" prop="specsName"></el-table-column>
                <el-table-column label="价格" prop="dishPrice"></el-table-column>
                <el-table-column label="序号" prop="orderNum"></el-table-column>
              </el-table>
            </template>
          </el-table-column>

        <el-table-column label="是否上架" prop="onload">
         <template #default="scope">
           <el-tag v-if="scope.row.onload == '0'" type="danger"
             size="small" effect="dark"> 否 </el-tag>
           <el-tag v-else type="main" size="small"
             effect="dark"> 是 </el-tag>
         </template>
        </el-table-column>

         <el-table-column prop="dishImage" label="菜品图片">
          <template #default="scope">
            <el-image :src="scope.row.dishImage.split(',')[0]" style="height:60px;width:60px;"></el-image>
          </template>
         </el-table-column>
       
          <el-table-column prop="orderNum" label="菜品序号"></el-table-column>
         <el-table-column prop="dishName" label="菜品名称"></el-table-column>
         <el-table-column prop="dishUnit" label="菜品单位"></el-table-column>
       
          <el-table-column label="是否热推" prop="hot">
           <template #default="scope">
             <div v-if="scope.row.hot == '0'" size="normal">否</div>
             <div v-else size="normal" effect="dark">是</div>
           </template>
         </el-table-column>
         

         <el-table-column label="UD" width="160" align="center">
          <template #default ="scope">
         <el-button class="custom-btn" link type="button" size="large" icon = "Edit" @click="Edit_btn(scope.row)">
           编辑
         </el-button>
         <el-button class="custom-btn1" link type="button" size="large" icon = "Delete" @click="Delete_btn(scope.row)">                        
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

  <add_dish ref="addRef"  @updataForm="Getlist"></add_dish>
</template>

<script setup lang="ts">
import '../../assets/m_button.scss';
import add_dish from './add_dish.vue';
import { Edit,Place,Delete,Search, Plus } from '@element-plus/icons-vue';
import m_DishTable from '../../sections/dish/m_DishTable';
import m_dishCRUD from '../../sections/dish/m_DishCRUD'

const {listParm,Getlist,form_height,Search_slog,Reset,dish_data,edgeDivide_slot0,edgeDivide_slot1} = m_DishTable()
const {Add,Edit_btn,Delete_btn,addRef} =  m_dishCRUD(Getlist)
</script>

<style scoped>
</style>
