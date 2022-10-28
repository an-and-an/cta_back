const Layout = () => import('@/layout/index.vue')
const AllDepartment = () => import('@/views/A-My-views/recruitment/ctaAccountant/index.vue')
const recruitmentFirstTrial = () => import('@/views/A-My-views/recruitment/recruitmentFirstTrial/index.vue')
const recruitmentFinallyAccept = () => import('@/views/A-My-views/recruitment/recruitmentFinallyAccept/index.vue')
const recruitmentAccept = () => import('@/views/A-My-views/recruitment/recruitmentAccept/index.vue')
const recruitmentAccepted = () => import('@/views/A-My-views/recruitment/Accepted/index.vue')

export default [{
  path: '/recruitment',
  name: 'recruitment',
  component: Layout,
  meta: { title: '部门管理' },
  icon: 'OfficeBuilding',
  children: [
    {
      path: '',
      name: 'recruitment1',
      component: AllDepartment,
      meta: { title: '部门管理' },
      icon: 'OfficeBuilding',
    },
    {
      path: 'recruitmentFirstTrial',
      name: 'recruitmentFirstTrial',
      component: recruitmentFirstTrial,
      meta: { title: '干事申请表初筛' },
      icon: 'User',
    },
    {
      path: 'recruitmentAccept',
      name: 'recruitmentAccept',
      component: recruitmentAccept,
      meta: { title: '干事申请表录取' },
      icon: 'User',
    },
    {
      path: 'recruitmentFinallyAccept',
      name: 'recruitmentFinallyAccept',
      component: recruitmentFinallyAccept,
      meta: { title: '干事申请表最终录取' },
      icon: 'User',
    },
    {
      path: 'recruitmentAccepted',
      name: 'recruitmentAccepted',
      component: recruitmentAccepted,
      meta: { title: '已预录取干事' },
      icon: 'User',
    },
  ]
}]