const Layout = () => import('@/layout/index.vue')
const Admin = () => import('@/views/A-My-views/users/index.vue')
export default [{
    path: '/users',
    component: Layout,
    name: 'users',
    meta: { title: '用户管理' },
    icon: 'el-icon-location',
    children: [
        {
            path: '',
            name: 'users1',
            component: Admin,
            meta: { title: '用户管理' },
            icon: 'el-icon-location'
        },
        // {
        //     path: 'second',
        //     name: 'second',
        //     component: () => import("@/views/A-My-views/users/second.vue"),
        //     meta: { title: 'second' },
        //     icon: 'el-icon-location'
        // },
    ]
}]