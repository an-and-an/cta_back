import request from '@/utils/request'

// 登录接口
export const Login = data => {
  // data.type = Boolean(data.type === true)
  return request({
    url: '/admin/login',
    method: 'post',
    data,
    // headers: {
    //   'Content-Type': 'application/json'
    // }
  })
}

// 获取登录用户信息
export const GetUserinfo = () => {
  return request({
    url: '/admin/getUserInfo',
    method: 'get',
  })
}
//创建一个管理员
export const CreateAdmin = data => {
  return request({
    url: '/admin/createAdmin',
    method: 'post',
    data,
  })
}
//获取所有管理员
export const GetAllAdmin = (data) => {
  // if (!data.username) delete data.username
  return request({
    url: '/admin/getAllAdmin',
    method: 'get',
    params: data,
    // data: data,
  })
}
//修改管理员密码
export const SetAdminPassword = (data) => {
  return request({
    url: '/admin/setAdminPassword',
    method: 'patch',
    data
  })
}
//删除管理员
export const DeleteAdmin = (adminid) => {
  return request({
    url: `/admin/deleteAdmin/${adminid}`,
    method: 'delete'
  })
}
//更新个人信息
export const UpdateSelfInfo = (data) => {
  // console.log("data:-------------", data);
  return request({
    url: '/admin/updateSelfInfo',
    method: 'put',
    data
  })
}