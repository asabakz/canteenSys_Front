import http from "../../http";
import type { dish_model, DishListParm } from "./DishModel";

export const addApi = (parm: dish_model) => {
    return http.post("/api/dish", parm)
}

export const GetlistApi = (parm: DishListParm) => {
    return http.get("/api/dish/list", parm);
}

export const editApi = (parm: dish_model) => {
    return http.put("/api/dish", parm);
}

// 删除
export const deleteApi = (dishId: string) => {
    return http.delete(`/api/dish/${dishId}`);
};

// 删除
export const getSelectListApi = () => {
    return http.get("/api/dish/getSelectList");
};
