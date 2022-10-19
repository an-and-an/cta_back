<script setup>
import { GetAllWorkAndScore } from '@/api/guoxinan'
import workDisplay from './ChildComponent/workDisplay.vue'
//获取所有的作品信息
const getAllWorkAndScore = () => {
  GetAllWorkAndScore().then(res => {
    console.log(res);
  })
}
getAllWorkAndScore()
</script>
<template>
  <div>
    <workDisplay />
  </div>
</template>
