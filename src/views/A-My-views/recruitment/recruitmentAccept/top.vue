<script setup>
import { ref } from 'vue';
import { GetAllDepartment } from '@/api/recruitment'
import { debounce } from '@/utils'
const props = defineProps(['showSelectDepartmentView','total'])
const emit = defineEmits(['searchRecruitment', 'changeUserInfoByState', 'changeUserInfo','pageSizeUpdate', 'derive'])
//获取所有部门
const allDepartment = ref([])
const getGepartments = (() => {
  GetAllDepartment().then(res => {
    Object.keys(res.data).forEach(val => {
      allDepartment.value.push(res.data[val])
    })
  })
})
//部门
const selectedValue = ref([])
//状态
const selectStateValue = ref("firstTrialed")
//状态选项
const states = ref([
  { key: "firstTrialed", value: "初筛通过" },
  { key: "Rejected", value: "已拒绝" },
])
getGepartments()
//查询干事申请表
const recruitmentSearch = ref()
const getRecruitmentSearch = debounce(() => {
  emit('searchRecruitment', recruitmentSearch.value)
}, 500)
//导出全部
function derive() {
  emit('pageSizeUpdate', props.total)
  setTimeout(function(){ emit('derive')},1000)
}
</script >
<template>
  <div class="top_box" id="top_box">
    <!--按部门分类查看-->
    <div v-if="props.showSelectDepartmentView" class="select_by_department" id="select_by_department">
      <el-select v-model="selectedValue" @change="value => { $emit('changeUserInfo', value) }" placeholder="请选择部门"
        clearable>
        <el-option v-for="(department, index) in allDepartment" :key="index" :label="department" :value="department" />
      </el-select>
    </div>
    <!--按状态查看-->
    <div class="select_by_state" id="select_by_state">
      <el-select v-model="selectStateValue" @change="value => { $emit('changeUserInfoByState', value) }"
        placeholder="请选择状态">
        <el-option v-for="(state, index) in states" :key="index" :label="state.value" :value="state.key" />
      </el-select>
    </div>
    <!-- 搜索 -->
    <div class="searchInputBox" id="searchInputBox">
      <el-input 
      v-model="recruitmentSearch" 
      @input="getRecruitmentSearch" 
      resize="both"
      :clearable="true"
      suffix-icon="Search" placeholder="请输入干事名" />
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

#select_by_department {
  width: 15%;
  min-width: 150px;
}

#select_by_state {
  width: 15%;
  min-width: 150px;
}

#searchInputBox {
  width: 30%;
  min-width: 300px;
}
</style>