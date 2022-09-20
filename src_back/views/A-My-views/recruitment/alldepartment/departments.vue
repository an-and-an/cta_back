<script setup>
import { ref } from 'vue';
import { GetAllDepartment } from '@/api/recruitment'
const alldepartments = ref([
  {
    departmentName: '算法竞赛部',
    departmentAdmin: '张三',
    departmentMemberCounts: 15,
    members: ['李四', '王五']
  },
  {
    departmentName: '算法竞赛部',
    departmentAdmin: '张三',
    departmentMemberCounts: 15,
    members: ['李四', '王五']
  },
  {
    departmentName: '算法竞赛部',
    departmentAdmin: '张三',
    departmentMemberCounts: 15,
    members: ['李四', '王五']
  },
  {
    departmentName: '算法竞赛部',
    departmentAdmin: '张三',
    departmentMemberCounts: 15,
    members: ['李四', '王五']
  },
  {
    departmentName: '算法竞赛部',
    departmentAdmin: '张三',
    departmentMemberCounts: 15,
    members: ['李四', '王五']
  },
])
//查看部门成员
const showDepartmentMembersDialog = ref(true)
const checkDepartmentMembers = () => {
  showDepartmentMembersDialog.value = true
}
//获取所有部门
const departments = ref([])
const getGepartments = (() => {
  GetAllDepartment().then(res => {
    Object.keys(res.data).forEach(val => {
      departments.value.push(res.data[val])
    })
    // console.log("departments--", departments.value);
  }).catch(err => {
    console.log(err);
  })
})
getGepartments()
</script>
<template>
  <div>
    <el-table :data="alldepartments" style="width: 100%">
      <el-table-column prop="departmentName" label="部门" width="180px" />
      <el-table-column prop="departmentAdmin" label="部门负责人" width="180px" />
      <el-table-column prop="departmentMemberCounts" label="部门人数" width="180px" />
      <el-table-column prop="members" label="部门成员" width="180px">
        <template #default="scope">
          <el-button @click="checkDepartmentMembers" size="small">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<style>

</style>