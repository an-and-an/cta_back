<template>

  <!-- 筛选、搜索 -->
  <top 
    :total="total" 
    :showSelectDepartmentView="showSelectDepartmentView"
    @changeUserInfo="changeUserInfo" 
    @changeUserInfoByState="changeUserInfoByState"
    @showAddDialog="showAddOfficial = true" 
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
      :status="checkStatus" 
      :current_role_id="current_role_id" 
      @FinallySetOfficial="FinallySetOfficial"
      @FinallyRejectOfficial="FinallyRejectOfficial"  
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
import { ElMessage } from 'element-plus'
import { GetRecruitment, FinallySendOffer, SetOfficial } from '@/api/recruitment'
import top from './top.vue'
import recruitmentTable from './recruitmentTable.vue'
import review from './review.vue'
import bottom from '../bottom.vue'
import * as XLSX from 'xlsx'

//初始值
const showSelectDepartmentView = ref(false)
const current_role_id = ref()
const getUserInfo = async () => {
  const { data } = await GetUserinfo()
  //21-----最高管理员
  //28-----正副会长
  //27-----正副部长
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

//获取干事申请表
const recuitmentsUserInfo = ref([])
const getRecruitmentsData = reactive({
  department: "",
  page: 1,
  pageSize: 10,
  status: "Accepted",
  content: ''
})
//
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
//选取状态
const changeUserInfoByState = (value) => {
  if (value == "Accepted") {
    status.value = 4
  } else {
    status.value = 6
  }
  if (value) {
    getRecruitmentsData.status = value
  }
  getRecruitments()
}
//选取部门
const changeUserInfo = (value) => {
  getRecruitmentsData.department = value
  getRecruitments(getRecruitmentsData)
}
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
//最终录取
const status = ref(4)
const FinallySetOfficial = (id) => {
  FinallySendOffer({
    id: id.value
  }).then(res => {
    if (res.code == 0) {
      status.value = 6
      ElMessage({
        type: 'success',
        message: "已录取！",
        offset: 200,
        duration: 1000,
      })
      isShowDetailRecruitmrntInfo.value = false
      getRecruitments()
    } else {
      ElMessage({
        type: 'error',
        message: "操作失败，请重新操作！",
        offset: 200,
        duration: 1000,
      })
    }
  })
}
//最终拒绝
const FinallyRejectOfficial = (id, department) => {
  SetOfficial({
    id: id.value,
    department: department.value,
    res: false
  }).then(res => {
    status.value = 5
    if (res.code == 0) {
      ElMessage({
        type: "success",
        message: '已拒绝！',
        offset: 250,
        duration: 1000,
      })
      isShowDetailRecruitmrntInfo.value = false
      getRecruitments()
    } else {
      ElMessage({
        type: "error",
        message: '操作失败,请重新操作！',
        offset: 250,
        duration: 2000,
      })
    }
  })
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
//导出全部
const deriveExcel = async () => {
  let workbook = XLSX.utils.table_to_book(document.getElementById('table'));
  try {
    XLSX.writeFile(workbook, '录取结果.xlsx');
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