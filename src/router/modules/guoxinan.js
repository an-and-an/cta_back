const Layout = () => import("@/layout/index.vue")
const GuoXinAn = () => import("@/views/A-My-views/guoxinan/index.vue")
const Rating = () => import("@/views/A-My-views/guoxinan/rating/index.vue")
const Work = () => import("@/views/A-My-views/guoxinan/work/index.vue")
export default [
  {
    path: '/guoxinan',
    component: Layout,
    name: 'guoxinan',
    meta: { title: '国信安' },
    icon: 'HomeFilled',
    children: [
      {
        path: '',
        name: 'guoxinan1',
        component: GuoXinAn,
        meta: { title: '国信安' },
        icon: 'HomeFilled'
      },
      {
        path: 'rating',
        name: 'rating',
        component: Rating,
        meta: { title: '评分' },
        icon: 'EditPen'
      },
      {
        path: 'work',
        name: 'work',
        component: Work,
        meta: { title: '国信安作品' },
        icon: 'Collection'
      },
    ]
  }
]