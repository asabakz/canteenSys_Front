export type common_func = () => any;

export enum Title {
    ADD = '新增',
    EDIT = '编辑'
}

export enum edit_status {
    ADD = '0',
    EDIT = '1'
}

//图片上传用
export type imgType = {
    newImgUrl: Array<{ url: string }>;
    deleteImgUrl: Array<{ url: string }>;
}