<template>
  <!-- 筛选、搜索 -->
  <top @changeUserInfo="changeUserInfo" @changeUserInfoByState="changeUserInfoByState"
    @showAddDialog="showAddOfficial=true" @searchRecruitment="searchRecruitment"
    :showSelectDepartmentView="showSelectDepartmentView" />
  <!-- 展示、列表 -->
  <recruitmentTable :userInfo="recuitmentsUserInfo" @itemClick="itemClick" />
  <!-- 详细信息 -->
  <el-drawer v-model="isShowDetailRecruitmrntInfo" size="50%">
    <review :user="DetailRecruitmrntInfo" class="details" :status="checkStatus" @FinallySetOfficial="FinallySetOfficial"
      @FinallyRejectOfficial="FinallyRejectOfficial" :current_role_id="current_role_id" />
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
import { GetRecruitment, FinallySendOffer, SetOfficial } from '@/api/recruitment'
import { ElMessage } from 'element-plus'
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
//获取干事申请表
const recuitmentsUserInfo = ref([])
const getRecruitmentsData = reactive({
  department: "",
  page: 1,
  pageSize: 10,
  status: "Accepted",
  content: ''
})
const getRecruitments = (data) => {
  GetRecruitment(data).then(res => {
    total.value = res.total
    recuitmentsUserInfo.value = res.list
    if (res.list.length == 0) {
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
  if (value == "Accepted") {
    status.value = 4
  } else {
    status.value = 6
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
//搜索干事申请表
const searchRecruitment = (searchValue) => {
  getRecruitmentsData.content = searchValue
  console.log(getRecruitmentsData);
  getRecruitments({ ...getRecruitmentsData })
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
      getRecruitments(getRecruitmentsData)
    } else {
      console.log("操作失败，请重新操作！");
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
      getRecruitments(getRecruitmentsData)
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