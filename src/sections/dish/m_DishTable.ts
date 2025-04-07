import { reactive, ref, onMounted, nextTick } from "vue";
import type { DishListParm } from "../../api/dish/DishModel"
import { GetlistApi } from "../../api/dish";

export default function m_DishTable() {
    // 表格高度
    const form_height = ref(0)
    const listParm = reactive<DishListParm>({
        dishName: '',
        currentPage: 1,
        pageSize: 10,
        total: 0
    })
    const dish_data = ref([])
    const Getlist = async () => {
        let res = await GetlistApi(listParm)
        if (res && res.code == 200) {
            dish_data.value = res.data.records;
            listParm.total = res.data.total;
        }
    }

    const Search_slog = () => {
        Getlist()
    }

    const Reset = () => {
        listParm.dishName = ''
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
        dish_data,
        edgeDivide_slot0,
        edgeDivide_slot1,
        form_height
    }
}