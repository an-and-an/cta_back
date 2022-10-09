const Layout = () => import('@/layout/index.vue');
const NewsHome = () => import("@/views/A-My-views/news/index.vue")
export default [
    {
        path: '/news',
        component: Layout,
        name: 'news',
        meta: { title: '新闻管理' },
        icon: 'DocumentCopy',
        children: [
            {
                path: '',
                name: 'news1',
                component: NewsHome,
                meta: { title: '新闻管理' },
                icon: 'DocumentCopy'
            },
        ]

    }
]