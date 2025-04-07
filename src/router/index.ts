import { createRouter, createWebHistory } from 'vue-router'
// 使用类型导入的方式
import type { RouteRecordRaw } from 'vue-router'
import Layout from '../layout/index.vue'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        component: Layout,
        redirect: 'category',
        children: [
            {
                path: '/dish_manage',
                name: 'Dish_manage',
                component: () => import('../views/dish_manage/index.vue'),
                meta: {
                    title: "菜品管理"
                }
            },
            {
                path: '/homepage',
                name: 'Homepage',
                component: () => import('../views/homepage/index.vue'),
                meta: {
                    title: "主页"
                }
            },
            {
                path: '/user_manage',
                name: 'User_manage',
                component: () => import('../views/user_manage/index.vue'),
                meta: {
                    title: "用户管理"
                }
            },
            {
                path: '/order_manage',
                name: 'Order_manage',
                component: () => import('../views/order_manage/index.vue'),
                meta: {
                    title: "订单管理"
                }
            },
            {
                path: '/statistic',
                name: 'Statistic',
                component: () => import('../views/statistic/index.vue'),
                meta: {
                    title: "统计分析"
                }
            },
            {
                path: '/comment_manage',
                name: 'Comment_manage',
                component: () => import('../views/comment_manage/index.vue'),
                meta: {
                    title: "评论管理"
                }
            },
            {
                path: '/category',
                name: 'Category',
                component: () => import('../views/category/index.vue'),
                meta: {
                    title: "菜品分类"
                }
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
