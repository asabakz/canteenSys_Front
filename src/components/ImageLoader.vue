
<style scoped>
</style> -->

<template>
  <el-upload 
    action="#" 
    list-type="picture-card" 
    :auto-upload="false" 
    ref="imgloaderRef"
    :on-change="onLoadFile"
    :on-remove="handleRemove"
    :file-list="receive_slot.fileList"
    :limit="3"
    :on-exceed="imgNumLimit">
    <el-icon><Plus /></el-icon>
  </el-upload>
  <el-dialog v-model="dialogVisible">
    <img w-full :src="dialogImageUrl" alt="Preview Image" />
  </el-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { uploadImageApi } from '../api/image';
import { Plus, UploadFilled } from '@element-plus/icons-vue';
import { type UploadFile, type UploadUserFile, ElMessage } from 'element-plus';
import { type imgType } from '../type/Common';

const imgloaderRef = ref();
const dialogImageUrl = ref('');
const dialogVisible = ref(false);

const emits = defineEmits(['getImg']);

// Props 类型定义
type ReceiveType = {
  fileList: UploadUserFile[];
  oldUrl: Array<{ url: string }>;
};

const receive_slot = withDefaults(defineProps<ReceiveType>(), {
  fileList: () => [],
  oldUrl: () => [],
});

// 图片结果数据
const img_res = ref<imgType>({
  newImgUrl: [],
  deleteImgUrl: [],
});

// 图片数量超限警告
const imgNumLimit = (file: File[], uploadFile: UploadFile) => {
  ElMessage.warning("超出上传数量限制:  3张图片");
};

// 删除图片的逻辑
const handleRemove = (file: UploadFile) => {
  if (receive_slot.oldUrl.some(item => item.url === file.name)) {
    img_res.value.deleteImgUrl.push({ url: file.name });
    emits("getImg", img_res.value);
  } else {
    img_res.value.newImgUrl = img_res.value.newImgUrl.filter(item => item.url !== file.name);
    emits("getImg", img_res.value);
  }
};

// 上传文件的逻辑
const onLoadFile = async (file: any) => {
  const typeArr = ["image/png", "image/gif", "image/jpeg", "image/jpg"];
  const isImg = typeArr.includes(file.raw.type);
  const isMore3M = file.size / 1024 / 1024 < 3;

  if (!isImg) {
    ElMessage.warning("只能上传图片类型!");
    imgloaderRef.value?.clearFiles();
    return;
  }
  if (!isMore3M) {
    ElMessage.warning("图片大小不能超过 3M!");
    imgloaderRef.value?.clearFiles();
    return;
  }

  const receiveData = new FormData();
  receiveData.append("file", file.raw);

  const res = await uploadImageApi(receiveData);
  if (res && res.code === 200 && res.data) {
    ElMessage.success(res.msg);
    file.name = process.env.BASE_API + res.data;
    img_res.value.newImgUrl.push({ url: process.env.BASE_API + res.data });
    
    console.log(img_res.value.newImgUrl)
    emits("getImg", img_res.value);
  }
};
</script>

<style scoped>
</style>
