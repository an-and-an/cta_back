<script setup>
import { ref } from 'vue'
//搜索
const searchValue = ref()
const searchNews = () => {

}
</script>
<template>
  <div style="width:100%;min-width:1000px">
    <div class="search_input">
      <el-input v-model="searchValue" @change="searchNews" placeholder="搜索"
        style="width:35%;min-width:200px; margin-left:50px;margin-right: 200px;" />
    </div>
  </div>
</template>
<style scoped>
.search_input {
  display: flex;
  justify-content: end;
}
</style>