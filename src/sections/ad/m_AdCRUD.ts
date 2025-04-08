import { Delete, Edit } from "@element-plus/icons-vue"
import { ref } from "vue"
import { edit_status } from "../../type/Common"
import m_instance from "../../hooks/m_instance"
import { ElMessage } from "element-plus"
import type { common_func } from "../../type/Common"
import { deleteApi } from "../../api/ad"
import type { ad_model } from "../../api/ad/AdModel"

export default function m_AdCRUD(Getlist: common_func) {
    const { global } = m_instance()
    //ref属性
    const addRef = ref<{ m_add_display: (type: string, row?: ad_model) => void }>()
    const Add = () => {
        console.log("打开新增弹窗")
        addRef.value?.m_add_display(edit_status.ADD)
    }
    const Edit_btn = (row: ad_model) => {
        console.log("打开编辑弹窗")
        addRef.value?.m_add_display(edit_status.EDIT, row)
    }
    const Delete_btn = async (row: ad_model) => {
        console.log("deletebtn")
        let dele_confirm = await global.$comfirmDia('确认删除该数据吗？')
        if (dele_confirm) {
            let res = await deleteApi(row.adId)
            if (res && res.code == 200) {
                ElMessage.success(res.msg)
                Getlist()
            }
        }
    }
    return {
        Add,
        Edit_btn,
        Delete_btn,
        addRef
    }
}