const Layout = () => import('@/layout/index.vue')
const Admin = () => import('@/views/A-My-views/users/index.vue')
const CtaAccountant = () => import('@/views/A-My-views/recruitment/ctaAccountant/index.vue')
export default [{
    path: '/users',
    component: Layout,
    name: 'users',
    meta: { title: '用户管理' },
    icon: 'User',
    children: [
        {
            path: '',
            name: 'users1',
            component: Admin,
            meta: { title: '用户管理' },
            icon: 'User'
        },
    ]
}]