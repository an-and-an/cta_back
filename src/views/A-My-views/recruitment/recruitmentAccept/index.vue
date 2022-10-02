<template>
  <!-- 筛选、搜索 -->
  <top @changeUserInfo="changeUserInfo" @changeUserInfoByState="changeUserInfoByState"
    @showAddDialog="showAddOfficial=true" @searchRecruitment="searchRecruitment"
    :showSelectDepartmentView="showSelectDepartmentView" />
  <!-- 展示、列表 -->
  <recruitmentTable :userInfo="recuitmentsUserInfo" @itemClick="itemClick" />
  <!-- 详细信息 -->
  <el-drawer v-model="isShowDetailRecruitmrntInfo" size="50%">
    <review :user="DetailRecruitmrntInfo" class="details" @audit="firstTrial" :status="checkStatus"
      @change_status="change_status" @setOfficial="setOfficial" @FinallySetOfficial="FinallySetOfficial"
      @reject_set="reject_set" :current_role_id="current_role_id" :isSelect="isSelectDepartment" :current_role_department="getRecruitmentsData.department" />
  </el-drawer>
  <!-- 页码 -->
  <bottom class="pager" :pageTotal="total" :page="getRecruitmentsData.page" @getNewPage="getNewPage"
    @pageSizeUpdate="pageSizeUpdate" />
</template>
<script setup>
import { ref, reactive } from 'vue'
import top from './top.vue'
import recruitmentTable from './recruitmentTable.vue'
import review from './review.vue'
import bottom from '@/views/A-My-Views/users/bottom.vue'
import { GetUserinfo } from '@/api/login'
import { GetRecruitment, SetOfficial, FinallySendOffer } from '@/api/recruitment'
import { ElMessage } from 'element-plus'
//初始值
const showSelectDepartmentView = ref(false)
const current_role_id = ref()
const getUserInfo = async () => {
  const { data } = await GetUserinfo()
  current_role_id.value = data.roles.id
  if (!data.type) {
    if (data.roles.roleName !== 'root') return
    else {
      showSelectDepartmentView.value = true
      isSelectDepartment.value = true
    }
  } else {
    if (data.identity.department !== '理事会')
      getRecruitmentsData.department =
        getRecruitmentsData.department ||
        data.identity.department
    else {
      showSelectDepartmentView.value = true
      isSelectDepartment.value = true
    }
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
  status: "firstTrialed",
  content: ''
})
//获取干事申请表
const getRecruitments = (data) => {
  GetRecruitment(data).then(res => {
    total.value = res.total
    recuitmentsUserInfo.value = res.list
    if (recuitmentsUserInfo.length===0) {
      ElMessage({
        message: '没有相关用户！',
        type: 'warning',
        offset: 250,
        duration: 1000
      })
    }
  })
}
getRecruitments(getRecruitmentsData)
//选取状态
const changeUserInfoByState = (value) => {
  if (value == "firstTrialed") {
    status.value = 2
  } else if (value == "Rejected") {
    status.value = 5
  }
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
// 预录取是否选部门
const isSelectDepartment = ref(false)
//预录取
const status = ref(2)
const setOfficial = (accept_department, accept_id, res) => {
  SetOfficial({
    id: accept_id.value,
    department: accept_department.value,
    res: res
  }).then(res => {
    status.value = 4
    if (res.code == 0) {
      ElMessage({
        type: "success",
        message: '操作成功！',
        offset: 250,
      })
      isShowDetailRecruitmrntInfo.value = false
      getRecruitments(getRecruitmentsData)
    } else {
      ElMessage({
        type: "error",
        message: res.message,
        offset: 250,
      })
    }
  })
}
//拒绝
const reject_set = () => {
  status.value = 5
}
//搜索干事申请表
const searchRecruitment = (searchValue) => {
  getRecruitmentsData.content = searchValue
  getRecruitments({ ...getRecruitmentsData })
}

//页码显示
const total = ref()
const getNewPage = (page) => {
  getRecruitmentsData.page = page
  getRecruitments(getRecruitmentsData)
}
const pageSizeUpdate = (pageSize) => {
  getRecruitmentsData.pageSize = pageSize
  getRecruitments(getRecruitmentsData)
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