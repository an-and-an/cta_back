<script setup>
import { ref } from 'vue';
import { GetAllDepartment } from '@/api/recruitment'
//搜索内容
const searchValue = ref()
//查看内容
const selectedDepartment = ref()
//选择器选中值发生变化
const updateShowDepartment = (value) => {
  // console.log("value:", value);
}
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
getGepartments()
//
</script>
<template>
  <div>
    <!-- 顶部 -->
    <div>
      <div style="float:left;width:25%">
        <el-input v-model="searchValue" placeholder="请输入查询用户" clearable size="small" />
      </div>
      <div style="float:left;width:15%;margin-left:15px">
        <el-select v-model="selectedDepartment" @change="updateShowDepartment" class="m-2" placeholder="请选择部门"
          size="small">
          <el-option v-for="(department,index) in allDepartment" :key="index" :label="department" :value="department" />
        </el-select>
      </div>
      <div style="float:left;width:15%;margin-left:15px">

      </div>
    </div>
  </div>
</template>
<style>

</style>