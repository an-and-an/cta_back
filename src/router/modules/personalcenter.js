const PersonalCenter = () => import('@/views/A-My-views/personal/index.vue')
const Layout = () => import("@/layout/index.vue")
export default [{
  path: "/personalcenter",
  name: 'personalcenter',
  meta: { title: '个人中心' },
  icon: 'el-icon-location',
  component: Layout,
  children: [
    {
      path: '',
      name: 'personalcenter1',
      meta: { title: '个人中心2' },
      component: PersonalCenter,
      icon: 'el-icon-location',
    }
  ]
}]