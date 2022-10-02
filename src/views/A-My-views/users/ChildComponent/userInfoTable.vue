<script setup>
defineProps(['tableInfo'])
const emit = defineEmits(['deleteUser', 'update'])
const show = (updateId,updateUsername) => {
  emit('update',updateId,updateUsername)
}
const deleteUser = (id) => {
  emit('deleteUser', id)
}
</script>
<template>
  <div style="width:100%;min-width:1000px">
    <el-table :data="tableInfo" :highlight-current-row="true">
      <el-table-column prop="avatarUrl" label="头像" width="100px">
        <template #default="scope">
          <div style="width: 50px; height: 50px; border-radius:25px;">
            <img id="avatar-img" :src="scope.row.avatarUrl" alt="">
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="username" label="用户名" width="150px" />
      <el-table-column prop="identity.department" label="部门" width="150px" />
      <el-table-column prop="identity.duty" label="职位" width="120px" />
      <el-table-column prop="college" label="学院" width="180px" />
      <el-table-column prop="major" label="专业" width="180px" />
      <el-table-column prop="class" label="班级" width="100px" />
      <el-table-column prop="studentId" label="学号" width="150px" />
      <el-table-column prop="phoneNumber" label="电话" width="150px" />
      <el-table-column prop="qq" label="QQ" width="150px" />
      <el-table-column prop="" label="" width="300px" fixed="right">
        <template #default="scope">
          <!-- 修改按钮 -->
          <el-button @click="show(scope.row.id,scope.row.username)" type="primary" circle>
            <el-icon>
              <Edit />
            </el-icon>
          </el-button>
          <!-- 删除按钮 -->
          <el-button @click="deleteUser(scope.row.id)" type="danger" circle>
            <el-icon>
              <Delete />
            </el-icon>
          </el-button>
        </template>
      </el-table-column>
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