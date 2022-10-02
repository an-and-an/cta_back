const Layout = () => import("@/layout/index.vue")
const Admin = () => import('@/views/A-My-views/admins/index.vue')
export default [
    {
        path: '/admins',
        name: 'admins',
        component: Layout,
        meta: { title: '管理员管理' },
        icon: 'Avatar',
        children: [
            {
                path: '',
                name: 'admin1',
                component: Admin,
                meta: { title: '管理员列表' },
                icon: 'List',
                children: [

                ]
            },
            {
                path: 'getRoutersByRole',
                name: 'getRoutersByRole',
                component: () => import("@/views/A-My-views/admins/childComponent/getRoutersByRole.vue"),
                meta: { title: '管理员路由设置' },
                icon: 'Place'
            },
        ]
    },
]
