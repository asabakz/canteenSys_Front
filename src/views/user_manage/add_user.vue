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


          <el-row :gutter="20">
        <el-col :span="12" :offset="0">
          <el-form-item prop="realName" label="真名">
            <el-input v-model="add_model.realName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" :offset="0">
          <el-form-item prop="sex" label="性别">
            <el-radio-group v-model="add_model.sex">
              <el-radio :label="0">男</el-radio>
              <el-radio :label="1">女</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>   
      </el-row>

         <el-row :gutter="20">
        <el-col :span="12" :offset="0">
          <el-form-item prop="email" label="邮箱">
            <el-input v-model="add_model.email"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" :offset="0">
           <el-form-item prop="phoneNumber" label="电话">
            <el-input v-model="add_model.phoneNumber"></el-input>
          </el-form-item>
        </el-col>   
      </el-row>

      <el-row :gutter="20">
        <el-col :span="12" :offset="0">
          <el-form-item prop="userName" label="用户名">
            <el-input v-model="add_model.userName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" :offset="0">
           <el-form-item prop="password" label="密码">
            <el-input v-model="add_model.password"></el-input>
          </el-form-item>
        </el-col>   
      </el-row>
      
    </el-form>
    
  </template>
</m_dia>

</template>

<script setup lang="ts">

import { addUserApi,editUserApi } from '../../api/users/index.ts';
import { nextTick, reactive,ref } from 'vue';
import m_dia from '../../components/Dialog_item.vue';
import m_Dialog from '../../hooks/m_Dialog.ts';
import type{ user_model } from '../../api/users/user_model.ts';
import{ ElMessage, type FormInstance } from 'element-plus';  //获取表单的属性与方法
import { edit_status, Title } from '../../type/Common.ts';

const addFormRef = ref<FormInstance>()
const {m_dia_set,onClose,onConfirm,dia_display} = m_Dialog();

const m_add_display = (type:string,row?:user_model)=>{
      type == edit_status.ADD ? m_dia_set.title = Title.ADD : m_dia_set.title = Title.EDIT 
      console.log(type)
      m_dia_set.height = 200
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

const add_model = reactive<user_model>({
    userId: NaN,
    userName: "",
    password: "",
    phoneNumber: "",
    email:"",
    sex: "",
    realName: "",
    type:""
})

//表单验证规则
const  rules = reactive({
    realName: [
    {
      required: true,
      message: "请输入真名",
      trigger: "blur"
    },
  ],
    sex: [
    {
      required: true,
      message: "请选择性别",
      trigger: "blur"
    },
  ],
    email: [
    {
      required: true,
      message: "请输入邮箱",
      trigger: "blur"
    },
  ],
    phoneNumber: [
    {
      required: true,
      message: "请输入电话号码",
      trigger: "blur"
    },
  ],
    userName: [
    {
      required: true,
      message: "请输入用户名",
      trigger: "blur"
    },
  ],
    password: [
    {
      required: true,
      message: "请输入密码",
      trigger: "blur"
    },
  ],
})

const emists = defineEmits(['updataForm'])
// 表单提交
const commit = () => {
    addFormRef.value?.validate(async(valid) => {
        if (valid) {
                  let res
                  console.log(res)
                  if(add_model.type==edit_status.ADD){
                    res = await addUserApi(add_model);
                  }else{
                    res = await editUserApi(add_model);
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
