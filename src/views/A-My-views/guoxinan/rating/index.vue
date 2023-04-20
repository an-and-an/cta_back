<script setup>
import { ElMessage } from 'element-plus';
import Dynamic from './ChildComponent/Dynamic.vue'
import { GetAllProject } from '@/api/guoxinan';
import { ref } from 'vue'
//静态组
const staticProjects = ref([]);
//动态组
const dynanmicProjects = ref([]);
const getAllProject = (() => {
  GetAllProject().then(res => {
    if (res.code !== 0) ElMessage({ type: 'error', message: res.message });
    else {
      staticProjects.value = res.data.static
      dynanmicProjects.value = res.data.dynamic
    }
  })
})
getAllProject()
</script>
<template>
  <div>
    <div class="top">
      <h2>评分列表</h2>
      <span style="font-size: 16px;">
        注：分数越低，则越靠前，打完分后可刷新页面，查看第一个作品，如果还有漏掉的，没有打分的，则会显示在第一个
      </span>
    </div>
    <h3>静态组</h3>
    <Dynamic :infoList="staticProjects" :type="true" />
    <h3>动态组</h3>
    <Dynamic :info-list="dynanmicProjects" />
  </div>
</template>
<style scoped>

.top h2 {
  margin: 10px;
}
</style>