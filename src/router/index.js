import { createRouter, createWebHashHistory } from 'vue-router'

import redirect from './modules/redirect'
import error from './modules/error'
import login from './modules/login'
import lock from './modules/lock'
import home from './modules/home'
/* 菜单栏的路由 */
// 固定菜单
export const fixedRoutes = [...home]

// 动态菜单
import users from './modules/users';
import admins from './modules/admins'
import news from './modules/news'
import materials from './modules/materials'
import personalcenter from './modules/personalcenter'
import guoxinan from './modules/guoxinan'
import recruitment from './modules/recruitment'
import active from './modules/active'
import banner from './modules/banner'
export const asyncRoutes = [
  ...users,
  ...admins,
  ...news,
  ...materials,
  ...personalcenter,
  ...guoxinan,
  ...recruitment,
  ...active,
  ...banner,
]
// console.log(asyncRoutes);


const res = (function print(routers) {
  const res = []
  routers.forEach((router) => {
    // res.push({
    //   title: router.meta.title,
    //   name: router.name,
    //   children: router.children ? print(router.children) : []
    // })
    // console.log(router);
    const { meta, name, children } = router
    const ans = { title: meta.title, name }
    if (children) {
      ans.children = print(children)
    }
    res.push(ans);
  });
  return res;
})(asyncRoutes);

//console.log(res);
// asyncRoutes.forEach((item))
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/home',
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
