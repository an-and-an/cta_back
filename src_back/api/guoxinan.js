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
  console.log("data:-------------", data);
  return request({
    url: '/gxa',
    method: 'put',
    data
  })
}
//获取作品
export const GetAllWorkAndScore= () => {
  return request({
    url: '/gxa/getAllWorkAndScore',
    method: 'get',
  })
}