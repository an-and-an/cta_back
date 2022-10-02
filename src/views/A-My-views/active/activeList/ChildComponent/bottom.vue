<script setup>
import { ref } from 'vue'
defineProps(['pageTotal', 'page'])
const pageSizes = ref(['10', '20', '40', '80', '100', '200'])
const getNewRecruitmentList = () => {

}

</script>
<template>
  <div>
    <!-- 页码显示 -->
    <!-- hide-on-single-page -->
    <el-pagination background layout="page-sizes,prev, pager, next,sizes,total" :total="pageTotal"
      @current-change="getNewRecruitmentList" :page-sizes="pageSizes" :pager-count="7" :default-page-size="10"
      :default-current-page="page" />
  </div>
</template>