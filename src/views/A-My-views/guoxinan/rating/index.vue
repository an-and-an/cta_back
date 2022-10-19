<script setup>
import Dynamic from './ChildComponent/Dynamic.vue'
import { GetAllProject } from '@/api/guoxinan'
import { ref } from 'vue'
//静态组
const staticProjects = ref([])
//动态组
const dynanmicProjects = ref([])
const getAllProject = (() => {
  GetAllProject().then(res => {
    console.log(res);
    staticProjects.value = res.data.static.sort(
      (a, b) => a.score.filter(_ => _ !== 0).length - b.score.filter(_ => _ !== 0).length
    )
    dynanmicProjects.value = res.data.dynamic.sort(
      (a, b) => a.score.filter(_ => _ !== 0).length - b.score.filter(_ => _ !== 0).length
    )
  })
})
// getAllProject()
</script>
<template>
  <div>
    <h2>评分列表</h2>
    <h3>静态组</h3>
    <Dynamic :infoList="staticProjects" :type="true" />
    <h3>动态组</h3>
    <Dynamic :infoList="dynanmicProjects" />
  </div>
</template>