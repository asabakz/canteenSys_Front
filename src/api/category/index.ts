import type { ListConstructorProps } from "element-plus";
import http from "../../http";
import type { category_model, ListCategoryParm } from "./category_model";

export const addApi = (parm: category_model) => {
    return http.post("/api/category", parm)
}

export const GetlistApi = (parm: ListCategoryParm) => {
    return http.get("/api/category/list", parm)
}

export const editApi = (parm: category_model) => {
    return http.put("/api/category", parm)
}

export const deleteApi = (categoryId: string) => {
    return http.delete(`/api/category/${categoryId}`);
};

export const GetSelectApi = () => {
    return http.get("/api/category/getSelectList")
}