<template>
  <div>
    <searchBox @search="getSearch" @exportTable="deriveExcel" />
    <workInfoList :list="teams" id="table" />
    <bottom class="pager" :pageTotal="total" :page="getTeamInfo.page" @getNewPage="getNewPage"
      @pageSizeUpdate="pageSizeUpdate" />
  </div>
</template>
<script setup>
import { ref } from 'vue'
import searchBox from './Components/searchBox.vue'
import workInfoList from './Components/workInfoList.vue'
import bottom from '@/views/A-My-Views/users/bottom.vue'
import { ElMessage } from 'element-plus'
import * as XLSX from 'xlsx'
import { GetAllWorkAndScore, GetAllTeam } from '@/api/guoxinan'
//获取已经打分的作品信息及其分数
const workScoreList = ref([])
function getAllWorkAndScore() {
  GetAllWorkAndScore().then(res => {
  })
}
// getAllWorkAndScore()
//获取所有已经报名了的队伍
const teams = ref([])
const getTeamInfo = ref({
  page: 1,
  pageSize: 10,
  content: ''
})
const total = ref()
function getAllTeam() {
  GetAllTeam(getTeamInfo.value).then(res => {
    res.list.forEach(element => {
      element.group ? element.group = '动态' : element.group = '静态'
    });
    teams.value = fullArray(res.list)
    total.value = res.total
    // console.log(teams.value)
  })
}

function fullArray(list) {
  const res = []
  list.forEach((item) => {
    const { group, introductionToWorks, portNumber, session, teamMemberSpecialty, workName, teamName, id } = item;
    const baseInfo = {
      group, introductionToWorks, portNumber, session, teamMemberSpecialty, workName, teamName, id
    }
    for (const team of ['leader', 'teamMember1', 'teamMember2']) {
      if (!item[team]) {
        res.push({
          ...baseInfo
        })
        continue;
      }
      const { college, major, studentId, username, qq, phoneNumber } = item[team]
      res.push({
        ...baseInfo,
        college, major, studentId, username, qq, phoneNumber,
        class: item[team].class
      })
    }
    // if (item.leader) {
    //   const { college, major, studentId, username, qq, phoneNumber } = item.leader
    //   res.push({
    //     ...baseInfo,
    //     college, major, studentId, username, qq, phoneNumber,
    //     class: item.leader.class
    //   })
    // }
    // if (item.teamMember1) {
    //   const { college, major, studentId, username, qq, phoneNumber } = item.teamMember1
    //   res.push({
    //     ...baseInfo,
    //     college, major, studentId, username, qq, phoneNumber,
    //     class: item.teamMember1.class
    //   })
    // }
    // if (item.teamMember2) {
    //   const { college, major, studentId, username, qq, phoneNumber } = item.teamMember2
    //   res.push({
    //     ...baseInfo,
    //     college, major, studentId, username, qq, phoneNumber,
    //     class: item.teamMember2.class
    //   })
    // }
  })
  return res
}

getAllTeam()
//搜索队伍
function getSearch(value) {
  getTeamInfo.value.content = value
  getAllTeam()
}
const getNewPage = (page) => {
  getTeamInfo.value.page = page
  getAllTeam()
}
const pageSizeUpdate = (pageSize) => {
  getTeamInfo.value.pageSize = pageSize
  getAllTeam()
}

//导出表格
function deriveExcel() {
  let workbook = XLSX.utils.table_to_book(document.getElementById('table'));
  try {
    XLSX.writeFile(workbook, '国信安报名信息表.xlsx');
    ElMessage({
      type: 'success',
      message: '导出成功!'
    });
  } catch (e) {
    ElMessage.error('导出失败!')
  }
}
</script>
<style scoped>
.pager {
  z-index: 999;
}
</style>