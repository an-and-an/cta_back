import request from '@/utils/request'
//获取所有活动列表
export const GetAllActiveList = () => {
  return request({
    url: '/active-time/getAllActiveList',
    method: 'get',
  })
}
//设置活动开始时间
export const SetStartTime = (data) => {
  return request({
    url: `/active-time/setStartTime/${data.name}/${data.time}`,
    method: 'patch',
  })
}
//设置活动结束时间
export const SetEndTime = (data) => {
  return request({
    url: `/active-time/setEndTime/${data.name}/${data.time}`,
    method: 'patch',
  })
}
// 查询活动是否处于活动状态
export const queryActive = (activeName) => {
  return request({
    url: `/active-time/get/${activeName}`,
    method: 'get'
  })
}
