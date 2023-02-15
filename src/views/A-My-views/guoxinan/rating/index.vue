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
    staticProjects.value = res.data.static;
    dynanmicProjects.value = res.data.dynamic;
  })
})
getAllProject()
</script>
<template>
  <div>
    <h2>评分列表</h2>
    <h3>静态组</h3>
    <Dynamic :infoList="staticProjects" :type="true" />
    <h3>动态组</h3>
    <Dynamic :info-list="dynanmicProjects" />
  </div>
</template>