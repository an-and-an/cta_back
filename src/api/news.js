import request from '@/utils/request'
//获取所有表
export const GetTable = (data) => {
  return request({
    url: "/journalism",
    method: "get",
    params: data
  })
}
//新建一个新闻
export const SetNews = (data) => {
  return request({
    url: "/journalism",
    method: 'post',
    data
  })
}
//修改一个新闻内容
export const ModifyNews = (data) => {
  return request({
    url: "/journalism",
    method: 'put',
    data: data,
  })
}
//审核通过/拒绝新闻
export const AuditNews = (data, id) => {
  return request({
    url: `/journalism/${id}`,
    method: 'patch',
    params: data
  })
}
//对已审核的作品进行打回，取消公示
export const RepoulseNews = (data) => {
  return request({
    url: '/journalism/repulseJournalism',
    method: 'patch',
    params: data
  })
}