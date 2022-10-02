<script setup>
import { ref } from 'vue'
import { GetAllCadres } from '@/api/replacement'
//获取本届干部
const tableData = ref([])
const getCurrentCadres = () => {
  GetAllCadres().then(res => {
    tableData.value = res.data
  })
}
defineExpose({
  getCurrentCadres
})
</script>  
<template>
  <div>
    <el-table :data="tableData" :highlight-current-row="true">
      <el-table-column prop="avatarUrl" label="头像" width="100px">
        <template #default="scope">
          <div style="width: 50px; height: 50px; border-radius:25px;">
            <img id="avatar-img" :src="scope.row.avatarUrl" alt="">
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="username" label="用户名" width="120px" />
      <el-table-column prop="college" label="学院" width="200px" />
      <el-table-column prop="major" label="专业" width="160px" />
      <el-table-column prop="class" label="班级" width="120px" />
      <el-table-column prop="studentId" label="学号" width="120px" />
      <el-table-column prop="identity.department" label="部门" width="150px" />
      <el-table-column prop="identity.duty" label="职位" width="120px" />
    </el-table>
  </div>
</template>
<style scoped>
#avatar-img {
  width: 80%;
  aspect-ratio: 1 / 1;
  border: 0px solid black;
  border-radius: 50%;
}
</style>