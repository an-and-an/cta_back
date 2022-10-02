<script setup>
import Static from './ChildComponent/Static.vue'
import Dynamic from './ChildComponent/Dynamic.vue'
</script>
<template>
  <div>
    <h2>评分列表</h2>
    <h3>静态组</h3>
    <Static/>
    <h3>动态组</h3>
    <Dynamic />
  </div>
</template>