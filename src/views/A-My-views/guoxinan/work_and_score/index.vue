<template>
  <div style="width:100%;height:auto;min-width:700px;">
    <searchBox  
      :total="total" 
      @search="getSearch" 
      @exportTable="deriveExcel" 
      @pageSizeUpdate="pageSizeUpdate" />

    <workInfoList 
      :list="teams" 
      id="table" />

    <bottom
      :page-total="total" 
      :page="getTeamInfo.page" 
      :page-size="getTeamInfo.pageSize"
      @getNewPage="getNewPage"
      @pageSizeUpdate="pageSizeUpdate" 
      class="pager" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { GetAllWorkAndScore, GetAllTeam } from '@/api/guoxinan'
import * as XLSX from 'xlsx'
import searchBox from './Components/searchBox.vue'
import workInfoList from './Components/workInfoList.vue'
import bottom from '@/views/A-My-views/recruitment/bottom.vue'

const teams = ref([])
const getTeamInfo = ref({
  page: 1,
  pageSize: 10,
  content: ''
})
const total = ref()
const  getAllTeam = async() => {
  GetAllTeam(getTeamInfo.value).then(res => {
    res.list.forEach(element => {
      element.group ? element.group = '动态' : element.group = '静态'
    })
    teams.value = fullArray(res.list)
    total.value = res.total
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
      res.push(
        {
        ...baseInfo,
        college, major, studentId, username, qq, phoneNumber,
        class: item[team].class
        }
      )
    }
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
const deriveExcel = async () => {
  let workbook = XLSX.utils.table_to_book(document.getElementById('table'))
  try {
    XLSX.writeFile(workbook, '国信安报名信息表.xlsx');
    ElMessage.success( '导出成功!')
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