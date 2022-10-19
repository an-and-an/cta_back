import request from '@/utils/request'
// 新建一个获奖信息
export const SetNewAward = (data) => {
  return new Promise((resolve, reject) => {
    request({
      url: `/previous_winners`,
      method: 'post',
      data: data
    })
  })
}
// 更新一个获奖信息
export const UpdateAward = (data) => {
  return new Promise((resolve, reject) => {
    request({
      url: `/previous_winners`,
      method: 'put',
      data: data
    })
  })
}
// 删除一个获奖信息
export const DeleteAward = (id) => {
  return new Promise((resolve, reject) => {
    request({
      url: `/previous_winners/${id}`,
      method: 'put',
    })
  })
}
// 获取获奖者列表 public
export const GetWinners = (data) => {
  return request({
    url: `/previous_winners/getPreviousWinnersList`,
    method: 'get',
    params: data
  })
}