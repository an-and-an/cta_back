const Layout = () => import('@/layout/index.vue')
const AllDepartment = () => import('@/views/A-My-views/recruitment/alldepartment/index.vue')
const RecruitmentList = () => import('@/views/A-My-views/recruitment/recruitmenList/index.vue')
export default [{
  path: '/recruitment',
  name: 'recruitment',
  component: Layout,
  meta: { title: '部门管理' },
  icon: 'el-icon-location',
  children: [
    {
      path: '',
      name: 'recruitment1',
      component: AllDepartment,
      meta: { title: '部门管理' },
      icon: 'el-icon-location',
    },
    {
      path: 'recruitmentlist',
      name: 'recruitmentlist',
      component: RecruitmentList,
      meta: { title: '干事申请表' },
      icon: 'el-icon-location',
    },
  ]
}]