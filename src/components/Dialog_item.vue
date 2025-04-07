<template>
  <el-dialog
  :model-value = "visible"
  :title="title"
  :width="width+'px'"
  append-to-body    
  :before-close="onClose"
  >

   <div class="container" :style="{height:height+'px'}">
    <slot name = "content"></slot>
   </div>

    <template #footer>
      <div class="dialog-footer">
        <el-button class="custom-btn1" @click="onClose">取消</el-button>
        <el-button class="custom-btn" @click="onConfirm">
          确认
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import '../assets/m_button.scss'
// 定义参数的类型
interface DialogProps {
  title?: string; // 弹框标题
  visible?: boolean; // 控制弹框显示和隐藏
  width?: number; // 宽度
  height?: number; // 高度
}

// 子组件，接收父组件传递的参数
// withDefaults: 指定默认值
const props = withDefaults(defineProps<DialogProps>(), {
  title: '标题',
  visible: false,
  width: 630,
  height: 280
});

//是否关闭弹框
const emits = defineEmits(['onClose','onConfirm'])
const onClose = ()=>{
    emits('onClose')
}
const onConfirm = ()=>{
    emits('onConfirm')
}
</script>


<style lang="scss" scoped>
.container {
    overflow-x: initial;
    overflow-y: auto;
}

.el-dialog {
    border-top-left-radius: 7px !important;
    border-top-right-radius: 7px !important;
    .el-dialog__header {
        margin: 0 !important; /* 移除外边距 */
        padding: 0 !important; /* 移除内边距以确保黄色区域充满整个头部 */
        border-top-left-radius: 7px !important;
        border-top-right-radius: 7px !important;
        background-color: #fafad2 !important;
        display: flex; /* 使用 flex 布局 */
        justify-content: center; /* 居中对齐标题 */
        align-items: center; /* 垂直居中对齐标题 */                                                                                                                                                           
        height: 50px; /* 设置头部高度（可根据需要调整） */
        .el-dialog__title {
            color: #3e3e3de1;
            font-size: 16px;
            font-weight: 600;
            text-align: center; /* 保证标题居中对齐 */
        }
    }
    .el-dialog__headerbtn {
        position: absolute; /* 定位关闭按钮 */
        top: 0; /* 将关闭按钮放置头部的顶端 */
        right: 10px; /* 设置关闭按钮与右边的距离 */
        .el-dialog__close {
            color: #f2f2efe1;
        }
    }
    .el-dialog__body {
        padding: 10px;
    }
    .el-dialog__footer {
        border-top: 1px solid #e8eaec !important;
        padding: 10px;
    }
}


</style>


