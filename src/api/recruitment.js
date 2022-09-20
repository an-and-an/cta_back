import request from '@/utils/request'
//获取所有的部门
export const GetAllDepartment = () => {
  return request({
    url: '/recruitment/getAllDepartment',
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
//初筛
export const FirstTrialRecruitment = ({ id, status}) => {
  return request({
    url: `/recruitment/firstTrialRecruitment/${id}/${status}`,
    method: 'patch',
    // query: {
    //   name: 1
    // }
  })
}
//设置干事
export const SetOfficial = ({ id, department}) => {
  return request({
    url: `/recruitment/setOfficial/${id}/${department}`,
    method: 'patch',
    // query: {
    //   name: 1
    // }
  })
}