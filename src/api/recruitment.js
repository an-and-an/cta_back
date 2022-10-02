import request from '@/utils/request'
//获取所有的部门
export const GetAllDepartment = () => {
  return request({
    url: '/recruitment/getAllDepartment',
    method: 'get',
  })
}
//获取所有状态
export const GetStatus = () => {
  return request({
    url: '/recruitment/getStatus',
    method: 'get',
  })
}
//获取所有干事申请表
export const GetRecruitment = data => {
  return request({
    url: '/recruitment/getRecruitment',
    method: 'get',
    params: data
  })
}
//查询干事申请表
export const FindOne = (data) => {
  return request({
    url: `/recruitment/findOne`,
    method: 'get',
    params: data
  })

}
//初筛
export const FirstTrialRecruitment = (data) => {
  return request({
    url: `/recruitment/firstTrialRecruitment/${data.id}/${data.status}`,
    method: 'patch',
    // query: {
    //   name: 1
    // }
  })
}
//预录取
export const SetOfficial = (data) => {
  return request({
    url: `/recruitment/setOfficial/${data.id}/${data.department}/${data.res}`,
    method: 'patch',
  })
}
//最终录取
export const FinallySendOffer = (data) => {
  return request({
    url: "/recruitment/finallySendOffer",
    method: "get",
    params: data

  })
}