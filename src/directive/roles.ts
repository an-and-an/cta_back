import store from '@/store';
export const ROLES_KEY = {
  CREATE:  0b00000001,  // 新建
  UPDATE:  0b00000010,  // 更新
  DELETE:  0b00000100,  // 删除
  AUDIT:   0b00001000,  // 审核
  REPULSE: 0b00010000,  // 打回（将审核通过的作品打回）
  RATING:  0b00100000,  // 打分（特用于国信安打分）
}

const OPTIONS: any = {
  CREATE: {
    label: 'CREATE',
    value: ROLES_KEY.CREATE
  },
  UPDATE: {
    label: 'UPDATE',
    value: ROLES_KEY.UPDATE
  },
  DELETE: {
    label: 'DELETE',
    value: ROLES_KEY.DELETE
  },
  AUDIT: {
    label: 'AUDIT',
    value: ROLES_KEY.AUDIT
  },
  REPULSE: {
    label: 'REPULSE',
    value: ROLES_KEY.REPULSE
  },
  RATING: {
    label: 'RATING',
    value: ROLES_KEY.RATING
  }
}
const _1: any = {
  _prefix: '',
  _idx: 0,
}
export const ROLES_OPTIONS = new Proxy(_1, {
  get: function(target, key, receiver) {
    if (target._idx === 0) {
      target._prefix = key as string;
      target._idx ++;
      return receiver;
    }
    if (target._idx === 1 && key in OPTIONS) {
      const temp = JSON.parse(JSON.stringify(OPTIONS[key]));
      temp.label = target._prefix + '_' + temp.label;
      target._idx = 0;
      return temp;
    }
  }
})
/**
 * @param x {number} 需要检查的权限
 * @param value {number} 用户当前权限
 */
const check = (x: number, value: number): boolean => (value&x) === x;
function getApis(name: string, api_value: number): string[] {
  const res: string[] = [];
  for (const key in OPTIONS) {
    if (check(OPTIONS[key].value, api_value)) {
      res.push(`${name}_${OPTIONS[key].label}`);
    }
  }
  return res;
}
export function getRouterApiTree(routers: any[]): string[] {
  const res: string[] = [];
  for (let i = 0; i < routers.length; i ++ ) {
    // 非叶子节点，有子节点
    if (routers[i].children && routers[i].children!.length > 0) {
      res.push(...getRouterApiTree(routers[i].children));
    }
    // 叶子节点
    if (routers[i].children!.length === 0) {
      // apis不为零：处理api
      if (routers[i].api_value !== 0) {
        const apiNames = getApis(
          routers[i].name,
          routers[i].api_value as number
        );
        res.push(...apiNames);
      } else {
        // apis为0，不需要任何处理
        res.push(routers[i].name)
      }

    }
  }
  return res;
}
function getDefineRouter(menus: any): number {
  const hash = location.hash;
  for (let i = 0; i < menus.length; i ++ ) {
    if (hash.includes(menus[i].url)) {
      // 如果没有子孩子了，那么就返回当前的值
      if (!menus[i].children) return menus[i].api_value;
      else return getDefineRouter(menus[i].children);
    }
  }
  return -1;
}
export const Roles = (app: any) => {
  app.directive('myRoles', {
    mounted: function(el: any, binding: any) {
      const { state }: any = store;
      const _1: any = getDefineRouter(state.menu.menus);
      if (!check(binding.value, _1)) {
        el.parentNode.removeChild(el);
      }
    }
  });
}
export function isShowComponent(operator: number) {
  const { state }: any = store;
  const _1: any = getDefineRouter(state.menu.menus);
  return check(operator, _1);
}