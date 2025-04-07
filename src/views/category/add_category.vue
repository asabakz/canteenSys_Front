<template>
  <m_dia
    :title="m_dia_set.title"
  :width="m_dia_set.width"
  :height="m_dia_set.height"
  :visible="m_dia_set.visible"
  @onClose="onClose"
  @onConfirm="commit"
  >
    <template v-slot:content>
      <el-form :model="add_model" ref="addFormRef" :rules="rules" label-width="80px" :inline="false" size="default">
        
              
            <el-form-item prop="categoryName" label="分类名称" style="display: flex; align-items: center;">
          <el-input v-model="add_model.categoryName" style="flex: 1;"></el-input>
      </el-form-item>
      <el-form-item prop="orderNum" label="序号" style="display: flex; align-items: center;">
          <el-input type = "number" v-model="add_model.orderNum" style="flex: 1;"></el-input>
      </el-form-item>
      
  
      </el-form>
      
    </template>
  </m_dia>
</template>

<script setup lang="ts">
import type{ category_model } from '../../api/category/category_model.ts';
import { nextTick, reactive,ref } from 'vue'
import m_dia from '../../components/Dialog_item.vue';
import m_Dialog from '../../hooks/m_Dialog.ts';
import { addApi,editApi } from '../../api/category/index.ts';
import{ ElMessage, type FormInstance } from 'element-plus'; 
import { edit_status,Title } from '../../type/Common.ts';
//表单ref
const addFormRef = ref<FormInstance>(); 
// 弹框属性
const {m_dia_set,onClose,onConfirm,dia_display} = m_Dialog();

const m_add_display = (type:string,row?:category_model)=>{
      type == edit_status.ADD ? m_dia_set.title = Title.ADD : m_dia_set.title = Title.EDIT 
      console.log(type)
      m_dia_set.height = 150
      m_dia_set.visible = true
      
      if(row){
        nextTick(()=>{
          Object.assign(add_model,row)
        })   
      }

      add_model.type = type

      addFormRef.value?.resetFields()
  
}

defineExpose({
    m_add_display
})

const add_model = reactive<category_model>({
  type: '',
  categoryId: '',
  categoryName: '',
  orderNum: ''
})
// 表单验证规则
const rules = reactive({
    categoryName: [{
        required: true,
        message: '请填写分类名称',
        trigger: 'blur'
    }]
})
const emists = defineEmits(['updataForm'])

const commit = () => {
    addFormRef.value?.validate(async(valid) => {
        if (valid) {
                  let res
                  console.log(res)
                  if(add_model.type==edit_status.ADD){
                    res = await addApi(add_model);
                  }else{
                    res = await editApi(add_model);
                  }
            if(res && res.code==200){
                  ElMessage.success(res.msg)
                  emists('updataForm')
                  onClose()
            }
           
        }
    })
}

</script>
<style scoped>
</style>
