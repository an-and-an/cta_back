<template>
  <list-cpm :data="dynamic" @audit="audit" />
</template>

<script setup>
import listCpm from './list.vue';
import { ElMessage } from 'element-plus';
//动态组
const dynamic = ref([])
async function audit(id, score) {
  try {
    await setNetworkScore({ id, score });
  } catch(e) {
    ElMessage({ type: 'error', message: e.message });
  }
}
async function init() {
  try {
    const res = await GetAllProject();
    if (res.code !== 0) {
      ElMessage({ type: 'error', message: res.message });
    } else dynamic.value = res.data.dynamic;
  } catch (error) {
    console.log(error.message);
  }
}
init();
</script>

<style scoped>

</style>
