<template>

  <!-- 筛选、搜索 -->
  <top 
    :total="total" 
    :showSelectDepartmentView="showSelectDepartmentView"
    @pageSizeUpdate="pageSizeUpdate"  
    @changeUserInfo="changeUserInfo" 
    @changeUserInfoByState="changeUserInfoByState"
    @showAddDialog="showAddOfficial = true" 
    @searchRecruitment="searchRecruitment"
    @derive="deriveExcel" 
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
      :loading="loadView"
      :current_role_id="current_role_id"
      @audit="firstTrial" :status="checkStatus" 
      @change_status="change_status"
      class="details" 
    />
  </el-dialog>

  <!-- 页码 -->
  <div>
    <bottom  
      :page-total="total" 
      :page="getRecruitmentsData.page"
      :page-size="getRecruitmentsData.pageSize" 
      @getNewPage="getNewPage"
      @pageSizeUpdate="pageSizeUpdate" 
      class="pager"
    />
  </div>

</template>
<script setup>
import { ref, reactive } from 'vue'
import { GetUserinfo } from '@/api/login'
import { GetRecruitment, FirstTrialRecruitment } from '@/api/recruitment'
import { ElMessage } from 'element-plus'
import top from './top.vue'
import recruitmentTable from './recruitmentTable.vue'
import review from './review.vue'
import bottom from '../bottom.vue'
import * as XLSX from 'xlsx'

//初始值
const total = ref()
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

//选取状态
const changeUserInfoByState = (value) => {
  if (value) {
    getRecruitmentsData.status = value
  }
  getRecruitments()
}
//选取部门
const changeUserInfo = (value) => {
  getRecruitmentsData.department = value
  getRecruitments()
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
      getRecruitments()

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
  getRecruitments()
}

//导出
const deriveExcel = async () => {
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