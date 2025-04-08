export type AdListParm = {
    currentPage: number;
    pageSize: number;
    title: string;
    total: number;
}

// 定义了广告类型
export type ad_model = {
    type: string;
    adId: string;
    dishId: string;
    title: string;
    dishImage: string;
    onload: string;
    orderNum: string;
};