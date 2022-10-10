<script setup>
import { GetAllWorkAndScore } from '@/api/guoxinan'
import { ref, reactive } from 'vue'
import workDisplay from './ChildComponent/workDisplay.vue'
//获取所有的作品信息
const workInfoList = reactive([])
const getAllWorkAndScore = () => {
  GetAllWorkAndScore().then(res => {
    // workInfoList.splice(
    //   0,
    //   workInfoList.length,
    //   ...res.data
    // )
    console.log(res);
    console.log("成功获取所有作品");
  })
}
getAllWorkAndScore()
</script>
<template>
  <div>
    <workDisplay />
  </div>
</template>
