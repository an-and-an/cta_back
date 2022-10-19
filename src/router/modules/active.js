const Layout = () => import("@/layout/index.vue")
const ActiveList = () => import('@/views/A-My-views/active/activeList/index.vue')
export default [
  {
    path: '/active',
    component: Layout,
    name: 'active',
    meta: { title: '活动管理' },
    icon: 'HomeFilled',
    children: [
      {
        path: 'activelist',
        name: 'activelist',
        component: ActiveList,
        meta: { title: '活动列表' },
        icon: 'EditPen'
      },
    ]
  }
]