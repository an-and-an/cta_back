const Layout = () => import('@/layout/index.vue');
const Banner = () => import('@/views/A-My-views/banner/index.vue')
export default [
  {
    path: '/banner',
    name: 'banner',
    component: Layout,
    meta: { title: '轮播图' },
    icon: 'Picture',
    children: [
      {
        path: '',
        name: 'banner1',
        component: Banner,
        meta: { title: '轮播图' },
        icon: 'Picture'
      },
    ]

  }
]