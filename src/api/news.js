import request from '@/utils/request'
import { ElMessage, ElNotification } from 'element-plus'
//获取所有表
export const GetTable = (data) => {
  return request({
    url: "/journalism",
    method: "get",
    params: data
  })
}
//新建一个新闻
export const SetNews = (data) => {
  return request({
    url: "/journalism",
    method: 'post',
    data
  })
}
//修改一个新闻内容
export const ModifyNews = (data) => {
  return new Promise((resolve, reject) => {
    request({
      url: "/journalism",
      method: 'put',
      data: data,
    }).then(res => {
      if (res.code === 0) {
        isShowModify.value = false
        ElMessage({
          type: 'success',
          message: '成功提交修改！',
          offset: 250,
          duration: 1000,
        })
      } else {
        ElMessage({
          type: 'error',
          message: res.message,
          offset: 250,
          duration: 2000,
        })
      }

    })
  })
}
//审核通过/拒绝新闻
export const AuditNews = (data, id) => {
  return new Promise((resolve, reject) => {
    request({
      url: `/journalism/audit/${id}`,
      method: 'patch',
      params: data
    }).then(res => {
      if (res.code === 0) {
        ElMessage({
          type: 'success',
          message: '审核成功！',
          offset: 250,
          duration: 1000
        })
      } else {
        ElMessage({
          type: 'error',
          message: res.message,
          offset: 250,
          duration: 2000,
        })
      }
    })
  })
}
//对已审核的作品进行打回，取消公示
export const RepoulseNews = (data) => {
  console.log("the id is---", data);
  return new Promise((resolve, reject) => {
    request({
      url: '/journalism/repulseJournalism',
      method: 'patch',
      params: data
    }).then(res => {
      if (res.code === 0) {
        ElMessage({
          type: 'success',
          message: '已打回！',
          offset: 250,
          duration: 1000,
        })
      } else {
        ElMessage({
          type: 'error',
          message: res.message,
          offset: 250,
          duration: 10000,
        })
      }
    })
  })
}

