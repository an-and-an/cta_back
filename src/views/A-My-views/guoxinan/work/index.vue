<script setup>
import { GetAllWorkAndScore } from '@/api/guoxinan'
import { reactive } from 'vue';
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
getAllWorkAndScore()
//
</script>
<template>
  <div>
    <workInfoTable :tableInfo="workInfoList" />
  </div>
</template>
<style>

</style>