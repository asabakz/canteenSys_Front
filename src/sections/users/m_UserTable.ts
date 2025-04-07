// 表格相关的业务抽离
import type { ListUserParm } from '../../api/users/user_model'
import { reactive, ref, onMounted, nextTick } from 'vue'
import { userListApi } from '../../api/users'
import { List } from '@element-plus/icons-vue'
export default function m_UserTable() {
    const form_height = ref(0)
    // 列表查询的参数
    const listParm = reactive<ListUserParm>({
        currentPage: 1,
        PageSize: 10,
        user_name: '',
        phone_number: '',
        total: 0
    })
    const user_tablelist = ref([])

    const Getlist = async () => {
        let res = await userListApi(listParm)
        console.log(res)
        if (res && res.code == 200) {
            user_tablelist.value = res.data.records;
            listParm.total = res.data.total
        }
    }
    const Search_slog = () => {
        Getlist()
    }
    const Reset = () => {
        listParm.currentPage = 1;
        listParm.user_name = ''
        listParm.phone_number = ''
        Getlist()
    }
    onMounted(() => {
        Getlist()
        nextTick(() => {
            form_height.value = window.innerHeight - 220
        })
    })
    //页大小改变
    const edgeDivide_slot0 = (size: number) => {
        listParm.PageSize = size;
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
        edgeDivide_slot0,
        edgeDivide_slot1,
        form_height,
        user_tablelist
    }
}
