import request from '@/utils/request'
//获取所有的用户（包括会员）
export const GetAllUser = (data) => {
  return request({
    url: '/user',
    method: 'get',
    params: data,
  })
}
//更改用户密码
export const UpdateUserInfo = (data) => {
  return request({
    url: `/user/updateUserInfo`,
    method: 'patch',
    data: data,
  })
}
//删除用户
export const DeleteUser = (id) => {
  return request({
    url: `/user/${id}`,
    method: 'delete',
  })
}
//获取本届所有成员（干事、干部）
export const GetAllOfficial = () => {
  return new Promise((resolve, reject) => {
    request({
      url: '/user/getOfficial',
      method: 'get',
    }).then(res => {
      const { data } = res;
      resolve(data)
    })
  })
}
