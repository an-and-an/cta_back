<template>
  <div class="bottom_pagination" id="bottom_pagination">
    <!-- 页码显示 -->
    <!-- hide-on-single-page -->
    <el-pagination background layout="page-sizes,prev, pager, next,sizes,total" :total="pageTotal"
      @current-change="getNewRecruitmentList" :page-sizes="pageSizes" :pager-count="7" :default-page-size="10"
      :default-current-page="page" />
  </div>
</template>
<script setup>
import { ref } from 'vue'
const pageSizes = ref(['10', '20', '40', '80', '100', '200'])
defineProps(['pageTotal', 'page'])
//当前页变化
const getNewRecruitmentList = () => {
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