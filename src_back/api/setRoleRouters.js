import request from '@/utils/request'
export const setRoleRouters = (data) => {
  return request({
    method: "post",
    url: "/routers/setRoleRouters",
    data: data
  })
}
// /routers/getRouterByRole/
export const getRouterByRole = role => {
  return request({
    method: 'get',
    url: '/routers/getRouterByRole/' + role
  })
}