<template>
  <div class="bottom_pagination" id="bottom_pagination">
    <!-- 页码显示 -->
    <!-- hide-on-single-page -->
    <el-pagination background layout="page-sizes,prev, pager, next,sizes,total" :total="totalNumber"
      @current-change="handler" :page-sizes="pageSizes" :pager-count="7" :default-page-size="10"
      :default-current-page="1" :current-page="page" @size-change="handleSizeChange" />
  </div>
</template>
<script setup>
import { ref } from 'vue'
const pageSizes = ref(['10', '20', '40', '80', '100', '200'])
const emit = defineEmits(['pageChange', 'sizeChange'])
defineProps(['totalNumber', 'page'])
//当前页变化
function handler(newPage) {
  emit('pageChange', newPage)
}
function handleSizeChange(newPageSize) {
  emit('sizeChange', newPageSize)
}
</script>
<style scoped>
.bottom_pagination {
  position: sticky;
  bottom: 20px;
  margin-top: 50px;
  display: flex;
  flex-direction: row;
  justify-content: center;
}
</style>