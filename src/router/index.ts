import { createRouter, createWebHashHistory } from 'vue-router'

import redirect from './modules/redirect'
import error from './modules/error'
import login from './modules/login'
import lock from './modules/lock'
/* 菜单栏的路由 */
// 固定菜单
export const fixedRoutes = [...personalcenter]
// 动态菜单
import users from './modules/users'
import admins from './modules/admins'
import news from './modules/news'
import materials from './modules/materials'
import personalcenter from './modules/personalcenter'
import guoxinan from './modules/guoxinan'
import recruitment from './modules/recruitment'
import active from './modules/active'
import banner from './modules/banner'
import competition_credit from './modules/competition_credit'
export const asyncRoutes = [
  ...users,
  ...admins,
  ...recruitment,
  ...news, 
  ...banner,
  ...active,
  ...guoxinan,
  ...competition_credit,
  ...materials,
]

export const asyncRoutesTree = (function print(routers: any[]): any[] {
  const res: any[] = []
  routers.forEach((router) => {
    const { meta, name, children }: any = router
    const ans: any = {
      title: meta?.title as string,
      name: <string>name,
      children: [],
      isYear: false,
      isApi: false,
    }
    if (children) ans.children = print(children)
    else {
      ans.isYear = true;
      ans.children = meta!.apis?.map((v: any) => ({
        name: v.label as string,
        title: v.label as string,
        isApi: true,
        isYear: false,
        value: v.value as number,
      }))
    }
    res.push(ans);
  });
  return res;
})(asyncRoutes);
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/personalcenter',
    },
    ...redirect, // 统一的重定向配置
    ...login,
    ...lock,
    ...fixedRoutes,
    ...error,
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { left: 0, top: 0 }
    }
  },
})
export default router
