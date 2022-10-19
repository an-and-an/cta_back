const Layout = () => import("@/layout/index.vue")
const Credit = () => import('@/views/A-My-views/competition_credit/index.vue')
export default [
  {
    path: '/credit',
    name: 'credit',
    component: Layout,
    meta: { title: '竞赛积分' },
    icon: 'Odometer',
    children: [
      {
        path: '',
        name: 'credit1',
        component: Credit,
        meta: { title: '竞赛积分' },
        icon: 'Odometer',
      },
    ]
  },
]
