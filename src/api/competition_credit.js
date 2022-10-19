import request from '@/utils/request'
//创建一个积分记录
export const SetRecord = (data) => {
  return request({
    url: '/algorithm-integral',
    method: 'post',
    data,
  })

}
// 更新一个积分记录
export const UpdateRecord = (data) => {
  return request({
    url: '/algorithm-integral',
    method: 'patch',
    data,
  })
}
// 通过id删除记录
export const DeleteRecord = (id) => {
  return request({
    url: `/algorithm-integral`,
    method: 'delete',
    params:id,
  })

}
// 获取/查询积分记录, public
export const GetRecord = (data) => {
  return request({
    url: `/algorithm-integral`,
    method: 'get',
    params:data,
  })
}