<template>
  <div class="bottom_pagination" id="bottom_pagination">
    <el-pagination background layout="page-sizes,prev, pager, next,sizes,total" :total="pageTotal"
      @update:current-page="getNewPage" @update:page-size="pageSizeUpdate" :page-sizes="pageSizes"
      :current-page="page" />
  </div>
</template>
<script setup>
import { ref } from 'vue'
const pageSizes = ref(['5', '10', '20', '40', '80', '100', '200'])
const emit = defineEmits(['getNewPage', 'pageSizeUpdate'])
defineProps(['pageTotal', 'page'])
const getNewPage = (newPage) => {
  emit('getNewPage', newPage)
}
function pageSizeUpdate(n) {
  emit('pageSizeUpdate', n)
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