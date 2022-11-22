<template>
  <!-- 搜索 -->
  <top 
    :total="total" 
    @searchRecruitment="searchRecruitment" 
    @derive="deriveExcel"
    @pageSizeUpdate="pageSizeUpdate"
  />

  <!-- 展示、列表 -->
  <recruitmentTable 
    :userInfo="recuitmentsUserInfo"
    @itemClick="itemClick" 
    id="table" 
  />

  <!-- 详细信息 -->
  <el-dialog v-model="isShowDetailRecruitmrntInfo" size="50%">
    <review 
      :user="DetailRecruitmrntInfo" 
      :current_role_department="getRecruitmentsData.department" 
      :current_role_id="current_role_id"
      @change_status="change_status"
      class="details"
    />
  </el-dialog>
  <!-- 页码 -->
  <bottom  
    :page-total="total" 
    :page="getRecruitmentsData.page"
    :page-size="getRecruitmentsData.pageSize" 
    @getNewPage="getNewPage"
    @pageSizeUpdate="pageSizeUpdate" 
    class="pager"
  />
</template>
<script setup>
import { ref, reactive } from 'vue'
import { GetUserinfo } from '@/api/login'
import { GetRecruitment } from '@/api/recruitment'
import { ElMessage } from 'element-plus'
import top from './top.vue'
import recruitmentTable from './recruitmentTable.vue'
import review from './review.vue'
import bottom from '../bottom.vue'
import * as XLSX from 'xlsx'

//初始值
const current_role_id = ref(27)
const getUserInfo = async () => {
  const { data } = await GetUserinfo()
  if (data.identity.department !== '理事会') {
    getRecruitmentsData.department =getRecruitmentsData.department || data.identity.department 
  }
  GetRecruitment(getRecruitmentsData).then(res => {
    recuitmentsUserInfo.value = res.list
    total.value = res.total
  })
}
getUserInfo()

//获取提交的干事申请表
const recuitmentsUserInfo = ref([])
const getRecruitmentsData = reactive({
  department: "",
  page: 1,
  pageSize: 10,
  status: "FinallyAccepted",
  content: ''
})

//获取干事申请表
const getRecruitments = async () => {
  const res = await GetRecruitment(getRecruitmentsData)
  total.value = res.total
  recuitmentsUserInfo.value = res.list
  if(res.code!=0 ||res.list.length() == 0) {
    ElMessage({
      message: '没有相关用户！',
      type: 'warning',
      offset: 250,
      duration: 1000
    })
  }
}
getRecruitments()

//浏览申请表详细信息
const checkStatus = ref()
const isShowDetailRecruitmrntInfo = ref(false)
const DetailRecruitmrntInfo = ref({})
const itemClick = (id, status) => {
  checkStatus.value = status
  isShowDetailRecruitmrntInfo.value = true
  const _ = recuitmentsUserInfo.value.find(item => item.id === id)
  DetailRecruitmrntInfo.value = {
    ..._,
    username: _.user.username,
    gender: _.user.gender,
    major: _.user.major,
    college: _.user.college,
    class: _.user.class,
  }
}

//搜索干事申请表
const searchRecruitment = (searchValue) => {
  getRecruitmentsData.content = searchValue
  getRecruitments()
}

//页码显示
const total = ref()
const getNewPage = (page) => {
  getRecruitmentsData.page = page
  getRecruitments()
}
const pageSizeUpdate = (pageSize) => {
  getRecruitmentsData.pageSize = pageSize
  getRecruitments()
}
//导出
const deriveExcel = async () => {
  getRecruitmentsData.pageSize = total.value
  getRecruitments()
  let workbook = XLSX.utils.table_to_book(document.getElementById('table'));
  try {
    XLSX.writeFile(workbook, '最终录取结果.xlsx');
    ElMessage({
      type: 'success',
      message: '导出成功!'
    });
  } catch (e) {
    ElMessage.error('导出失败!')
  }
}
</script>
<style>
.details {
  float: left;
}

.pager {
  z-index: 999;
}
</style>