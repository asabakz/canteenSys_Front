import http from "../../http";
import type{ OrderListParm } from "./OrderModel";
//列表
export const gePcOrderListApi = (parm: OrderListParm) => {
    return http.get("/wxapi/order/getManageOrderList", parm)
}

export const sendOrderApi = (orderId:string) => {
    return http.put("/wxapi/order/sendorder", {orderId:orderId})
}

//统计接口
export const getTotalApi = (type: string) => {
    return http.get("/wxapi/order/getTotal", {type:type})
}
