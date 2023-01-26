/*
 * @Descripttion:
 * @version:
 * @Date: 2021-04-20 11:06:21
 * @LastEditors: huzhushan@126.com
 * @LastEditTime: 2021-07-26 18:22:01
 * @Author: huzhushan@126.com
 * @HomePage: https://huzhushan.gitee.io/vue3-element-admin
 * @Github: https://github.com/huzhushan/vue3-element-admin
 * @Donate: https://huzhushan.gitee.io/vue3-element-admin/donate/
 */
import { fixedRoutes, asyncRoutes } from '@/router'
import { GetMenus } from '@/api/menu'
import router from '@/router'
import adminRouter from '@/router/modules/admins';
// const hasPermission = (role, route) => {
//   if (!!route.meta && !!route.meta.roles && !route.meta.roles.includes(role)) {
//     return false
//   }
//   return true
// }
function addRootMenu(filterRoutes) {
  let idx = filterRoutes.findIndex(route => route.name === 'admins');
  if (idx === -1) {
    const { children, ...rest } = adminRouter[0];
    const route = {
      ...rest,
      children: [children[1]],
    }
    filterRoutes.unshift(route);
  } else {
    idx = filterRoutes[idx].children.findIndex(
      (route) => route.name === 'getRoutersByRole'
    );
    if (idx === -1) {
      filterRoutes[idx].children.push(adminRouter[0].children[1]);
    }
  }
}
const generateUrl = (path, parentPath) => {
  return path.startsWith('/')
    ? path
    : path
      ? `${parentPath}/${path}`
      : parentPath
}

const getFilterRoutes = (targetRoutes, ajaxRoutes) => {
  const filterRoutes = [];
  if (!ajaxRoutes) return [];
  ajaxRoutes?.forEach(item => {
    const target = targetRoutes.find(target => target.name === item.name);
    if (target) {
      const { children: targetChildren, ...rest } = target;
      if (rest.meta.apis) {
        delete rest.meta.apis;
        rest.meta.api_value = item.api_value;
      }
      const route = {
        ...rest,
      }
      if (item.children) {
        route.children = getFilterRoutes(targetChildren, item.children)
      }
      filterRoutes.push(route)
    }
  })

  return filterRoutes
}

const getFilterMenus = (arr, parentPath = '') => {
  const menus = []
  arr.forEach(item => {
    if (!item.hidden) {
      const menu = {
        url: generateUrl(item.path, parentPath),
        title: item.meta.title,
        icon: item.icon,
        api_value: item.meta.api_value || 0,
        children: []
      }
      // 还要判断他的长度，如果没有的话，就没有必要操作了
      // 因为下面的if是使用的第0个元素，如果第0个元素不存在，那么就会error
      // 但是他不直接报错
      if (item.children && item.children.length != 0) {
        if (item.children.filter((child) => !child.hidden).length <= 1) {
          menu.url = generateUrl(item.children[0].path, menu.url);
          menu.api_value = item.children[0].meta?.api_value || 0;
        } else {
          menu.children = getFilterMenus(item.children, menu.url)
        }
      }
      if (menu.children?.length === 0) delete menu.children
      menus.push(menu)
    }
  })

  return menus
}

export default {
  namespaced: true,
  state: {
    menus: [],
  },
  mutations: {
    SET_MENUS(state, data) {
      state.menus = data
    },
  },
  actions: {
    async generateMenus({ commit, dispatch }, userinfo) {
      try {
        let { code, data } = await GetMenus();
        if (+code === 0) {
          // 过滤出需要添加的动态路由
          const filterRoutes = getFilterRoutes(asyncRoutes, data)
          const t = await dispatch('account/getUserinfo', null, { root: true });
          if (t.roles.id === 21) addRootMenu(filterRoutes);
          filterRoutes.forEach(route => router.addRoute(route))
          // 生成菜单
          const menus = getFilterMenus([...fixedRoutes, ...filterRoutes])
          commit('SET_MENUS', menus)
        }
      } catch (error) {
        throw new Error(error.message)
      }
    },
  },
}
