const Layout = () => import("@/layout/index.vue")
export default [
    {
        path: '/materials',
        component: Layout,
        name: 'materials',
        meta: { title: '竞赛题库' },
        icon: 'Folder',
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