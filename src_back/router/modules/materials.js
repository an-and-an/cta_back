const Layout = () => import("@/layout/index.vue")
export default [
    {
        path: '/materials',
        component: Layout,
        name: 'materials',
        meta: { title: '资料管理' },
        icon: 'el-icon-location',
        children: [
            {
                path: '',
                name: 'material1',
                component: () => import("@/views/A-My-views/materials/index.vue"),
                meta: { title: 'material1' },
                icon: 'el-icon-location'
            },
        ]
    }
]