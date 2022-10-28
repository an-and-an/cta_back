const Layout = () => import("@/layout/index.vue")
const Lib=() => import("@/views/A-My-views/materials/index.vue")
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
                component: Lib,
                meta: { title: '竞赛题库' },
                icon: 'el-icon-location'
            },
        ]
    }
]