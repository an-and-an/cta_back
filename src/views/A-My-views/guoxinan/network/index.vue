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
  const res = await GetAllProject();
  dynamic.value = res.data.dynamic;
}
init();
</script>

<style scoped>

</style>
