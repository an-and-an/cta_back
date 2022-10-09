import request from '@/utils/request'
//获取所有轮播图, rank为-1表示不显示，否则按照升序排序
export const GetAllPicture = () => {
  return request({
    url: '/banner',
    method: 'get',
  })

}
// 新建一个轮播图
export const SetNewPictures = (data) => {
  return request({
    url: '/banner',
    method: 'post',
    data
  })
}
// 更新轮播图信息
export const UpdatePictures = (data) => {
  return request({
      url: '/banner',
    method: 'put',
      data
    })

}
// 删除一个轮播图
export const DeletePictures = (id) => {
  return request({
      url: `/banner/${id}`,
      method: 'delete',
    })
}