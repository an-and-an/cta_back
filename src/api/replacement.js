import request from '@/utils/request'
//换届，把之前的所有干部入库，同时取消他们的身份, 降级为会员
export const Replacement = () => {
  return request({
    url: '/replacement',
    method: 'get',
  })
}
//获取当届的干部, public
export const GetAllCadres = () => {
  return request({
    url: '/replacement/getAllCadres',
    method: 'get',
  })
}
//获取往届干部， public
export const GetAllFormerCadres = (session) => {
  return request({
    url: `/replacement/getFormerCadres/${session}`,
    method: 'get',
  })
}
//设置干部
export const SetCadres = (data) => {
  return request({
    url: `/replacement/setCadres`,
    method: 'patch',
    params: data
  })
}