import request from '@/utils/request'
// 获取题目列表
export const GetQuestionList = (data) => {
  return request({
      url: `/computer_competition`,
      method: 'get',
      params: data
    })
}
// 新建一个题目
export const SetNewQuestion = (data) => {
  return request({
      url: `/computer_competition`,
      method: 'post',
      data: data
    })
}
// 更新题目信息
export const UpdateQuestion = (data) => {
  return request({
    url: `/computer_competition`,
    method: 'post',
    data: data
  })
}
// 删除一个题目
export const DeleteQuestion = (id) => {
  return new Promise((resolve, reject) => {
    request({
      url: `/computer_competition/${id}`,
      method: 'delete',
    })
  })
}
