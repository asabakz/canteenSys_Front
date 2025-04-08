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
             <el-form-item prop="dishId" label="菜品选择">
                 <el-select v-model="add_model.dishId"  placeholder="分类选择" size="default">
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
             <el-form-item prop="dishName" label="广告标题">
               <el-input v-model="add_model.title"></el-input>
             </el-form-item>
           </el-col>
         </el-row>
         
         <el-row :gutter="20">
           <el-col :span="12" :offset="0">
             <el-form-item prop="orderNum" label="广告序号">
               <el-input v-model="add_model.orderNum"></el-input>
             </el-form-item>
           </el-col>
           <el-col :span="12" :offset="0">
             <el-form-item  label="是否上架">
               <el-radio-group v-model="add_model.onload">
                 <el-radio :label="0">否</el-radio>
                 <el-radio :label="1">是</el-radio>
               </el-radio-group>
             </el-form-item>
           </el-col>
         </el-row>
       
       
      </el-form>   
    </template>
  </m_dia>
</template>

<script setup lang="ts">
import '../../../node_modules/@wangeditor/editor/dist/css/style.css'
import {Editor,Toolbar} from '../../../node_modules/@wangeditor/editor-for-vue'
import SelectMenu from '../../sections/ad/SelectMenu.ts';
import ImageLoader from '../../components/ImageLoader.vue';
import type{ ad_model } from '../../api/ad/AdModel.ts';
import { nextTick, reactive,ref,watch } from 'vue'
import m_dia from '../../components/Dialog_item.vue';
import m_Dialog from '../../hooks/m_Dialog.ts';
import { addApi,editApi } from '../../api/ad/index.ts';
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

const m_add_display = (type: string, row?: ad_model) => {
   injectDialogStyle(); // 插入样式
  // 清空图片缓存
  imgUrl.value = [];
  oldUrl.value = [];
  fileList.value = [];

  if (editorRef.value) {
    editorRef.value.clear();
  }

  getSelect();

  m_dia_set.title = type === edit_status.ADD ? '新增' : '编辑';
  m_dia_set.height = 300;
  m_dia_set.width = 1000;

  // 清空表单数据
  if (type === edit_status.ADD) {
    Object.assign(add_model, {
      type: edit_status.ADD,
      adId: '',
      dishId: '',
      title: '',
      dishImage: '',
      onload: '',
      orderNum: '',
    });
    addFormRef.value?.resetFields(); // 放这里清理校验状态
  }

  // 如果是编辑，加载旧数据
  if (type === edit_status.EDIT && row) {
    Object.assign(add_model, row);

    if (add_model.dishImage) {
      let imgInfo = add_model.dishImage.split(",");
      for (let i = 0; i < imgInfo.length; i++) {
        let imgTemp = {
          name: imgInfo[i],
          url: imgInfo[i],
        };
        fileList.value.push(imgTemp);
        oldUrl.value.push({ url: imgInfo[i] });
      }
    }
  }

  // 弹窗展示放在最后
  dia_display();
};

//优先级被顶掉了，直接用函数写对话框顶部样式
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



defineExpose({
    m_add_display
})

const add_model = reactive<ad_model>({
    type: '',
    adId: '',
    dishId: '',
    title: '',
    dishImage: '',
    onload: '',
    orderNum: '',
})
// 表单验证规则
// 表单验证规则
const rules = reactive({
  dishId:[
    {
      required:true,
      trigger:'blur',
      message: '请选择菜品'
    }
  ],
   title:[
    {
      required:true,
      trigger:'blur',
      message: '请输入标题'
    }
  ],
   dishImage:[
    {
      required:true,
      trigger:'blur',
      message: '请上传图片'
    }
  ],
   onload:[
    {
      required:true,
      trigger:'blur',
      message: '请选择是否上架'
    }
  ],
   orderNum:[
    {
      required:true,
      trigger:'blur',
      message: '请输入序号'
    }
  ],
});


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
