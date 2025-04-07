import http from "../../http"
import type { ListUserParm, user_model } from "./user_model"

export const addUserApi = (parm: user_model) => {
    return http.post("/api/users", parm)
}

export const userListApi = (parm: ListUserParm) => {
    return http.get("/api/users/list", parm)
}

export const editUserApi = (parm: user_model) => {
    return http.put("/api/users", parm)
}

export const deleteUserApi = (userId: number) => {
    return http.delete(`/api/users/${userId}`);
};

