const Layout = () => import("@/layout/index.vue")
export default [
  {
    path: '/guoxinan',
    component: Layout,
    name: 'guoxinan',
    meta: { title: '国信安' },
    icon: 'el-icon-location',
    children: [
      {
        path: '',
        name: 'guoxinan1',
        component: () => import("@/views/A-My-views/guoxinan/index.vue"),
        meta: { title: '国信安' },
        icon: 'el-icon-location'
      },
      {
        path: 'rating',
        name: 'rating',
        component: () => import("@/views/A-My-views/guoxinan/rating/index.vue"),
        meta: { title: '评分' },
        icon: 'el-icon-location'
      },
      {
        path: 'work',
        name: 'work',
        component: () => import("@/views/A-My-views/guoxinan/work/index.vue"),
        meta: { title: '国信安作品' },
        icon: 'el-icon-location'
      },
    ]
  }
]