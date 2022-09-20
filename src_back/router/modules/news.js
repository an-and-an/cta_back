const Layout = () => import('@/layout/index.vue');
export default [
    {
        path: '/news',
        component: Layout,
        name: 'news',
        meta: { title: '新闻管理' },
        icon: 'el-icon-location',
        children: [
            {
                path: '',
                name: 'news1',
                component: () => import("@/views/A-My-views/news/index.vue"),
                meta: { title: 'news1' },
                icon: 'el-icon-location'
            },
        ]

    }
]