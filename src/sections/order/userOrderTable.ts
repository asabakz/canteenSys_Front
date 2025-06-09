import { reactive, ref, onMounted, nextTick } from "vue";
import type { OrderListParm } from "../../api/order/OrderModel"
import { gePcOrderListApi, sendOrderApi } from "../../api/order";
import m_instance from "../../hooks/m_instance";
export default function userOrderTable() {
    // 表格高度
    const {global} = m_instance()
    const form_height = ref(0)
    const listParm = reactive<OrderListParm>({
        userName: '',
        type:'',
        currentPage: 1,
        pageSize: 10,
        total: 0
    })
    const order_data = ref([])
    const Getlist = async () => {
        let res = await gePcOrderListApi(listParm)
        if (res && res.code == 200) {
            order_data.value = res.data.records;
            listParm.total = res.data.total;
        }
    }

    const Search_slog = () => {
        Getlist()
    }

    const Reset = () => {
        listParm.userName = ''
        listParm.currentPage = 1
        Getlist()
    }
    const sendOrder = async(orderId:string) =>{
        let confirm = await global.$myconfirm("确定发货吗？")
        if(confirm){
            let res = await sendOrderApi(orderId)
            if(res && res.code == 200){
                Getlist()
            }
        }
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
        sendOrder,
        order_data,
        edgeDivide_slot0,
        edgeDivide_slot1,
        form_height
    }
}