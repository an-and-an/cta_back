<script setup>
import { GetAllWorkAndScore, GetUnapprovedWork } from '@/api/guoxinan'
import { ref,reactive } from 'vue';
import workInfoTable from './ChildComponent/workInfoTable.vue'
//获取所有的作品信息
const workInfoList = reactive([])
const getAllWorkAndScore = () => {
  GetAllWorkAndScore().then(res => {
    workInfoList.splice(
      0,
      workInfoList.length,
      ...res.data
    )
    console.log(workInfoList);
    console.log("成功获取所有作品");
  })
}
// getAllWorkAndScore()
//获取所有未审核或拒绝的作品
const staticWorkList = ref([])
const dynamicWorkList = ref([])
const getUnapprovedWork = () => {
  GetUnapprovedWork().then(res => {
    console.log(res.data.dynamic);
    
  })
}
getUnapprovedWork()

</script>
<template>
  <div>
    <workInfoTable :tableInfo="workInfoList" />
  </div>
</template>
<style>

</style>