<template>
  <div>
    <el-table :data="list" style="width: 100%">
      <el-table-column type="index" width="50" />
      <el-table-column label="序号" prop="id" width="70" align="center" />
      <el-table-column label="作品名称" prop="workName" width="150" align="center" />
      <el-table-column label="团队名称" prop="teamName" width="150" align="center" />
      <el-table-column label="组别" prop="group" width="80" align="center" />
      <el-table-column label="团队成员信息" align="center">
        <!-- 队长信息 -->
        <el-table-column label="姓名" width="150" align="center">
          <template #default="scope">
            <div class="team_member_info">
              <div class="team_leader">
                {{ scope.row.leader.username }}
              </div>
              <div v-if="scope.row.teamMember1">
                {{ scope.row.teamMember1.username }}
              </div>
              <div v-if="scope.row.teamMember2">
                {{ scope.row.teamMember2.username }}
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="学院" width="180" align="center">
          <template #default="scope">
            <div class="team_member_info">
              <div class="team_leader">
                {{ scope.row.leader.college }}
              </div>
              <div v-if="scope.row.teamMember1">
                {{ scope.row.teamMember1.college }}
              </div>
              <div v-if="scope.row.teamMember2">
                {{ scope.row.teamMember2.college }}
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="专业" width="150" align="center">
          <template #default="scope">
            <div class="team_member_info">
              <div class="team_leader">
                {{ scope.row.leader.major }}
              </div>
              <div v-if="scope.row.teamMember1">
                {{ scope.row.teamMember1.major }}
              </div>
              <div v-if="scope.row.teamMember2">
                {{ scope.row.teamMember2.major }}
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="班级" width="80" align="center">
          <template #default="scope">
            <div class="team_member_info">
              <div class="team_leader">
                {{ scope.row.leader.class }}
              </div>
              <div v-if="scope.row.teamMember1">
                {{ scope.row.teamMember1.class }}
              </div>
              <div v-if="scope.row.teamMember2">
                {{ scope.row.teamMember2.class }}
              </div>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="电话" width="150" align="center">
          <template #default="scope">
            <div class="team_member_info">
              <div class="team_leader">
                {{ scope.row.leader.phoneNumber }}
              </div>
              <div v-if="scope.row.teamMember1">
                {{ scope.row.teamMember1.phoneNumber }}
              </div>
              <div v-if="scope.row.teamMember2">
                {{ scope.row.teamMember2.phoneNumber }}
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="QQ" width="150" align="center">
          <template #default="scope">
            <div class="team_member_info">
              <div class="team_leader">
                {{ scope.row.leader.qq }}
              </div>
              <div v-if="scope.row.teamMember1">
                {{ scope.row.teamMember1.qq }}
              </div>
              <div v-if="scope.row.teamMember2">
                {{ scope.row.teamMember2.qq }}
              </div>
            </div>
          </template>
        </el-table-column>
      </el-table-column>
    </el-table>
  </div>
</template>
<script setup>
const props = defineProps(['list'])
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
}

.team_member_info div {
  width: 100%;
  height: 30px;
}

.team_member_info .team_leader {
   color: rgb(51,126,204);
}
</style>