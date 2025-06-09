import type { ListConstructorProps } from "element-plus";
import http from "../../http";
import type { CommentListParm } from "./CommentModel";

export const GetlistApi = (parm: CommentListParm) => {
    return http.get("/wxapi/comment/manageCommentList", parm)
}

export const deleteApi = (commentId:string) => {
    return http.delete(`/wxapi/comment/${commentId}`)
}