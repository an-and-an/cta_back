<script setup>
import { GetAllWorkAndScore, GetUnapprovedWork, FirstTrialGxaWork } from '@/api/guoxinan'
import { ref, reactive } from 'vue';
import workInfoCard from './ChildComponent/workInfoCard.vue'
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
const rejectedWorkList = ref([])
const getUnapprovedWork = () => {
  GetUnapprovedWork().then(res => {
    console.log(res.data);
    dynamicWorkList.value = res.data.dynamic
    staticWorkList.value = res.data.static
    rejectedWorkList.value = res.data.rejected
  })
}
getUnapprovedWork()
//国信安作品初审
const getFirstTrial = (id,ans) => {
  FirstTrialGxaWork({
    id: id,
    status: ans,
  }).then(res => {
    console.log(res.message);
  })
}
//
</script>
<template>
  <div>
    <div v-for="item in staticWorkList">
      <workInfoCard :work="item" @audit="getFirstTrial"/>
    </div>
  </div>
</template>
<style>

</style>