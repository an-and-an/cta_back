<template>
  <div>
    <el-table :data="workInfo" style="width: 100%" height="600">
      <el-table-column prop="teamName" label="队伍" width="160px" />
      <el-table-column prop="workName" label="作品" width="200px" />
      <el-table-column prop="score" label="作品分数" width="120px" />
      <el-table-column align="right" width="150px" fixed="right">
        <template #default="scope">
          <el-button
            @click="
              setFinal(
                scope.row.teamName,
                scope.row.leader,
                scope.row.teamMember1,
                scope.row.teamMember2
              )
            "
            style="position: relative; right: 50px"
            key="进入决赛"
            type="primary"
            text
            bg
          >
            进入决赛</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script setup>
import { ref, reactive } from "vue";
import { GetAllWorkAndScore } from "@/api/guoxinan";
import { setWinners } from "@/api/previous_winners";

//获取所有作品和作品分数
const workInfo = ref();
function getAllWorkInfo() {
  GetAllWorkAndScore().then((res) => {
    console.log(res.data);
    // console.log("hhdata---", res.data[21]);
    workInfo.value = res.data.map((item) => {
      return {
        teamName: item.teamName,
        workName: item.workName,
        remarks: item.teamName,
        score: Object.values(item.score),
        leader: item.leader,
        teamMember1: item.teamMember1,
        teamMember2: item.teamMember2,
      };
    });
  });
}
getAllWorkInfo();
//设置决赛名单
const date = new Date();
const currentYear = date.getFullYear();
const setInfo = reactive({
  session: `${currentYear}`,
  competitionName: "国信安网页设计大赛",
  studentId: "",
  awardLevel: "excellentAward",
  remarks: "",
});
function set(v1, v2) {
  setInfo.studentId = v1;
  setInfo.remarks = v2;
  setWinners(setInfo).then((res) => {
    console.log("**---", res);
  });
}

function setFinal(teamName, leader, teamMember1, teamMember2) {
  console.log(
    "点击了设置进入决赛--",
    teamName,
    leader,
    teamMember1,
    teamMember2
  );
  set(leader.studentId, teamName);
  set(teamMember1.studentId, teamName);
  set(teamMember2.studentId, teamName);
}
</script>
