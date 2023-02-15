<template>
  <div class="basic_box" id="basic_box">
    <el-table :data="list" style="width: 100%" :span-method="spanMethod" max-height="65vh">
      <el-table-column label="序号" width="70" align="center" >
        <template #default="scope">
          <span> {{ (scope.$index) / 3 + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="id" prop="id" width="70" align="center" />
      <el-table-column label="团队名称" prop="teamName" width="150" align="center" />
      <el-table-column label="作品名称" prop="workName" width="150" align="center" />
      <el-table-column label="组别" prop="group" width="150" align="center" />
      <el-table-column label="姓名" prop="username" width="80" align="center" />
      <el-table-column label="学院" prop="college" width="180" align="center" />
      <el-table-column label="专业" prop="major" width="180" align="center" />
      <el-table-column label="班级" prop="class" width="80" align="center" />
      <el-table-column label="学号" prop="studentId" width="120" align="center" />
      <el-table-column label="qq" prop="qq" width="120" align="center" />
    </el-table>
  </div>
</template>
<script setup>
const props = defineProps(['list'])
function spanMethod({ row, column, rowIndex, columnIndex }) {
  if (columnIndex < 5 || columnIndex === 11) {
    if (rowIndex % 3 === 0) {
      return {
        rowspan: 3,
        colspan: 1,
      }
    } else {
      return {
        rowspan: 0,
        colspan: 0,
      }
    }
  }
}

</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
}

#basic_box{
  width: 100%;
  min-width: 600px;
}
.team_member_info div {
  width: 100%;
  height: 30px;
 
}

.team_member_info .team_leader {
  color: rgb(51, 126, 204);
}
</style>