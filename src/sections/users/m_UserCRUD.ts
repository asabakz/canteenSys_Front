import { ref } from "vue"
import type { user_model } from "../../api/users/user_model"
import { edit_status, type common_func } from "../../type/Common"
import m_instance from "../../hooks/m_instance"
import { deleteUserApi } from "../../api/users/index"
import { ElMessage } from "element-plus"

export default function m_UserCRUD(Getlist: common_func) {
    const { global } = m_instance()
    //ref属性
    const addRef = ref<{ m_add_display: (type: string, row?: user_model) => void }>()

    const Add = () => {
        addRef.value?.m_add_display(edit_status.ADD)
    }
    const Edit_btn = (row: user_model) => {
        addRef.value?.m_add_display(edit_status.EDIT, row)
    }
    const Delete_btn = async (row: user_model) => {
        console.log("deletebtn")
        let dele_confirm = await global.$comfirmDia('确认删除该数据吗？')
        if (dele_confirm) {
            let res = await deleteUserApi(row.userId)
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