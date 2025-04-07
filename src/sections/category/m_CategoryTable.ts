import { reactive, ref, onMounted, nextTick } from "vue";
import type { ListCategoryParm } from "../../api/category/category_model"
import { GetlistApi } from "../../api/category";

export default function m_CategoryTable() {
    // 表格高度
    const form_height = ref(0)
    const listParm = reactive<ListCategoryParm>({
        categoryName: '',
        currentPage: 1,
        pageSize: 10,
        total: 0
    })
    const cate_data = ref([])
    const Getlist = async () => {
        let res = await GetlistApi(listParm)
        if (res && res.code == 200) {
            cate_data.value = res.data.records;
            listParm.total = res.data.total;
        }
    }

    const Search_slog = () => {
        Getlist()
    }

    const Reset = () => {
        listParm.categoryName = ''
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
        cate_data,
        edgeDivide_slot0,
        edgeDivide_slot1,
        form_height
    }
}