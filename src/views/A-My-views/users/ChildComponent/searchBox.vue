<script setup>
import { ref } from 'vue';
import { debounce } from '@/utils'
const emit = defineEmits(['search'])
const inputValue = ref()
const getSearch = debounce(() => {
  emit('search', inputValue.value)
}, 500)
const getSearchByEnter = () => {
  emit('search', inputValue.value)
}
</script>
      
<template>
  <div class="search_user_by_studentid_box">
    <el-input v-model="inputValue" @input="getSearch" @change="getSearchByEnter" :clearable="true" resize="both"       placeholder="请输入用户名"
      suffix-icon="Search"/>
  </div>
</template>
<style scoped>
.search_user_by_studentid_box {
  width: 50%;
  min-width: 300px;
  margin: 10px 0;
}
</style>