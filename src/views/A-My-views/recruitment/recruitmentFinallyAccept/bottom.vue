<template>
  <div class="bottom_pagination" id="bottom_pagination">
    <!-- 页码显示 -->
    <el-pagination background layout="page-sizes,prev, pager, next,sizes,total" :total="pageTotal"
      @current-change="getNewRecruitmentList" :page-sizes="pageSizes" :pager-count="7" :default-page-size="20"
      :default-current-page="1" :hide-on-single-page="true" :current-page="page" />
  </div>
</template>
<script setup>
import { ref } from 'vue'
const pageSizes = ref(['10', '20', '40', '80', '100', '200'])
const emit=defineEmits(['getNewRecruitmentList'])
defineProps(['pageTotal', 'page'])
//当前页变化
const getNewRecruitmentList = (newPage) => {
  emit('getNewRecruitmentList',newPage)
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