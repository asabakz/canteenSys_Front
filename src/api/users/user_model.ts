export type ListUserParm = {
    currentPage: number;//当前页面
    PageSize: number; //页面显示条数
    user_name: string;
    phone_number: string;
    total: number;
}

export type user_model = {
    type: string
    userId: number
    userName: string
    password: string
    phoneNumber: string
    email: string
    sex: string
    realName: string
}