<script setup>
import { reactive, ref, emit } from 'vue';
import { GetAllDepartment } from '@/api/recruitment'
// import { GetUserinfo } from '@/api/login'
const props = defineProps(['showSelectDepartmentView'])
//所有部门
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
//
const selectedValue = ref([])
const selectStateValue = ref([])
//
const states = ref([
  { key: "delivered", value: "已投递" },
  { key: "firstTrialed", value: "初筛通过" },
  { key: "firstTrialError", value: "初筛未通过" },
  { key: "Accepted", value: "已录取" },
  { key: "Rejected", value: "已拒绝" }
])
getGepartments()
</script >
<template>
  <div>
    <!--按部门分类查看-->
    <div v-if="props.showSelectDepartmentView" style="float:left;width:15%;margin-left:15px">
      <el-select v-model="selectedValue" @change="value=>{$emit('changeUserInfo',value)}" placeholder="请选择部门"
        size="small">
        <el-option v-for="(department,index) in allDepartment" :key="index" :label="department" :value="department" />
      </el-select>
    </div>
    <!--按状态查看-->
    <div style="float:left;width:15%;margin-left:15px">
      <el-select v-model="selectStateValue" @change="value=>{$emit('changeUserInfoByState',value)}" placeholder="请选择状态"
        size="small">
        <el-option v-for="(state,index) in states" :key="index" :label="state.value" :value="state.key" />
      </el-select>
    </div>
    <div>
      <button  @click="$emit('showAddDialog')"  style="boder:none;background-color: rgb(245,245,245);margin-left:30px;border:0ch">
        <img src="@/assets/svg/add.svg" alt="" style="width:30px;aspect-ratio:1:1;">
      </button>
    </div>
  </div>
</template>
<style>

</style>