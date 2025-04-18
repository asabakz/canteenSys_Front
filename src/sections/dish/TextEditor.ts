import { onBeforeUnmount, ref, shallowRef, onMounted } from 'vue'
import type { IEditorConfig } from '../../../node_modules/@wangeditor/editor'
export default function TextEditor() {

    type InsertFnType = (url: string, alt?: string, href?: string) => void
    // 编辑器实例，必须用 shallowRef
    const editorRef = shallowRef()

    // 内容 HTML
    const valueHtml = ref('')

    const toolbarConfig = {}
    const editorConfig: Partial<IEditorConfig> = { MENU_CONF: {}, placeholder: '请输入内容...' }
    const mode = ref('default')

    //文本框图片编辑配置
    if (!editorConfig.MENU_CONF) {
        editorConfig.MENU_CONF = {};
    }
    editorConfig.MENU_CONF['uploadImage'] = {
        // form-data fieldName，默认值 'wangeditor-uploaded-image'
        fieldName: 'file',
        // 上传图片后端地址
        server: process.env.BASE_API + '/api/upload/uploadImage',
        // 自定义插入图片
        customInsert(res: any, insertFn: InsertFnType) {
            // res 即服务端的返回结果
            console.log(res)
            insertFn(process.env.BASE_API + res.data)
        },
    }

    // 组件销毁时，也及时销毁编辑器
    onBeforeUnmount(() => {
        const editor = editorRef.value
        if (editor == null) return
        editor.destroy()
    })

    const handleCreated = (editor: any) => {
        editorRef.value = editor // 记录 editor 实例，重要！
    }

    return {
        editorRef,
        valueHtml,
        mode, // 或 'simple'
        toolbarConfig,
        editorConfig,
        handleCreated,
    }
}