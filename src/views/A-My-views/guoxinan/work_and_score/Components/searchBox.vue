<template>
  <div>
    <el-input v-model="search" class="w-50 m-2" suffix-icon="Search" placeholder="请输入队伍名称进行搜索" @input="getSearch" />
  </div>
</template>
<script setup>
import { debounce } from '@/utils/index'
import { ref } from 'vue'
const emit = defineEmits(['search'])
const search = ref()
const getSearch = debounce(() => {
  emit('search', search.value)
}, 1000)
</script>
<style scoped>
div {
  width: 400px;
  margin-bottom: 10px;
}
</style>