<script setup>
defineProps(['tableInfo'])
</script>
<template>
  <div>
    <h1>国信安作品</h1>
    <el-table :data="tableInfo" :highlight-current-row="true" :empty-text="暂无数据">
    </el-table>
  </div>
</template>
<style scoped>

</style>