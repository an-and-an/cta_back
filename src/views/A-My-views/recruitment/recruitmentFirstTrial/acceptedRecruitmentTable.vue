<template>
  <div>
    <div style="width:100%;height:40px"></div>
    <el-table :data="userRecruitmentsInfo.userInfo" style="width: 100%" highlight-current-row>
      <el-table-column prop="user.username" label="姓名" width="100" @click="emit('changeUserInfo',value)">
      </el-table-column>
      <el-table-column prop="user.college" label="学院" width="150" />
      <el-table-column prop="user.major" label="专业" width="170" />
      <el-table-column prop="firstChoice" label="预录取部门" width="120" />
      <el-table-column prop="" label="" width="120">
        <template #default="scope">
          <span @click="$emit('itemClick', scope.row.id,scope.row.status)">查看更多</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
const userRecruitmentsInfo = defineProps(['userInfo'])
</script>
<style>

</style>