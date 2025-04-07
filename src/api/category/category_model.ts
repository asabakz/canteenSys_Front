//列表查询参数类型
export type ListCategoryParm = {
    currentPage: number;//当前页面
    pageSize: number; //页面显示条数
    categoryName: string;
    total: number;
}

// 新增分类数据类型
export type category_model = {
    type: string; // 区分新增、编辑
    categoryId: string;
    categoryName: string;
    orderNum: string;
}
