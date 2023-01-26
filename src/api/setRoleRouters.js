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
export const updateRoleInfo = ({ id, roleName, roleDescription }) => {
  return request({
    method: "PUT",
    url: '/routers/updateRoleInfo',
    data: { id, roleName, roleDescription }
  })
}

export const addRoleApi = ({ roleName, roleDescription }) => {
  return request({
    method: "POST",
    url: '/routers/createRoles',
    data: { roleName, roleDescription }
  })
}

export const deleteRoleApi = id => {
  return request({
    method: "DELETE",
    url: `/routers/deleteRoles/${id}`,
  })
}