import request from '@/utils/request'
//创建一个积分记录
export const SetRecord = (data: any) => {
  return request({
    url: '/algorithm-integral',
    method: 'post',
    data,
  })
}
// 更新一个积分记录
export const UpdateRecord = (data: any) => {
  return request({
    url: '/algorithm-integral',
    method: 'patch',
    data,
  })
}
// 通过id删除记录
export const DeleteRecord = (id: number) => {
  return request({
    url: `/algorithm-integral`,
    method: 'delete',
    params: { id },
  })

}
// 获取/查询积分记录, public
export const GetRecord = (data: any) => {
  return request({
    url: `/algorithm-integral`,
    method: 'get',
    params: data,
  })
}

export const DeleteIntegralByCompititionName = (compititionName: string) => {
  return request({
    url: `/algorithm-integral/deleteIntegralByCompititionName`,
    method: 'delete',
    params: { compititionName },
  })
}