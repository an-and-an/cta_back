<template>
  <div>
    <workInfoList :list="teams" />
    <bottom class="pager" :pageTotal="total" :page="getTeamInfo.page" @getNewPage="getNewPage"
      @pageSizeUpdate="pageSizeUpdate" />
  </div>
</template>
<script setup>
import { ref } from 'vue'
import workInfoList from './Components/workInfoList.vue'
import bottom from '@/views/A-My-Views/users/bottom.vue'
import { GetAllWorkAndScore, GetAllTeam } from '@/api/guoxinan'
//获取已经打分的作品信息及其分数
const workScoreList = ref([])
function getAllWorkAndScore() {
  GetAllWorkAndScore().then(res => {
    console.log("the res is---", res);
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
    teams.value = res.list
    total.value = res.total
    console.log(teams.value)
  })
}
getAllTeam()
const getNewPage = (page) => {
  getTeamInfo.value.page = page
  getAllTeam()
}
const pageSizeUpdate = (pageSize) => {
  getTeamInfo.value.pageSize = pageSize
  getAllTeam()
}
</script>
<style scoped>
.pager {
  z-index: 999;
}
</style>