<template>
  <div>
    <el-input v-model="search" suffix-icon="Search" placeholder="请输入队伍名称进行搜索" @input="getSearch" />
    <el-button type="primary" @click="exportTable">导出</el-button>
  </div>
</template>
<script setup>
import { debounce } from '@/utils/index'
import { ref } from 'vue'

const props=defineProps(['total'])
const emit = defineEmits(['search', 'exportTable','pageSizeUpdate'])
const search = ref()
const getSearch = debounce(() => {
  emit('search', search.value)
}, 1000)
function exportTable() {
  emit('pageSizeUpdate', props.total)
  setTimeout(function(){ emit('exportTable')},1000);
}
</script>
<style scoped>
div {
  width: 400px;
  margin-bottom: 10px;
}
</style>