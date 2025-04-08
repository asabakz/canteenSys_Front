import type { ListConstructorProps } from "element-plus";
import http from "../../http";
import type { ad_model, AdListParm } from "./AdModel";

export const addApi = (parm: ad_model) => {
    return http.post("/api/ad", parm)
}

export const GetlistApi = (parm: AdListParm) => {
    return http.get("/api/ad/list", parm)
}

export const editApi = (parm: ad_model) => {
    return http.put("/api/ad", parm)
}

export const deleteApi = (adId: string) => {
    return http.delete(`/api/ad/${adId}`);
};
