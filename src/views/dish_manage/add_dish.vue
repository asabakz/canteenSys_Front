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
                           
            <el-form-item prop="dishImage" label="菜品图片">
               <ImageLoader :file-list="fileList" :oldUrl="oldUrl" @getImg="getImg"></ImageLoader>
             </el-form-item>
            
           <el-row :gutter="20">
           <el-col :span="12" :offset="0">
             <el-form-item prop="categoryId" label="菜品分类">
                 <el-select v-model="add_model.categoryId"  placeholder="分类选择" size="default">
                  <el-option
                    v-for="item in selectData"
                    :key="item['vulue']"
                    :label="item['label']"
                    :value="item['value']"
                  />
                </el-select>
             </el-form-item>
           </el-col>
           <el-col :span="12" :offset="0">
             <el-form-item prop="dishName" label="菜品名称">
               <el-input v-model="add_model.dishName"></el-input>
             </el-form-item>
           </el-col>
         </el-row>
         
         <el-row :gutter="20">
           <el-col :span="12" :offset="0">
             <el-form-item prop="orderNum" label="菜品序号">
               <el-input v-model="add_model.orderNum"></el-input>
             </el-form-item>
           </el-col>
           <el-col :span="12" :offset="0">
             <el-form-item  label="普通/热门">
               <el-radio-group v-model="add_model.hot">
                 <el-radio :label="0">否</el-radio>
                 <el-radio :label="1">是</el-radio>
               </el-radio-group>
             </el-form-item>
           </el-col>
         </el-row>
         
           <el-form-item  label="菜品简介" prop="dishIntro">
            <div style="border: 1px solid #ccc">
              <!-- Toolbar Component -->
              <Toolbar 
                style="border-bottom: 1px solid #ccc" 
                :editor="editorRef" 
                :defaultConfig="toolbarConfig" 
                :mode="mode" 
              />
              <!-- Editor Component -->
              <Editor 
                style="height: 300px; overflow-y: hidden" 
                v-model="valueHtml" 
                :defaultConfig="editorConfig" 
                :mode="mode" 
                @onCreated="handleCreated" 
              />
            </div>
          </el-form-item>

          <!-- <el-form-item prop="DishUnit" label="菜品单位">
               <el-input v-model="add_model.dishUnit"></el-input>
             </el-form-item> -->

          <el-row :gutter="20">
           <el-col :span="12" :offset="0">
             <el-form-item prop="DishUnit" label="菜品单位">
               <el-input v-model="add_model.dishUnit"></el-input>
             </el-form-item>
           </el-col>
           <el-col :span="12" :offset="0">
             <el-form-item  label="是/否上架">
               <el-radio-group v-model="add_model.onload">
                 <el-radio :label="0">否</el-radio>
                 <el-radio :label="1">是</el-radio>
               </el-radio-group>
             </el-form-item>
           </el-col>
         </el-row>   

                 <!--菜品规格 -->
               <el-row :gutter="20">
              <el-col :span="12" :offset="0">
                <el-divider content-position="center" prop="specs">菜品规格</el-divider>
              </el-col>
              <el-col :span="12" :offset="0">
                <el-button  margin:auto :icon="Plus" size="default" @click="addDishSpecs">添加规格</el-button>
              </el-col>
            </el-row>
             <el-form-item v-for="num in add_model.specs.length" size="small" :key="num">
               <el-row :gutter="20">
                 <el-col :span="7" :offset="0">
                   <el-form-item :label="'名称'+num" size="small">
                     <el-input v-model="add_model.specs[num-1].specsName"></el-input>
                   </el-form-item>
                 </el-col>
                 <el-col :span="7" :offset="0">
                   <el-form-item :label="'价格'+num" size="small">
                     <el-input v-model="add_model.specs[num-1].dishPrice"></el-input>
                   </el-form-item>
                 </el-col>
                 <el-col :span="7" :offset="0">
                   <el-form-item :label="'序号'+num" size="small">
                     <el-input v-model="add_model.specs[num-1].orderNum"></el-input>
                   </el-form-item>
                 </el-col>
                 <el-col :span="3" :offset="0">
                   <el-button icon="Close" size="default" @click="deleDishSpecs(num)">删除</el-button>
                 </el-col>
               </el-row>
              </el-form-item>
          
      </el-form>
      
    </template>
  </m_dia>
</template>

<script setup lang="ts">
import '../../../node_modules/@wangeditor/editor/dist/css/style.css'
import {Editor,Toolbar} from '../../../node_modules/@wangeditor/editor-for-vue'
import SelectMenu from '../../sections/dish/SelectMenu.ts';
import ImageLoader from '../../components/ImageLoader.vue';
import { type dish_specs_model, type dish_model } from '../../api/dish/DishModel.ts';
import { nextTick, reactive,ref,watch } from 'vue'
import m_dia from '../../components/Dialog_item.vue';
import m_Dialog from '../../hooks/m_Dialog.ts';
import { addApi,editApi } from '../../api/dish/index.ts';
import{ autoResizerProps, ElMessage, type FormInstance, type UploadUserFile } from 'element-plus'; 
import { edit_status,Title, type imgType } from '../../type/Common.ts';
import TextEditor from '../../sections/dish/TextEditor.ts';
import { Plus,Close} from '@element-plus/icons-vue';
//表单ref
const addFormRef = ref<FormInstance>(); 

//文本编辑处理
const{editorRef,
      valueHtml,
      mode, // 或 'simple'
      toolbarConfig,
      editorConfig,
      handleCreated} = TextEditor()

//图片上传处理
const fileList = ref<UploadUserFile[]>([]);
const oldUrl = ref<Array<{url:string}>>([]);
const imgUrl = ref<Array<{url:string}>>([]);
//分类菜单
const {selectData,getSelect} = SelectMenu()

// 弹框属性
const {m_dia_set,onClose,onConfirm,dia_display} = m_Dialog();



const m_add_display = (type:string,row?:dish_model)=>{
  injectDialogStyle();
    //初始化对话框
      imgUrl.value = [];
      oldUrl.value = [];
      fileList.value=[];
      if (editorRef.value) {
        editorRef.value.clear();
      }
      getSelect()
      m_dia_set.height = 600                                                                                                                   
      m_dia_set.width = 1000
      dia_display()
     //编辑预加载图片\菜品简介
     if(type==edit_status.EDIT&& row){
      nextTick(() =>{
           m_dia_set.title = "编辑"
           Object.assign(add_model,row);

           if(add_model.dishImage){
            let imgInfo = add_model.dishImage.split(",")
            for(let i=0;i<imgInfo.length;i++){
              let imgTemp = {
                name: '',
                url:''
              }
              imgTemp.name = imgInfo[i]
              imgTemp.url = imgInfo[i]
              fileList.value.push(imgTemp)
              oldUrl.value.push({url:imgInfo[i]})
            }
           }
           valueHtml.value = add_model.dishIntro
        })
      } else {
        nextTick(()=>{
           m_dia_set.title = "新增"
          add_model.specs=[];
          addDishSpecs()
        })
 }
       
 //清空缓存
       dia_display()
       addFormRef.value?.resetFields();
       add_model.type = type;

}

defineExpose({
    m_add_display
})

const add_model = reactive<dish_model>({
  type: '',
  dishId: '',
  dishImage: '',
  dishIntro: '',
  hot: '',
  dishUnit: '',
  specs: Array<dish_specs_model>(),
  categoryId: '',
  dishName: '',
  orderNum: '',
  onload:""
})
// 表单验证规则
// 表单验证规则
const rules = reactive({
  dishImage: [
    { required: true, message: '请上传菜品图片', trigger: 'blur' }
  ],
  categoryId: [
    { required: true, message: '请选择菜品分类', trigger: 'change' }
  ],
  dishName: [
    { required: true, message: '请输入菜品名称', trigger: 'blur' },
  ],
  orderNum: [
    { required: true, message: '请输入菜品序号', trigger: 'blur' },
  ],
  dishIntro: [
    { required: true, message: '请输入菜品简介', trigger: 'blur' },
    { min: 10, message: '菜品简介至少需要10个字符', trigger: 'blur' }
  ],
  dishUnit: [
    { required: true, message: '请输入菜品单位', trigger: 'blur' }
  ],
    specs: [
        {
          validator: (rule: any, value: dish_specs_model[], callback: (error?: string) => void) => {
            if (value.length === 0) {
              callback();
            } else {
              callback();
            }
          },
          trigger: 'change'
        }
      ]
});


//添加规格
const addDishSpecs = ()=>{
  add_model.specs.push({
    dishPrice:'',
    specsName:'',
    orderNum:''
  })
}
//优先级被顶掉了，直接用函数写样式
const injectDialogStyle = () => {
  const styleId = 'custom-dialog-style';
  if (document.getElementById(styleId)) return; // 避免重复插入

  const style = document.createElement('style');
  style.id = styleId;
  style.innerHTML = `
    .el-dialog__header {
      margin: 0 !important;
      padding: 0 !important;
      border-top-left-radius: 7px !important;
      border-top-right-radius: 7px !important;
      background-color: #fafad2 !important;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 50px;
    }
    .el-dialog__title {
      color: #3e3e3de1;
      font-size: 16px;
      font-weight: 600;
      text-align: center;
    }
  `;
  document.head.appendChild(style);
};

const deleDishSpecs = (Spec_num:number)=>{
  add_model.specs.splice(Spec_num-1,1);
}

const getImg = (img: imgType) => {
    // console.log(img.newImgUrl);
    imgUrl.value = oldUrl.value.concat(img.newImgUrl);
    if (img.deleteImgUrl.length > 0) {
        let newArr = imgUrl.value.filter((x) => !img.deleteImgUrl.some((item) => x.url === item.url));
        imgUrl.value = newArr;
    }
    // console.log(imgUrl.value);
    // 把图片路径拼接为逗号分隔的字符串
    let url = "";
    for (let k = 0; k < imgUrl.value.length; k++) {
        url = url + imgUrl.value[k].url + ",";
    }
    add_model.dishImage = url.substring(0, url.lastIndexOf(","));
    console.log(add_model.dishImage);
}

const emists = defineEmits(['updataForm'])

watch(
  ()=>valueHtml.value,
  (value)=>{
    console.log(value)
    add_model.dishIntro = value
  }
)
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
