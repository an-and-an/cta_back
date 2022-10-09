<template>
  <div>
    <div class="box">
      <h5>首页轮播图</h5>
      <PreviewPicture :picture="groupName" :fileList="indexBannerList" @update="updateBannerList" />
    </div>
    <div class="box">
      <h5>不显示的轮播图</h5>
      <TempPicture :picture="groupName" :fileList="tempList" @add="setTempPicture" @delete="deleteTempPicture"
        @move="moveTo" />
    </div>
    <div class="box">
      <h5>国信安页轮播图</h5>
      <gxaPreviewPicture :picture="groupName" :fileList="gxaBannerList" @update="updateBannerList" />
    </div>
  </div>
</template>
<script setup>
import PreviewPicture from './Component/PreviewPicture.vue'
import TempPicture from './Component/TempPicture.vue'
import gxaPreviewPicture from './Component/gxaPreviewPicture.vue'
import { ref } from 'vue'
import { GetAllPicture, SetNewPictures, UpdatePictures, DeletePictures } from '@/api/banner'
//
const groupName = ref('picture')
//获取所有轮播图
const total = ref()
const pictureList = ref([])
const getAllPicture = () => {
  GetAllPicture().then(res => {
    total.value = res.total
    pictureList.value = res.list
    tempList.value = pictureList.value.filter(item => item.rank === -1)
    indexBannerList.value = pictureList.value.filter(item => item.rank != -1 && item.rank % 2 === 0)
    lastIndexPicture.value = (indexBannerList.value.length) * 2
    gxaBannerList.value = pictureList.value.filter(item => item.rank != -1 && item.rank % 2 === 1)
    lastGxaPicture.value = (gxaBannerList.value.length) * 2 + 1
  })
}
getAllPicture()
//最后一张国信安轮播图
const lastGxaPicture = ref()
const lastIndexPicture = ref()
const indexBannerList = ref([])
const gxaBannerList = ref([])
const tempList = ref([])
//新建轮播图
const setTempPicture = (info) => {
  SetNewPictures(info).then(res => {
    console.log('成功新建轮播图')
    getAllPicture()
  })
}
//更新轮播图
const updateBannerList = (obj) => {
  UpdatePictures(
    {
      id: obj.id,
      href: obj.href,
      url: obj.url,
      name: obj.name,
      rank: obj.rank,
    }
  ).then(res => {
    console.log('成功更新轮播图');
    getAllPicture()
  })
}
//移动
const moveTo = (obj, dir) => {
  // 加入首页
  if (dir) {
    obj.rank = lastIndexPicture.value
    updateBannerList(obj)
  }
  // 加入国信安
  else {
    obj.rank = lastGxaPicture.value
    updateBannerList(obj)
  }
}
//删除一个轮播图
const deleteTempPicture = (id) => {
  DeletePictures(id).then(res => {
    if (res.code == 0) {
      console.log('删除成功！')
      getAllPicture()
    }
  })
}
</script>
<style scoped>
.box {
  display: block;
  margin-bottom: 50px;
  width: 100vw;
  height: 20vh;

}
</style>