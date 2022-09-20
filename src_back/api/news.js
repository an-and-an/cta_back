import request from '@/utils/request'
export const GetTable = (data) => {
  return request({
    url: "/journalism",
    method: "",
    params:data
  })
}
export const SetNews = (data) => {
  return request({
    url: "/journalism",
    method: 'post',
    data
  })
}