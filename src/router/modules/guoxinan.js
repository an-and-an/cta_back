import { ROLES_OPTIONS } from '@/directive/roles';
const Layout = () => import("@/layout/index.vue")
const Work = () => import("@/views/A-My-views/guoxinan/work/index.vue")
const Rating = () => import("@/views/A-My-views/guoxinan/rating/index.vue")
const WorkAndScore = () => import('@/views/A-My-views/guoxinan/work_and_score/index.vue')
const Score = () => import('@/views/A-My-views/guoxinan/work_score/index.vue')
export default [
  {
    path: '/guoxinan',
    component: Layout,
    name: 'guoxinan',
    meta: { title: '国信安' },
    icon: 'HomeFilled',
    children: [
      {
        path: 'work',
        name: 'work',
        component: Work,
        meta: {
          title: '初审',
          apis: [
            ROLES_OPTIONS['work'].AUDIT,
            ROLES_OPTIONS['work'].REPULSE,
          ]
        },
        icon: 'Collection'
      },
      {
        path: 'rating',
        name: 'rating',
        component: Rating,
        meta: {
          title: '评分',
          apis: [ROLES_OPTIONS['rating'].RATING],
        },
        icon: 'EditPen'
      },
      {
        path: 'work_score',
        name: 'work_score',
        component: WorkAndScore,
        meta: {
          title: '报名队伍',
        },
        icon: 'Tickets'
      },
      {
        path: 'score',
        name: 'score',
        component: Score,
        meta: {
          title: '作品分数',
        },
        icon: 'Tickets'
      },
    ]
  }
]