<script setup>
import { ref } from 'vue'
import { debounce } from '@/utils'
const props = defineProps(['showSelectDepartmentView','total'])
const emit = defineEmits(['searchRecruitment', 'changeUserInfoByState', 'changeUserInfo','pageSizeUpdate', 'derive'])

//查询干事申请表
const recruitmentSearch = ref()
const getRecruitmentSearch = debounce(() => {
  emit('searchRecruitment', recruitmentSearch.value)
}, 500)
//导出
function derive() {
  emit('pageSizeUpdate', props.total)
  setTimeout(function(){ emit('derive')},1000)
}
</script >
<template>
  <div class="top_box" id="top_box">
    <!-- 搜索 -->
    <div class="searchInputBox" id="searchInputBox">
      <el-input v-model="recruitmentSearch" @input="getRecruitmentSearch" :clearable="true" resize="both"
        suffix-icon="Search" placeholder="请输入干事名">
      </el-input>
    </div>
    <div>
      <el-button type="primary" @click="derive">导出全部</el-button>
    </div>
  </div>
</template>
<style scoped>
.top_box {
  width: 100%;
  min-width: 700px;
}

.top_box>div {
  float: left;
  margin-bottom: 10px;
  margin-right: 15px;
}
#searchInputBox {
  width: 30%;
  min-width: 300px;
}
</style>