<script setup>
import { ref } from 'vue';
import { GetAllDepartment } from '@/api/recruitment'
import { debounce } from '@/utils'
const props = defineProps(['showSelectDepartmentView'])
const emit = defineEmits(['searchRecruitment', 'changeUserInfoByState', 'changeUserInfo', 'derive'])
//获取所有部门
const allDepartment = ref([])
const getGepartments = (() => {
  GetAllDepartment().then(res => {
    Object.keys(res.data).forEach(val => {
      allDepartment.value.push(res.data[val])
    })
  }).catch(err => {
    console.log(err);
  })
})
//部门
const selectedValue = ref([])
//状态
const selectStateValue = ref("delivered")
//状态选项
const states = ref([
  { key: "delivered", value: "已投递" },
  { key: "firstTrialError", value: "初筛未通过" }
])
getGepartments()
//查询干事申请表
const recruitmentSearch = ref()
const getRecruitmentSearch = debounce(() => {
  emit('searchRecruitment', recruitmentSearch.value)
}, 1000)
//导出全部
const derive = () => {
  emit('derive')
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
    <!-- 查询干事申请表 -->
    <div class="searchInputBox" id="searchInputBox">
      <el-input v-model="recruitmentSearch" @input="getRecruitmentSearch" :clearable="true" resize="both"
        placeholder="请输入干事名">
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