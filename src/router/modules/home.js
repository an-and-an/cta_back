const Layout = () => import('@/layout/index.vue')
const Home = () => import('@/views/home/index.vue')
const Test = () => import('@/views/A-My-views/personal/index.vue')
export default [
  {
    path: '/home',
    component: Layout,
    name: 'Dashboard',
    meta: {
      title: '工作台',
    },
    icon: 'House',
    children: [
      {
        path: '',
        name: 'home',
        component: Test,
        meta: {
          title: '首页',
          affix: true,
        },
      },
    ],
  },
]
