<template>
  <el-main>
    <!-- 表格内容 -->
    <el-table row-key="commentId" :height = "form_height" :data="comment_data" border stripe>
   
        <el-table-column prop="nickName" label="用户昵称"></el-table-column>
         <el-table-column prop="avatarUrl" label="用户头像">
          <template #default="scope">
            <el-image :src="imgUrl+scope.row.avatarUrl"></el-image>
          </template>
         </el-table-column>

         <el-table-column prop="goodsName" label="菜品名称"></el-table-column>
         <el-table-column prop="goodsImage" label="菜品图片">
          <template #default="scope">
            <el-image :src="scope.row.goodsImage.split(',')[0]" style="height:60px;width:60px;"></el-image>
          </template>
         </el-table-column>
         
         <el-table-column prop="createTime" label="评论时间"></el-table-column>
         
         <el-table-column label="操作" width="160" align="center">
          <template #default ="scope">
         <el-button class="custom-btn1" link type="button" size="large" icon = "Delete" @click="Delete_btn(scope.row.commentId)">                        
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
import {ref} from 'vue'
import '../../assets/m_button.scss';
import { Edit,Place,Delete,Search, Plus } from '@element-plus/icons-vue';
import CommentTable from '../../sections/comment/CommentTable'; 
const imgUrl = ref('http://localhost:8089/')                
const {listParm,Getlist,form_height,Search_slog,Reset,comment_data,edgeDivide_slot0,edgeDivide_slot1,Delete_btn} = CommentTable()
</script>

<style scoped>
</style>
