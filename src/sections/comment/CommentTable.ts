import { reactive, ref, onMounted, nextTick } from "vue";
import type { CommentListParm } from "../../api/comment/CommentModel"
import { GetlistApi,deleteApi } from "../../api/comment";
import m_instance from "../../hooks/m_instance"
import { ElMessage } from "element-plus"

export default function CommentTable() {
    const { global } = m_instance()
    // 表格高度
    const form_height = ref(0)
    const listParm = reactive<CommentListParm>({
        currentPage: 1,
        pageSize: 10,
        total: 0,
   
    })
    const comment_data = ref([])
    const Getlist = async () => {
        let res = await GetlistApi(listParm)
        if (res && res.code == 200) {
            comment_data.value = res.data.records;
            listParm.total = res.data.total;
        }
    }
   const Delete_btn = async (commentId:string) => {
           console.log("deletebtn")
           let dele_confirm = await global.$comfirmDia('确认删除该数据吗？')
           if (dele_confirm) {
               let res = await deleteApi(commentId)
               if (res && res.code == 200) {
                   ElMessage.success(res.msg)
                   Getlist()
               }
           }
       }
    

    const Search_slog = () => {
        Getlist()
    }

    const Reset = () => {
        listParm.currentPage = 1
        Getlist()
    }
    onMounted(() => {
        Getlist()
        nextTick(() => {
            form_height.value = window.innerHeight - 210
        })
    })
    const edgeDivide_slot0 = (size: number) => {
        listParm.pageSize = size;
        Getlist()
    }
    //当前页改变
    const edgeDivide_slot1 = (size: number) => {
        listParm.currentPage = size;
        Getlist()
    }
    return {
        listParm,
        Getlist,
        Search_slog,
        Reset,
        comment_data,
        edgeDivide_slot0,
        edgeDivide_slot1,
        Delete_btn,
        form_height
    }
}