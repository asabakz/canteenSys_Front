// 列表参数类型
export type DishListParm = {
    currentPage: number;
    pageSize: number;
    dishName: string;
    total: number; // 分页的总条数
}

// 定义了规格类型
export type dish_specs_model = {
    specsId?: string;
    dishId?: string;
    specsName: string;
    dishPrice: string | number;
    orderNum: string;
};

// 定义了商品类型
export type dish_model = {
    type: string;
    dishId: string;
    categoryId: string;
    dishName: string;
    dishImage: string;
    dishIntro: string;
    hot: string;
    dishUnit: string;
    orderNum: string;
    specs: Array<dish_specs_model>;
};

