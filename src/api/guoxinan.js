import request from '@/utils/request'
//获取所有的作品表单
export const GetAllProject = () => {
  return request({
    url: '/gxa',
    method: 'get',
  })
}
//打分
export const SetScore = (data) => {
  return request({
    url: '/gxa',
    method: 'put',
    data
  })
}
//获取作品信息
export const GetAllWorkAndScore = () => {
  return request({
    url: '/gxa/getAllWorkAndScore',
    method: 'get',
  })
}
//国信安作品初审
export const FirstTrialGxaWork = (data) => {
  return request({
    url: `/gxa/firstTrialGxaWork/${data.id}/${data.status}`,
    method: 'patch'
  })
}
//获取所有未审核或或已拒绝的作品
export const GetUnapprovedWork = () => {
  return request({
    url: '/gxa/getUnapprovedWork/',
    method: 'get',
  })
}