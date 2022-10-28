<template>
  <!-- 筛选、搜索 -->
  <top @changeUserInfo="changeUserInfo" @changeUserInfoByState="changeUserInfoByState"
    @showAddDialog="showAddOfficial = true" @searchRecruitment="searchRecruitment"
    :showSelectDepartmentView="showSelectDepartmentView" @derive="deriveExcel" />
  <!-- 展示、列表 -->
  <recruitmentTable :userInfo="recuitmentsUserInfo" @itemClick="itemClick" id="table" />
  <!-- 详细信息 -->
  <el-drawer v-model="isShowDetailRecruitmrntInfo" size="50%">
    <review :user="DetailRecruitmrntInfo" class="details" @audit="firstTrial" :status="checkStatus" :loading="loadView"
      @change_status="change_status" :current_role_id="current_role_id" />
  </el-drawer>
  <!-- 页码 -->
  <div>
    <bottom class="pager" :page-total="total" :page="getRecruitmentsData.page" @getNewPage="getNewPage"
      @pageSizeUpdate="pageSizeUpdate" />
  </div>
</template>
<script setup>
import { ref, reactive } from 'vue'
import top from './top.vue'
import recruitmentTable from './recruitmentTable.vue'
import review from './review.vue'
import bottom from '../bottom.vue'
import { GetUserinfo } from '@/api/login'
import { GetRecruitment, FirstTrialRecruitment } from '@/api/recruitment'
import { ElMessage } from 'element-plus'
import * as XLSX from 'xlsx'
//页码显示
const total = ref()
//初始值
const showSelectDepartmentView = ref(false)
const current_role_id = ref()
const getUserInfo = async () => {
  const { data } = await GetUserinfo()
  current_role_id.value = data.roles.id
  if (!data.type) {
    if (data.roles.roleName !== 'root') return
    else showSelectDepartmentView.value = true
  } else {
    if (data.identity.department !== '理事会')
      getRecruitmentsData.department =
        getRecruitmentsData.department ||
        data.identity.department
    else showSelectDepartmentView.value = true
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
  status: "delivered",
  content: ''
})
//获取干事申请表
const getRecruitments = async (data) => {
  const res = await GetRecruitment(data)
  recuitmentsUserInfo.value = res.list
  total.value = res.total
  if (res.list.length == 0) {
    ElMessage({
      message: '没有相关用户！',
      type: 'warning',
      offset: 250,
      duration: 1000
    })
  }
}
//选取状态
const changeUserInfoByState = (value) => {
  if (value) {
    getRecruitmentsData.status = value
  }
  getRecruitments(getRecruitmentsData)
}
//选取部门
const changeUserInfo = (value) => {
  getRecruitmentsData.department = value
  getRecruitments(getRecruitmentsData)
}
//浏览申请表详细信息
const isShowDetailRecruitmrntInfo = ref(false)
const DetailRecruitmrntInfo = ref({})
const checkStatus = ref()
function itemClick(id, status) {
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
//初筛
const loadView = ref(false)
const change_status = (v) => {
  checkStatus.value = v
}
const firstTrial = (trailId, trail) => {
  loadView.value = true
  FirstTrialRecruitment({
    id: trailId,
    status: trail,
  }).then(res => {
    if (res.code == 0) {
      setTimeout(() => {
        trail ? checkStatus.value = 2 : checkStatus.value = 3
        loadView.value = false
        ElMessage({
          type: "success",
          message: res.message,
          offset: 200,
        })
      }, 500)
      getRecruitments(getRecruitmentsData)

    }
    else
      ElMessage({
        type: "error",
        message: res.message,
        offset: 200,
      })
  })
}
//搜索干事申请表
const searchRecruitment = (searchValue) => {
  getRecruitmentsData.content = searchValue
  getRecruitments({ ...getRecruitmentsData })
}
const getNewPage = (page) => {
  getRecruitmentsData.page = page
  getRecruitments(getRecruitmentsData)
}
const pageSizeUpdate = (pageSize) => {
  getRecruitmentsData.pageSize = pageSize
  getRecruitments(getRecruitmentsData)
}

//导出
const deriveExcel = async () => {
  getRecruitmentsData.pageSize = total.value
  await getRecruitments(getRecruitmentsData)
  let workbook = XLSX.utils.table_to_book(document.getElementById('table'));
  try {
    XLSX.writeFile(workbook, '干事申请表.xlsx');
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