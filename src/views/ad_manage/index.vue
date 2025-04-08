<template>
  <el-main>
    <el-form :model="listParm" :inline="true" size="default">
        <el-form-item>
            <el-input v-model="listParm.title" placeholder="广告标题："></el-input>
        </el-form-item>

        <el-form-item>
                <el-button :icon="Search" @click="Search_slog" class="custom-btn">搜索</el-button>
         <el-button :icon="Place" @click="Reset" class="custom-btn1">重置</el-button>
         <el-button :icon="Plus" @click="Add" class="custom-btn">立即创建</el-button>
         <el-button  class="custom-btn1">取消</el-button>
        </el-form-item>
    </el-form>
    
    <!-- 表格内容 -->
    <el-table row-key="adId" :height = "form_height" :data="ad_data" border stripe>


         <el-table-column prop="dishImage" label="菜品图片">
          <template #default="scope">
            <el-image :src="scope.row.dishImage.split(',')[0]" style="height:60px;width:60px;"></el-image>
          </template>
         </el-table-column>
       
          <el-table-column prop="orderNum" label="广告序号"></el-table-column>
         <el-table-column prop="title" label="广告标题"></el-table-column>
       
          <el-table-column label="商品是否上架" prop="onload">
           <template #default="scope">
             <div v-if="scope.row.onload == '0'" size="normal">否</div>
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

  <add_ad ref="addRef"  @updataForm="Getlist"></add_ad>
</template>

<script setup lang="ts">
import '../../assets/m_button.scss';
import add_ad from './add_ad.vue';
import { Edit,Place,Delete,Search, Plus } from '@element-plus/icons-vue';
import m_AdTable from '../../sections/ad/m_AdTable';
import m_AdCRUD from '../../sections/ad/m_AdCRUD'

const {listParm,Getlist,form_height,Search_slog,Reset,ad_data,edgeDivide_slot0,edgeDivide_slot1} = m_AdTable()
const {Add,Edit_btn,Delete_btn,addRef} = m_AdCRUD(Getlist)
</script>

<style scoped>
</style>
